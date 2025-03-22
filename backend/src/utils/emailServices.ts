// src/utils/emailService.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailOptions {
  from: string;
  replyTo?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  console.log("inside sendmial");
  const mail = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "khizer.hyd@gmail.com",
      pass: "mitb xtpb frai bwew",
    },
  });

  console.log("after sendmail");

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
