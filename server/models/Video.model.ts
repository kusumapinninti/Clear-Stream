import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
    title: string;
    description?: string;
    filename: string;
    filepath: string;
    filesize: number;
    duration?: number;
    mimeType: string;
    thumbnailUrl?: string;
    userId: mongoose.Types.ObjectId;
    organizationId: string;
    status: 'uploading' | 'processing' | 'safe' | 'flagged' | 'approved' | 'rejected';
    sensitivityScore?: number;
    flaggedReasons?: string[];
    uploadProgress: number;
    processingProgress: number;
    metadata: {
        width?: number;
        height?: number;
        codec?: string;
        bitrate?: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const VideoSchema = new Schema<IVideo>(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        filename: {
            type: String,
            required: true,
        },
        filepath: {
            type: String,
            required: true,
        },
        filesize: {
            type: Number,
            required: true,
        },
        duration: Number,
        mimeType: {
            type: String,
            required: true,
        },
        thumbnailUrl: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        organizationId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['uploading', 'processing', 'safe', 'flagged', 'approved', 'rejected'],
            default: 'uploading',
        },
        sensitivityScore: {
            type: Number,
            min: 0,
            max: 100,
        },
        flaggedReasons: [String],
        uploadProgress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        processingProgress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        metadata: {
            width: Number,
            height: Number,
            codec: String,
            bitrate: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
VideoSchema.index({ organizationId: 1, userId: 1 });
VideoSchema.index({ status: 1 });
VideoSchema.index({ createdAt: -1 });

export default mongoose.model<IVideo>('Video', VideoSchema);
