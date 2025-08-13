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

export const addService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, subservices } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[];

    // Handle main service image
    let mainImageUrl = '';
    if (Array.isArray(files)) {
      // If using upload.any()
      const mainImage = files.find(file => file.fieldname === 'image');
      if (!mainImage) {
        res.status(400).json({ success: false, message: 'Main service image is required' });
        return;
      }
      mainImageUrl = mainImage.path;
    } else {
      // If using upload.fields()
      if (!files.image || !files.image[0]) {
        res.status(400).json({ success: false, message: 'Main service image is required' });
        return;
      }
      mainImageUrl = files.image[0].path;
    }

    // Process subservices if they exist
    let processedSubservices: any[] = [];
    if (subservices) {
      try {
        const parsedSubservices = JSON.parse(subservices);
        
        processedSubservices = parsedSubservices.map((subservice: any, index: number) => {
          const subserviceData = {
            title: subservice.title,
            description: subservice.description,
            image: undefined as string | undefined
          };

          // Find corresponding image for this subservice
          if (Array.isArray(files)) {
            // If using upload.any()
            const subserviceImage = files.find(file => 
              file.fieldname === `subservice_image_${index}`
            );
            if (subserviceImage) {
              subserviceData.image = subserviceImage.path;
            }
          } else {
            // If using upload.fields()
            const fieldName = `subservice_image_${index}`;
            if (files[fieldName] && files[fieldName][0]) {
              subserviceData.image = files[fieldName][0].path;
            }
          }

          return subserviceData;
        });
      } catch (parseError) {
        res.status(400).json({ success: false, message: 'Invalid subservices data format' });
        return;
      }
    }

    // Create new service with subservices
    const newService = await Service.create({
      title,
      content,
      image: mainImageUrl,
      subservices: processedSubservices
    });
    
    res.status(201).json({ success: true, newService });
  } catch (error) {
    console.error('Add service error:', error);
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