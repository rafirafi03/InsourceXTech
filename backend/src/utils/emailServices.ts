// src/utils/emailService.ts
import nodemailer from "nodemailer";

interface EmailOptions {
  from: string;
  replyTo?: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {

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
