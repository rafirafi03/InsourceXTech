// src/routes/aboutRoutes.ts
import express from 'express';
import { getAboutCompany, editAboutCompany } from '../controllers/aboutController';

const router = express.Router();

router.get('/aboutCompany', getAboutCompany);
router.put('/editAboutCompany', editAboutCompany);

export default router;