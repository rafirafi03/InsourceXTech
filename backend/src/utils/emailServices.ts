// src/utils/emailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config()

interface EmailOptions {
  from : string;
  replyTo?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || "khizerabdulsattar@gmail.com",
      pass: process.env.EMAIL_PASS || "wzir dxcy knho quwm",
    },
  });

  // Mail options
  const mailOptions = {
    from: options.from,
    replyTo: options.replyTo,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};