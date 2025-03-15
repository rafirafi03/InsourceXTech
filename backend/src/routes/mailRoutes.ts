// src/routes/mailRoutes.ts
import express from 'express';
import { sendMail } from '../controllers/mailController';

const router = express.Router();

router.post('/sendMail', sendMail);

export default router;