'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Upload,
    Video,
    Shield,
    CheckCircle2,
    AlertTriangle,
    Clock,
    TrendingUp,
    Play
} from 'lucide-react';

export default function DashboardPage() {
    const { user, token } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        safe: 0,
        flagged: 0,
        processing: 0,
        approved: 0,
    });
    const [recentVideos, setRecentVideos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchStats();
            fetchRecentVideos();
        }
    }, [token]);

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/videos/stats/overview', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setStats(data.stats);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchRecentVideos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/videos?limit=6', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setRecentVideos(data.videos || []);
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Videos',
            value: stats.total,
            icon: Video,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
            trend: '+12%',
        },
        {
            title: 'Safe',
            value: stats.safe,
            icon: CheckCircle2,
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
            trend: '+8%',
        },
        {
            title: 'Flagged',
            value: stats.flagged,
            icon: AlertTriangle,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
            trend: '-3%',
        },
        {
            title: 'Processing',
            value: stats.processing,
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: any; label: string }> = {
            safe: { variant: 'default', label: 'Safe' },
            flagged: { variant: 'destructive', label: 'Flagged' },
            processing: { variant: 'secondary', label: 'Processing' },
            approved: { variant: 'default', label: 'Approved' },
            rejected: { variant: 'destructive', label: 'Rejected' },
        };

        const config = variants[status] || { variant: 'outline', label: status };
        return <Badge variant={config.variant as any}>{config.label}</Badge>;
    };

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="space-y-8">
                    {/* Welcome Section */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold">Welcome back, {user?.name}! 👋</h1>
                            <p className="text-lg text-muted-foreground mt-2">
                                Here's what's happening with your videos today
                            </p>
                        </div>
                        {(user?.role === 'admin' || user?.role === 'editor') && (
                            <Link href="/dashboard/upload">
                                <Button size="lg" className="shadow-lg">
                                    <Upload className="mr-2 h-5 w-5" />
                                    Upload Video
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat, index) => (
                            <Card key={index} className="border-2 hover:border-primary/50 transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{stat.value.toLocaleString()}</div>
                                    {stat.trend && (
                                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                            <TrendingUp className="h-3 w-3 text-green-600" />
                                            {stat.trend} from last month
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Recent Videos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Videos</CardTitle>
                            <CardDescription>Your latest uploaded videos</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    Loading videos...
                                </div>
                            ) : recentVideos.length === 0 ? (
                                <div className="text-center py-12">
                                    <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Upload your first video to get started
                                    </p>
                                    {(user?.role === 'admin' || user?.role === 'editor') && (
                                        <Link href="/dashboard/upload">
                                            <Button>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload Video
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {recentVideos.map((video) => (
                                        <Card key={video._id} className="group hover:border-primary/50 transition-all overflow-hidden">
                                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative flex items-center justify-center">
                                                <Play className="h-12 w-12 text-primary/60" />
                                                <div className="absolute top-2 right-2">
                                                    {getStatusBadge(video.status)}
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <h4 className="font-medium truncate mb-1">{video.title}</h4>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {new Date(video.createdAt).toLocaleDateString()}
                                                </p>
                                                {video.sensitivityScore !== undefined && (
                                                    <div className="mt-2">
                                                        <div className="flex items-center justify-between text-xs mb-1">
                                                            <span className="text-muted-foreground">Sensitivity</span>
                                                            <span className="font-medium">{video.sensitivityScore}%</span>
                                                        </div>
                                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full transition-all ${video.sensitivityScore > 70
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
                                                <Link href={`/dashboard/videos/${video._id}`}>
                                                    <Button variant="ghost" size="sm" className="w-full mt-3">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-2">
                            <CardHeader>
                                <Shield className="h-10 w-10 text-primary mb-2" />
                                <CardTitle>Content Safety</CardTitle>
                                <CardDescription>
                                    {stats.flagged > 0
                                        ? `${stats.flagged} videos need review`
                                        : 'All videos are safe'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/dashboard/videos?status=flagged">
                                    <Button variant="outline" className="w-full">
                                        View Flagged Content
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="border-2">
                            <CardHeader>
                                <Video className="h-10 w-10 text-primary mb-2" />
                                <CardTitle>Video Library</CardTitle>
                                <CardDescription>
                                    Browse all {stats.total} videos in your library
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/dashboard/videos">
                                    <Button variant="outline" className="w-full">
                                        View All Videos
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
