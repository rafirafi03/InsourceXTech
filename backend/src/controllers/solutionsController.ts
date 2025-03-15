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
    const { title, image } = req.body;
    
    const newSolution = await Solution.create({
      title,
      image,
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