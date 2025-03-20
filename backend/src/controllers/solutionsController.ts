// src/controllers/solutionsController.ts
import { Request, Response } from 'express';
import Solution from '../models/solutionsModel';

// Get all solutions
export const getSolutions = async (req: Request, res: Response): Promise<void> => {
  try {
    const solutions = await Solution.find({}).sort({ order: 1 });
    res.status(200).json({success: true, solutions});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

// Add new solution
export const addSolution = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;

    if(!req.file) {
      res.status(400).json({ success: false, message: 'No image uploaded' });
      return;
    }

    const imageUrl = req.file.path;
    
    const newSolution = await Solution.create({
      title,
      image: imageUrl,
    });
    
    res.status(201).json({success: true, newSolution});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'An unknown error occurred' });
    }
  }
};

export const deleteSolution = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ success: false, message: "No ID provided" });
      return;
    }

    // Find and delete the solution
    const deletedSolution = await Solution.findByIdAndDelete(id);

    if (!deletedSolution) {
      res.status(404).json({ success: false, message: "Solution not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Solution deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "An unknown error occurred" });
    }
  }
};


