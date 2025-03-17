// src/routes/solutionsRoutes.ts
import express from 'express';
import { getSolutions, addSolution, deleteSolution } from '../controllers/solutionsController';
import upload from '../config/multer';

const router = express.Router();

router.get('/getSolutions', getSolutions);
router.post('/addSolutions',upload.single('image'), addSolution);
router.delete('/deleteSolution/:id', deleteSolution)

export default router;