// src/controllers/servicesController.ts
import { Request, Response } from 'express';
import Service from '../models/servicesModel';

// Get all services
export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({}).sort({ order: 1 });
    res.status(200).json({success: true, services});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

// Add new service
export const addService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    
    const newService = await Service.create({
      title,
      description
    });
    
    res.status(201).json(newService);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};