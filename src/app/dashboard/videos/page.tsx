'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Video, Search, Play, Upload as UploadIcon, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function VideosPage() {
    const { token, user } = useAuth();
    const [videos, setVideos] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            fetchVideos();
        }
    }, [token, statusFilter]);

    const fetchVideos = async () => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams();
            if (statusFilter !== 'all') params.append('status', statusFilter);
            if (search) params.append('search', search);

            const response = await fetch(
                `http://localhost:5000/api/videos?${params.toString()}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }

            const data = await response.json();
            setVideos(data.videos || []);
            setError('');
        } catch (err: any) {
            console.error('Failed to fetch videos:', err);
            setError(err.message || 'Failed to load videos');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        fetchVideos();
    };

    const getStatusBadge = (status: string) => {
        const config: Record<string, { variant: any; className: string }> = {
            safe: { variant: 'default', className: 'bg-green-500' },
            flagged: { variant: 'destructive', className: 'bg-orange-500' },
            processing: { variant: 'secondary', className: 'bg-blue-500' },
            approved: { variant: 'default', className: 'bg-green-600' },
            rejected: { variant: 'destructive', className: '' },
        };

        const { variant, className } = config[status] || { variant: 'outline', className: '' };
        return (
            <Badge variant={variant as any} className={className}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold">Video Library</h1>
                            <p className="text-lg text-muted-foreground mt-2">
                                Browse and manage your video collection
                            </p>
                        </div>
                        {(user?.role === 'admin' || user?.role === 'editor') && (
                            <Link href="/dashboard/upload">
                                <Button size="lg" className="shadow-lg">
                                    <UploadIcon className="mr-2 h-5 w-5" />
                                    Upload Video
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Search videos by title..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="safe">Safe</SelectItem>
                                        <SelectItem value="flagged">Flagged</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleSearch}>Search</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Videos Grid */}
                    {isLoading ? (
                        <div className="text-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                            <p className="text-muted-foreground">Loading videos...</p>
                        </div>
                    ) : videos.length === 0 ? (
                        <Card className="p-12 text-center">
                            <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No videos found</h3>
                            <p className="text-muted-foreground mb-6">
                                {search || statusFilter !== 'all'
                                    ? 'Try adjusting your filters'
                                    : 'Upload your first video to get started'}
                            </p>
                            {(user?.role === 'admin' || user?.role === 'editor') && (
                                <Link href="/dashboard/upload">
                                    <Button>
                                        <UploadIcon className="mr-2 h-4 w-4" />
                                        Upload Video
                                    </Button>
                                </Link>
                            )}
                        </Card>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {videos.length} video{videos.length !== 1 ? 's' : ''}
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {videos.map((video) => (
                                    <Card key={video._id} className="group hover:border-primary/50 transition-all overflow-hidden">
                                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 p-4 flex items-center justify-center relative">
                                            <Play className="h-12 w-12 text-primary/60 group-hover:scale-110 transition-transform" />
                                            <div className="absolute top-2 right-2">
                                                {getStatusBadge(video.status)}
                                            </div>
                                            {video.processingProgress > 0 && video.processingProgress < 100 && (
                                                <div className="absolute bottom-2 left-2 right-2">
                                                    <div className="h-1 bg-background rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary transition-all"
                                                            style={{ width: `${video.processingProgress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-4 space-y-3">
                                            <div>
                                                <h3 className="font-semibold truncate mb-1">{video.title}</h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(video.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>

                                            {video.sensitivityScore !== undefined && (
                                                <div>
                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                        <span className="text-muted-foreground">Sensitivity</span>
                                                        <span className="font-medium">{video.sensitivityScore}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
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
                                                </div>
                                            )}

                                            <div className="flex gap-2 pt-2">
                                                <Link href={`/dashboard/videos/${video._id}`} className="flex-1">
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
