// src/routes/aboutRoutes.ts
import express from 'express';
import { getAboutCompany, editAboutCompany } from '../controllers/aboutController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// for user
router.get('/aboutCompany',  getAboutCompany);

// for admin
router.get('/admin/aboutCompany', authMiddleware,  getAboutCompany);
router.put('/admin/editAboutCompany', authMiddleware, editAboutCompany);

export default router;