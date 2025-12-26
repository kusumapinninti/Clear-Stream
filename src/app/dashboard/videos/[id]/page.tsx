'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    AlertTriangle,
    CheckCircle2,
    ArrowLeft,
    Calendar,
    FileVideo,
    User,
    Loader2,
    XCircle,
    Clock,
    Download,
    Share2
} from 'lucide-react';

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoDetailPage() {
    const { id } = useParams();
    const { token, user } = useAuth();
    const router = useRouter();
    const [video, setVideo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (id && token) {
            fetchVideo();
        }
    }, [id, token]);

    const fetchVideo = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch video');
            }

            const data = await response.json();
            setVideo(data.video);
            setError('');
        } catch (err: any) {
            console.error('Failed to fetch video:', err);
            setError(err.message || 'Failed to load video');
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (newStatus: string) => {
        try {
            setIsUpdating(true);
            const response = await fetch(`http://localhost:5000/api/videos/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            await fetchVideo();
        } catch (err: any) {
            console.error('Failed to update status:', err);
            setError(err.message || 'Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    const deleteVideo = async () => {
        if (!confirm('Are you sure you want to delete this video?')) return;

        try {
            setIsUpdating(true);
            const response = await fetch(`http://localhost:5000/api/videos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to delete video');
            }

            router.push('/dashboard/videos');
        } catch (err: any) {
            console.error('Failed to delete video:', err);
            setError(err.message || 'Failed to delete video');
            setIsUpdating(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const config: Record<string, { variant: any; icon: any }> = {
            safe: { variant: 'default', icon: CheckCircle2 },
            flagged: { variant: 'destructive', icon: AlertTriangle },
            processing: { variant: 'secondary', icon: Clock },
            approved: { variant: 'default', icon: CheckCircle2 },
            rejected: { variant: 'destructive', icon: XCircle },
        };

        const { variant, icon: Icon } = config[status] || { variant: 'outline', icon: FileVideo };
        return (
            <Badge variant={variant as any} className="text-sm px-3 py-1">
                <Icon className="mr-1 h-3 w-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    if (isLoading) {
        return (
            <ProtectedRoute>
                <DashboardLayout>
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                            <p className="text-muted-foreground">Loading video...</p>
                        </div>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    if (error || !video) {
        return (
            <ProtectedRoute>
                <DashboardLayout>
                    <div className="space-y-6">
                        <Button variant="ghost" onClick={() => router.back()}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Videos
                        </Button>
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                {error || 'Video not found'}
                            </AlertDescription>
                        </Alert>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    const videoUrl = `http://localhost:5000${video.path}`;

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="space-y-6">
                    {/* Back Button */}
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Videos
                    </Button>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Video Section */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Video Player */}
                            <Card className="overflow-hidden border-2">
                                <div className="aspect-video bg-black relative">
                                    {video.status === 'processing' ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                                            <div className="text-center text-white">
                                                <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
                                                <p>Processing video...</p>
                                                <p className="text-sm mt-2">{video.processingProgress}% complete</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <ReactPlayer
                                            url={videoUrl}
                                            width="100%"
                                            height="100%"
                                            controls
                                            playing={isPlaying}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controlsList: 'nodownload'
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
                                            {video.description && (
                                                <p className="text-muted-foreground text-lg">{video.description}</p>
                                            )}
                                        </div>
                                        {getStatusBadge(video.status)}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Uploaded:</span>
                                            <span className="font-medium">
                                                {new Date(video.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FileVideo className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Size:</span>
                                            <span className="font-medium">
                                                {(video.filesize / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                        </div>
                                        {video.userId && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Uploaded by:</span>
                                                <span className="font-medium">
                                                    {video.userId.name || video.userId.email}
                                                </span>
                                            </div>
                                        )}
                                        {video.mimeType && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <FileVideo className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">Format:</span>
                                                <span className="font-medium">{video.mimeType}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Processing Info */}
                            {video.processingProgress > 0 && video.processingProgress < 100 && (
                                <Alert className="border-2">
                                    <Clock className="h-4 w-4 animate-pulse" />
                                    <AlertDescription>
                                        <div className="space-y-2">
                                            <p>Processing video... {video.processingProgress}%</p>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all"
                                                    style={{ width: `${video.processingProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Analysis Results */}
                            <Card className="border-2">
                                <CardHeader>
                                    <CardTitle>Analysis Results</CardTitle>
                                    <CardDescription>AI-powered content analysis</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {video.sensitivityScore !== undefined && (
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-medium">Sensitivity Score</span>
                                                <span className="text-4xl font-bold">
                                                    {video.sensitivityScore}%
                                                </span>
                                            </div>
                                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all ${video.sensitivityScore > 70
                                                            ? 'bg-destructive'
                                                            : video.sensitivityScore > 40
                                                                ? 'bg-orange-500'
                                                                : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${video.sensitivityScore}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {video.sensitivityScore > 70
                                                    ? 'High sensitivity - requires review'
                                                    : video.sensitivityScore > 40
                                                        ? 'Moderate sensitivity - review recommended'
                                                        : 'Low sensitivity - content appears safe'}
                                            </p>
                                        </div>
                                    )}

                                    {video.flaggedReasons && video.flaggedReasons.length > 0 && (
                                        <div className="pt-4 border-t">
                                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                Flagged Issues
                                            </h4>
                                            <ul className="space-y-2">
                                                {video.flaggedReasons.map((reason: string, i: number) => (
                                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                        <span className="text-orange-500 mt-0.5">•</span>
                                                        {reason}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Admin Controls */}
                            {(user?.role === 'admin' || user?.role === 'editor') && (
                                <Card className="border-2">
                                    <CardHeader>
                                        <CardTitle>Status Management</CardTitle>
                                        <CardDescription>Update video status</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button
                                            onClick={() => updateStatus('approved')}
                                            disabled={isUpdating || video.status === 'approved'}
                                            variant="outline"
                                            className="w-full hover:bg-green-50 hover:border-green-500"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => updateStatus('safe')}
                                            disabled={isUpdating || video.status === 'safe'}
                                            variant="outline"
                                            className="w-full hover:bg-blue-50 hover:border-blue-500"
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                                            Mark as Safe
                                        </Button>
                                        <Button
                                            onClick={() => updateStatus('flagged')}
                                            disabled={isUpdating || video.status === 'flagged'}
                                            variant="outline"
                                            className="w-full hover:bg-orange-50 hover:border-orange-500"
                                        >
                                            <AlertTriangle className="mr-2 h-4 w-4 text-orange-600" />
                                            Flag for Review
                                        </Button>
                                        <Button
                                            onClick={() => updateStatus('rejected')}
                                            disabled={isUpdating || video.status === 'rejected'}
                                            variant="destructive"
                                            className="w-full"
                                        >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                        <div className="pt-2 border-t">
                                            <Button
                                                onClick={deleteVideo}
                                                disabled={isUpdating}
                                                variant="ghost"
                                                className="w-full text-destructive hover:bg-destructive/10"
                                            >
                                                Delete Video
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Metadata */}
                            {video.metadata && (
                                <Card className="border-2">
                                    <CardHeader>
                                        <CardTitle>Technical Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        {video.metadata.width && video.metadata.height && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Resolution:</span>
                                                <span className="font-medium">
                                                    {video.metadata.width}x{video.metadata.height}
                                                </span>
                                            </div>
                                        )}
                                        {video.metadata.codec && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Codec:</span>
                                                <span className="font-medium">{video.metadata.codec}</span>
                                            </div>
                                        )}
                                        {video.metadata.duration && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Duration:</span>
                                                <span className="font-medium">
                                                    {Math.floor(video.metadata.duration / 60)}:
                                                    {(video.metadata.duration % 60).toString().padStart(2, '0')}
                                                </span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
