// src/controllers/aboutController.ts
import { Request, Response } from 'express';
import AboutCompany from '../models/aboutModel';

// Get about company
export const getAboutCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('giii')
    const aboutCompany = await AboutCompany.findOne();

    console.log('about', aboutCompany)
    
    if (!aboutCompany) {
      res.status(404).json({ success: false, message: 'About company information not found' });
      return;
    }
    
    res.status(200).json({success: true, aboutCompany});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

// Edit about company
export const editAboutCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, location, timing, about, mission, vision } = req.body;
    
    // Find existing record or create new one
    let aboutCompany = await AboutCompany.findOne();
    
    if (aboutCompany) {
      aboutCompany.name = name;
      aboutCompany.email = email;
      aboutCompany.phone = phone;
      aboutCompany.location = location;
      aboutCompany.timing = timing;
      aboutCompany.about = about;
      aboutCompany.mission = mission;
      aboutCompany.vision = vision;
      await aboutCompany.save();
    } else {
      aboutCompany = await AboutCompany.create({
        name,
        email,
        phone,
        location,
        timing,
        about,
        mission,
        vision
      });
    }
    
    res.status(200).json({success: true, aboutCompany});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({success: false, message: error.message });
    } else {
      res.status(500).json({success: false, message: 'An unknown error occurred' });
    }
  }
};