import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware';
import Video from '../models/Video.model';
import { processVideo } from '../services/videoProcessing.service';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads/videos');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `video-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /mp4|avi|mov|wmv|flv|mkv/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed'));
        }
    },
});

// Upload video
router.post('/upload', authenticate, upload.single('video'), async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file uploaded' });
        }

        const { title, description } = req.body;

        const video = new Video({
            title: title || req.file.originalname,
            description,
            filename: req.file.filename,
            filepath: req.file.path,
            filesize: req.file.size,
            mimeType: req.file.mimetype,
            userId: req.user!._id,
            organizationId: req.organizationId!,
            status: 'processing',
            uploadProgress: 100,
        });

        await video.save();

        // Emit socket event for real-time update
        const io = req.app.get('io');
        io.to(req.organizationId!).emit('video:uploaded', {
            videoId: video._id,
            title: video.title,
            status: video.status,
        });

        // Start processing in background
        processVideo(video._id.toString(), io);

        res.status(201).json({
            message: 'Video uploaded successfully',
            video: {
                id: video._id,
                title: video.title,
                status: video.status,
                uploadProgress: video.uploadProgress,
            },
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// Get all videos (with filtering)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { status, search, page = 1, limit = 20 } = req.query;

        const query: any = {
            organizationId: req.organizationId,
        };

        // Role-based filtering
        if (req.user!.role === 'viewer') {
            query.userId = req.user!._id; // Viewers only see their own videos
        }

        if (status) {
            query.status = status;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [videos, total] = await Promise.all([
            Video.find(query)
                .populate('userId', 'name email')
                .sort({ createdAt: -1 })
                .limit(Number(limit))
                .skip(skip),
            Video.countDocuments(query),
        ]);

        res.json({
            videos,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit)),
            },
        });
    } catch (error: any) {
        console.error('Get videos error:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Get single video
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const video = await Video.findById(req.params.id).populate('userId', 'name email');

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Check access permissions
        if (video.organizationId !== req.organizationId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        if (req.user!.role === 'viewer' && video.userId.toString() !== req.user!._id.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json({ video });
    } catch (error: any) {
        console.error('Get video error:', error);
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

// Update video status (Admin/Editor only)
router.put('/:id/status', authenticate, authorize('admin', 'editor'), async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;

        if (!['safe', 'flagged', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const video = await Video.findOneAndUpdate(
            { _id: req.params.id, organizationId: req.organizationId },
            { status },
            { new: true }
        );

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Emit socket event
        const io = req.app.get('io');
        io.to(req.organizationId!).emit('video:status_updated', {
            videoId: video._id,
            status: video.status,
        });

        res.json({ message: 'Status updated', video });
    } catch (error: any) {
        console.error('Update status error:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

// Delete video (Admin/Editor only)
router.delete('/:id', authenticate, authorize('admin', 'editor'), async (req: AuthRequest, res: Response) => {
    try {
        const video = await Video.findOneAndDelete({
            _id: req.params.id,
            organizationId: req.organizationId,
        });

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Delete file
        if (fs.existsSync(video.filepath)) {
            fs.unlinkSync(video.filepath);
        }

        // Emit socket event
        const io = req.app.get('io');
        io.to(req.organizationId!).emit('video:deleted', {
            videoId: video._id,
        });

        res.json({ message: 'Video deleted successfully' });
    } catch (error: any) {
        console.error('Delete video error:', error);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

// Get video statistics
router.get('/stats/overview', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const query: any = { organizationId: req.organizationId };

        if (req.user!.role === 'viewer') {
            query.userId = req.user!._id;
        }

        const [total, safe, flagged, processing, approved] = await Promise.all([
            Video.countDocuments(query),
            Video.countDocuments({ ...query, status: 'safe' }),
            Video.countDocuments({ ...query, status: 'flagged' }),
            Video.countDocuments({ ...query, status: 'processing' }),
            Video.countDocuments({ ...query, status: 'approved' }),
        ]);

        res.json({
            stats: {
                total,
                safe,
                flagged,
                processing,
                approved,
                rejected: total - safe - flagged - processing - approved,
            },
        });
    } catch (error: any) {
        console.error('Stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

export default router;
