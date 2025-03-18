// src/routes/servicesRoutes.ts
import express from 'express';
import { getServices, addService, deleteService } from '../controllers/servicesController';
import upload from '../config/multer';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// for user
router.get('/getServices', getServices);

// for admin
router.get('/admin/getServices', authMiddleware, getServices);
router.post('/admin/addServices', authMiddleware, upload.single('image'), addService);
router.delete('/admin/deleteService/:id', authMiddleware, deleteService)

export default router;