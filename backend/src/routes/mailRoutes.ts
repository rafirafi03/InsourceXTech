// src/routes/mailRoutes.ts
import express from 'express';
import { sendMail } from '../controllers/mailController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/sendMail', sendMail);

export default router;