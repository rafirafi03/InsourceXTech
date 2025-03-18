// src/routes/solutionsRoutes.ts
import express from 'express';
import { getSolutions, addSolution, deleteSolution } from '../controllers/solutionsController';
import upload from '../config/multer';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// for user
router.get('/getSolutions', getSolutions);


// for admin
router.get('/admin/getSolutions', authMiddleware, getSolutions);
router.post('/admin/addSolutions', authMiddleware, upload.single('image'), addSolution);
router.delete('/admin/deleteSolution/:id', authMiddleware, deleteSolution)

export default router;