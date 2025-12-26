import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware';
import User from '../models/User.model';

const router = Router();

// Get current user profile
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user!._id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

// Get all users in organization (Admin only)
router.get('/', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.find({ organizationId: req.organizationId }).select('-password');
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Update user role (Admin only)
router.put('/:id/role', authenticate, authorize('admin'), async (req: AuthRequest, res: Response) => {
    try {
        const { role } = req.body;

        if (!['admin', 'editor', 'viewer'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = await User.findOneAndUpdate(
            { _id: req.params.id, organizationId: req.organizationId },
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Role updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update role' });
    }
});

export default router;
