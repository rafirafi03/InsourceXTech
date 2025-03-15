// src/routes/whyUsRoutes.ts
import express from 'express';
import { getWhyUs, editWhyUs } from '../controllers/whyUsController';

const router = express.Router();

router.get('/whyUs', getWhyUs);
router.put('/editWhyUs', editWhyUs);

export default router;