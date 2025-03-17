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
    const { title } = req.body;
    console.log('eghtii req bodyy:', req.body)

    if(!req.file) {
      res.status(400).json({ success: false, message: 'No image uploaded' });
      return;
    }

    console.log("req.fileee", req.file)
    const imageUrl = req.file.path;
    
    const newService = await Service.create({
      title,
      image : imageUrl
    });
    
    res.status(201).json({ success: true, newService});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ success: false, message: "No ID provided" });
      return;
    }

    // Find and delete the solution
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      res.status(404).json({ success: false, message: "Service not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "An unknown error occurred" });
    }
  }
};