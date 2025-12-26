import * as nodemailer from 'nodemailer';

export class EmailService {
    private transporter: nodemailer.Transporter | null = null;

    constructor() {
        // Configure with your email service (Gmail, SendGrid, etc.)
        // Make it optional so server can start without email config
        try {
            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.EMAIL_PORT || '587'),
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            console.log('[EmailService] Email transport configured');
        } catch (error) {
            console.warn('[EmailService] Email not configured - emails will be skipped:', error);
        }
    }

    async sendVerificationEmail(email: string, token: string) {
        if (!this.transporter) {
            console.warn('[EmailService] Email not configured - skipping verification email');
            return;
        }

        const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${token}`;

        const mailOptions = {
            from: `"SensiStream" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email - SensiStream',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #6366f1;">Welcome to SensiStream!</h1>
                    <p>Please verify your email address by clicking the button below:</p>
                    <a href="${verificationUrl}" 
                       style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                        Verify Email
                    </a>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        This link will expire in 24 hours. If you didn't create an account, please ignore this email.
                    </p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Verification email sent to ${email}`);
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw new Error('Failed to send verification email');
        }
    }

    async sendPasswordResetEmail(email: string, token: string) {
        if (!this.transporter) {
            console.warn('[EmailService] Email not configured - skipping password reset email');
            return;
        }

        const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;

        const mailOptions = {
            from: `"SensiStream" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Reset Your Password - SensiStream',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #6366f1;">Reset Your Password</h1>
                    <p>You requested to reset your password. Click the button below to create a new password:</p>
                    <a href="${resetUrl}" 
                       style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                        Reset Password
                    </a>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="color: #666; word-break: break-all;">${resetUrl}</p>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
                    </p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Password reset email sent to ${email}`);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }

    async sendWelcomeEmail(email: string, name: string) {
        if (!this.transporter) {
            console.warn('[EmailService] Email not configured - skipping welcome email');
            return;
        }

        const mailOptions = {
            from: `"SensiStream" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to SensiStream!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #6366f1;">Welcome to SensiStream, ${name}!</h1>
                    <p>Your account has been successfully created and verified.</p>
                    <p>You can now:</p>
                    <ul>
                        <li>Upload and manage videos</li>
                        <li>Perform content sensitivity analysis</li>
                        <li>Collaborate with your team</li>
                    </ul>
                    <a href="${process.env.FRONTEND_URL}/dashboard" 
                       style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                        Go to Dashboard
                    </a>
                    <p style="color: #999; font-size: 12px; margin-top: 30px;">
                        Thank you for choosing SensiStream!
                    </p>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Welcome email sent to ${email}`);
        } catch (error) {
            console.error('Error sending welcome email:', error);
            // Don't throw - welcome email failure shouldn't block the process
        }
    }
}

// Export singleton instance
export const emailService = new EmailService();
