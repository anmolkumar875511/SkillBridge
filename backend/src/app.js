import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.middleware.js';
import './cron/databaseMaintenance.cron.js';
import './utils/passport.js';
import passport from 'passport';
import connectDB from './db/index.js';

const app = express();

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed during request:", error);
        res.status(500).json({ error: "Database connection unavailable" });
    }
});

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
    res.json({ 
        status: "Active",
        message: "SkillBridge API is running!",
        environment: process.env.NODE_ENV 
    });
});

app.use(errorHandler);

export default app;
