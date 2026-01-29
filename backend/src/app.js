import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.middleware.js';
import { startFindWorkCron } from './cron/findwork.cron.js';
import './cron/databaseMaintenance.cron.js';
import './utils/passport.js';
import passport from 'passport';

startFindWorkCron();

const app = express();

app.use(express.json({ limit: '32kb' }));
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true, limit: '32kb' }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL, 
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

import userRoutes from './routes/user.routes.js';
app.use('/api/v1/user', userRoutes);

import resumeRoutes from './routes/resume.routes.js';
app.use('/api/v1/resume', resumeRoutes);

import opportunityRoutes from './routes/opportunity.routes.js';
app.use('/api/v1/opportunity', opportunityRoutes);

import skillGapRoutes from './routes/skillGap.routes.js';
app.use('/api/v1/skillgap', skillGapRoutes);

import roadmapRoutes from './routes/roadmap.routes.js';
app.use('/api/v1/roadmap', roadmapRoutes);

import adminRoutes from './routes/admin.routes.js';
app.use('/api/v1/admin', adminRoutes);

app.get("/", (req, res) => {
    res.json({ message: "SkillBridge API is running!" });
});

app.use(errorHandler);

export default app;
