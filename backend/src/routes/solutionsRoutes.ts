// src/routes/solutionsRoutes.ts
import express from 'express';
import { getSolutions, addSolution } from '../controllers/solutionsController';

const router = express.Router();

router.get('/getSolutions', getSolutions);
router.post('/addSolutions', addSolution);

export default router;