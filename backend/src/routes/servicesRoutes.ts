// src/routes/servicesRoutes.ts
import express from 'express';
import { getServices, addService } from '../controllers/servicesController';

const router = express.Router();

router.get('/getServices', getServices);
router.post('/addServices', addService);

export default router;