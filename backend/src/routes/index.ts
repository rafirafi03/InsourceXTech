// src/routes/index.ts
import express from 'express';
import aboutRoutes from './aboutRoutes';
import servicesRoutes from './servicesRoutes';
import solutionsRoutes from './solutionsRoutes';
import whyUsRoutes from './whyUsRoutes';
import mailRoutes from './mailRoutes';

const router = express.Router();

// Mount routes
router.use('/', aboutRoutes);
router.use('/', servicesRoutes);
router.use('/', solutionsRoutes);
router.use('/', whyUsRoutes);
router.use('/', mailRoutes);

export default router;