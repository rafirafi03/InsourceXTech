// src/routes/servicesRoutes.ts
import express from 'express';
import { getServices, addService, deleteService } from '../controllers/servicesController';
import upload from '../config/multer';

const router = express.Router();

router.get('/getServices', getServices);
router.post('/addServices', upload.single('image'), addService);
router.delete('/deleteService/:id', deleteService)

export default router;