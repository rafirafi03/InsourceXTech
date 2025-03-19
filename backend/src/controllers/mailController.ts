// src/controllers/mailController.ts
import { Request, Response } from "express";
import { sendEmail } from "../utils/emailServices";

// Send email with HTML template
export const sendMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: "Please provide name, email and message",
      });
      return;
    }

    // Plain text version (for email clients that don't support HTML)
    const textContent = `
Name: ${name}
Email: ${email}

Message:
${message}
    `;

    // HTML version with nice formatting
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
        }
        .container {
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            padding: 20px;
            margin-top: 20px;
        }
        .header {
            background-color: #f7f7f7;
            padding: 15px;
            border-radius: 5px 5px 0 0;
            border-bottom: 2px solid #e1e1e1;
            margin-bottom: 20px;
        }
        .contact-info {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border-left: 4px solid #2196F3;
        }
        .message-content {
            padding: 10px;
            background-color: #ffffff;
            border-left: 4px solid #4CAF50;
        }
        .info-label {
            font-weight: bold;
            color: #555555;
        }
        h2 {
            color: #2196F3;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
        </div>
        
        <div class="contact-info">
            <p><span class="info-label">Name:</span> ${name}</p>
            <p><span class="info-label">Email:</span> <a href="mailto:${email}">${email}</a></p>
            <p><span class="info-label">Subject:</span> ${
              subject || "New contact from website"
            }</p>
        </div>
        
        <div class="message-content">
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
    </div>
</body>
</html>
    `;

    // Send email with both text and HTML content
    await sendEmail({
      from: email, // Should use authenticated email address
      replyTo: email,
      to: process.env.MAIL_TO || "info@insourcextech.com",
      subject: subject || `New contact from ${name}`,
      text: textContent,
      html: htmlContent,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message }); // Fixed typo in success
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};
