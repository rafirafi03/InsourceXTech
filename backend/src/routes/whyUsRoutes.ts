// src/routes/whyUsRoutes.ts
import express from 'express';
import { getWhyUs, editWhyUs } from '../controllers/whyUsController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// for user
router.get('/whyUs', getWhyUs);

// for admin
router.get('/admin/whyUs', authMiddleware, getWhyUs);
router.put('/admin/editWhyUs', authMiddleware, editWhyUs);

export default router;