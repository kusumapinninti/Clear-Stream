'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react';

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link');
            return;
        }

        verifyEmail(token);
    }, [searchParams]);

    const verifyEmail = async (token: string) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Your email has been verified successfully!');
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push('/auth/login/admin');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.error || 'Verification failed');
            }
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred during verification');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        {status === 'loading' && (
                            <Loader2 className="h-16 w-16 text-primary animate-spin" />
                        )}
                        {status === 'success' && (
                            <CheckCircle2 className="h-16 w-16 text-green-600" />
                        )}
                        {status === 'error' && (
                            <XCircle className="h-16 w-16 text-destructive" />
                        )}
                    </div>
                    <CardTitle className="text-2xl">
                        {status === 'loading' && 'Verifying Email...'}
                        {status === 'success' && 'Email Verified!'}
                        {status === 'error' && 'Verification Failed'}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                        {message}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    {status === 'success' && (
                        <>
                            <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                                <Mail className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-600">
                                    You can now log in to your account
                                </AlertDescription>
                            </Alert>
                            <p className="text-sm text-muted-foreground">
                                Redirecting to login page...
                            </p>
                        </>
                    )}
                    {status === 'error' && (
                        <div className="space-y-3">
                            <Link href="/auth/login/admin">
                                <Button className="w-full">
                                    Go to Login
                                </Button>
                            </Link>
                            <p className="text-sm text-muted-foreground">
                                Or contact support if the problem persists
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
