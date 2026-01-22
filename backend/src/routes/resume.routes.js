import { Router } from 'express';
import { uploadResume, getResumeById, updateResume } from '../controllers/resume.controller.js';
import { uploadResumeMiddleware } from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/upload', verifyToken, uploadResumeMiddleware.single('resume'), uploadResume);

router.get('/:id', verifyToken, getResumeById);

router.put('/:id', verifyToken, updateResume);

export default router;
