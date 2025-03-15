// src/controllers/mailController.ts
import { Request, Response } from 'express';
import { sendEmail } from '../utils/emailServices';

// Send email
export const sendMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Simple validation
    if (!name || !email || !message) {
      res.status(400).json({ message: 'Please provide name, email and message' });
      return;
    }
    
    await sendEmail({
      to: 'your-company-email@example.com',
      subject: subject || 'New contact from website',
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    });
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};