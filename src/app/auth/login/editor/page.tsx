'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit3, AlertCircle, Shield } from 'lucide-react';

export default function EditorLoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(email, password);

            if (user.role !== 'editor') {
                setError('Access denied. This login is for editors only.');
                setIsLoading(false);
                return;
            }

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">SensiStream</h1>
                            <p className="text-xs text-muted-foreground">Enterprise Video Intelligence Platform</p>
                        </div>
                    </Link>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                        ← Back to home
                    </Link>
                </div>
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl px-4">
                    {/* Login Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 border">
                        {/* Icon & Title */}
                        <div className="text-center mb-10">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6">
                                <Edit3 className="h-10 w-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold mb-3">Editor Login</h2>
                            <p className="text-lg text-muted-foreground">Content editor access to SensiStream</p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <Alert variant="destructive" className="mb-8">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-base font-semibold">
                                    Editor Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="editor@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="h-14 text-base"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="password" className="text-base font-semibold">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="h-14 text-base"
                                />
                            </div>

                            <div className="text-right">
                                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-lg font-semibold"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in as Editor'}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8 max-w-2xl mx-auto">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">
                                    Other login options
                                </span>
                            </div>
                        </div>

                        {/* Other Login Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
                            <Link href="/auth/login/admin" className="block">
                                <Button variant="outline" className="w-full h-12 text-base">
                                    <span className="mr-2">👑</span> Admin
                                </Button>
                            </Link>
                            <Link href="/auth/login/viewer" className="block">
                                <Button variant="outline" className="w-full h-12 text-base">
                                    <span className="mr-2">👁️</span> Viewer
                                </Button>
                            </Link>
                        </div>

                        {/* Create Account Link */}
                        <div className="text-center">
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <Link href="/auth/register" className="text-blue-600 hover:underline font-semibold">
                                Create account
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Note */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Editor access includes video upload, editing, and content management
                    </p>
                </div>
            </div>
        </div>
    );
}
