import crypto from 'crypto';
import { createEmailTokenRepositories } from '../repositories/auth.repositories';
import { sendVerificationEmail } from '../helpers/nodemailer';

export async function generateAndSendEmailVerificationToken(
    userId : number,
    email: string
) {
    const token = crypto.randomUUID();
    const expiresAt = new Date(
        Date.now() + 60 * 60 * 1000
    );
    await createEmailTokenRepositories(
        userId, 
        token, 
        expiresAt,
    );
    await sendVerificationEmail({ 
        to: email, 
        token,
    });
};