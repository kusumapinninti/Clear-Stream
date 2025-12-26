'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, Lock, AlertCircle, Shield, Eye } from 'lucide-react';

export default function ViewerRegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            await register(email, password, name, 'viewer');
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
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

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700">
                        {/* Title */}
                        <div className="text-center mb-10">
                            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center mb-6">
                                <Eye className="h-10 w-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold mb-3">
                                <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                                    Viewer Registration
                                </span>
                            </h2>
                            <p className="text-lg text-muted-foreground">Create viewer account</p>
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                <Eye className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">View & review videos (read-only)</span>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <Alert variant="destructive" className="mb-8 max-w-2xl mx-auto">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-base font-semibold">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-14 text-base pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-base font-semibold">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="viewer@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-14 text-base pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="password" className="text-base font-semibold">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={isLoading}
                                        className="h-14 text-base pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="confirmPassword" className="text-base font-semibold">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        disabled={isLoading}
                                        className="h-14 text-base pl-12"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-lg font-semibold"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating account...' : '👁️ Create Viewer Account'}
                            </Button>
                        </form>

                        {/* Footer - Other Registration Options */}
                        <div className="text-center mt-8 space-y-3">
                            <p className="text-sm text-muted-foreground">Need a different account type?</p>
                            <div className="flex gap-3 justify-center flex-wrap">
                                <Link href="/auth/register/editor">
                                    <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950">
                                        ✏️ Register as Editor
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-6">
                                <span className="text-muted-foreground">Already have an account? </span>
                                <Link href="/auth/login/viewer" className="text-gray-600 hover:underline font-semibold">
                                    Sign in as Viewer
                                </Link>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}
