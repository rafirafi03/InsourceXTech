// src/controllers/whyUsController.ts
import { Request, Response } from 'express';
import WhyUs from '../models/whyUsModel';

// Get why us
export const getWhyUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const whyUs = await WhyUs.find({});
    
    if (!whyUs) {
      res.status(404).json({ success: false, message: 'Why Us information not found' });
      return;
    }
    
    res.status(200).json({success: true, whyUs});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

// Edit why us
export const editWhyUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, title, description } = req.body;
    
    // Find existing record or create new one
    let whyUs = await WhyUs.findOne({_id: id});
    
    if (whyUs) {
      whyUs.title = title;
      whyUs.description = description;
      await whyUs.save();
    } else {
      whyUs = await WhyUs.create({
        title,
        description,
      });
    }
    
    res.status(200).json({success: true, whyUs});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false,  message: 'An unknown error occurred' });
    }
  }
};