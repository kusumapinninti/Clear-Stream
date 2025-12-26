'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Users,
    Shield,
    Crown,
    Eye,
    Edit3,
    Loader2,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

export default function AdminPage() {
    const { token, user } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user?.role === 'admin' && token) {
            fetchUsers();
        }
    }, [user, token]);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/users', {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data.users || []);
            setError('');
        } catch (err: any) {
            console.error('Failed to fetch users:', err);
            setError(err.message || 'Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    const updateRole = async (userId: string, newRole: string) => {
        try {
            setUpdatingUserId(userId);
            setError('');
            setSuccess('');

            const response = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) {
                throw new Error('Failed to update role');
            }

            setSuccess('User role updated successfully');
            await fetchUsers();

            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            console.error('Failed to update role:', err);
            setError(err.message || 'Failed to update role');
        } finally {
            setUpdatingUserId(null);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin':
                return <Crown className="h-4 w-4" />;
            case 'editor':
                return <Edit3 className="h-4 w-4" />;
            case 'viewer':
                return <Eye className="h-4 w-4" />;
            default:
                return <Users className="h-4 w-4" />;
        }
    };

    const getRoleBadge = (role: string) => {
        const config: Record<string, { variant: any; className: string }> = {
            admin: { variant: 'default', className: 'bg-purple-500' },
            editor: { variant: 'default', className: 'bg-blue-500' },
            viewer: { variant: 'secondary', className: '' },
        };

        const { variant, className } = config[role] || { variant: 'outline', className: '' };
        return (
            <Badge variant={variant as any} className={className}>
                {getRoleIcon(role)}
                <span className="ml-1 capitalize">{role}</span>
            </Badge>
        );
    };

    if (user?.role !== 'admin') {
        return (
            <ProtectedRoute>
                <DashboardLayout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <Card className="max-w-md w-full">
                            <CardContent className="p-12 text-center">
                                <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                                <p className="text-muted-foreground">
                                    Only administrators can access this page
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </DashboardLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl font-bold">Admin Panel</h1>
                        <p className="text-lg text-muted-foreground mt-2">
                            Manage users and permissions
                        </p>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-600">{success}</AlertDescription>
                        </Alert>
                    )}

                    {/* Stats Cards */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{users.length}</div>
                                <p className="text-xs text-muted-foreground">
                                    In your organization
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                                <Crown className="h-4 w-4 text-purple-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {users.filter((u) => u.role === 'admin').length}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Full access users
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Editors</CardTitle>
                                <Edit3 className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {users.filter((u) => u.role === 'editor').length}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Content managers
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle>User Management</CardTitle>
                            <CardDescription>
                                Manage user roles and permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="text-center py-12">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
                                    <p className="text-muted-foreground">Loading users...</p>
                                </div>
                            ) : users.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No users found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {users.map((u) => (
                                        <div
                                            key={u._id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                                        {getInitials(u.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{u.name}</p>
                                                    <p className="text-sm text-muted-foreground">{u.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {updatingUserId === u._id ? (
                                                    <div className="flex items-center gap-2">
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        <span className="text-sm text-muted-foreground">Updating...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {getRoleBadge(u.role)}
                                                        {u._id !== user._id && (
                                                            <Select
                                                                value={u.role}
                                                                onValueChange={(value) => updateRole(u._id, value)}
                                                                disabled={updatingUserId !== null}
                                                            >
                                                                <SelectTrigger className="w-[140px]">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="admin">
                                                                        <div className="flex items-center gap-2">
                                                                            <Crown className="h-4 w-4" />
                                                                            Admin
                                                                        </div>
                                                                    </SelectItem>
                                                                    <SelectItem value="editor">
                                                                        <div className="flex items-center gap-2">
                                                                            <Edit3 className="h-4 w-4" />
                                                                            Editor
                                                                        </div>
                                                                    </SelectItem>
                                                                    <SelectItem value="viewer">
                                                                        <div className="flex items-center gap-2">
                                                                            <Eye className="h-4 w-4" />
                                                                            Viewer
                                                                        </div>
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                        {u._id === user._id && (
                                                            <Badge variant="outline" className="text-xs">
                                                                You
                                                            </Badge>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Role Descriptions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Permissions</CardTitle>
                            <CardDescription>
                                Understanding user roles and their capabilities
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-900">
                                <Crown className="h-5 w-5 text-purple-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">Administrator</h4>
                                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                                        Full system access, user management, all video operations, can assign roles
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900">
                                <Edit3 className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Editor</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                        Upload, edit, delete videos, view all organization videos, update video status
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted border">
                                <Eye className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <h4 className="font-semibold">Viewer</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        View only their own uploaded videos, no editing or management capabilities
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
