// src/routes/aboutRoutes.ts
import express from 'express';
import { Login, Logout, ChangePass, ForgetPasswordRequest, ResetPassword } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', Login);
router.post('/logout', Logout);
router.put('/admin/changePass', authMiddleware, ChangePass);
router.post('/admin/forgetPasswordRequest', ForgetPasswordRequest)
router.post('/admin/resetPass', ResetPassword)

export default router;