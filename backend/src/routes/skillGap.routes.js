import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getMatchAnalysis } from '../controllers/skillGap.controller.js';

const router = Router();

router.get('/analyze/:opportunityId', verifyToken, getMatchAnalysis);

export default router;
