import { Router } from 'express';
import { uploadResume, getLatestResume, updateResume } from '../controllers/resume.controller.js';
import { uploadResumeMiddleware } from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getLatestResume);

router.post('/upload', verifyToken, uploadResumeMiddleware.single('resume'), uploadResume);

router.put('/:id', verifyToken, updateResume);

export default router;
