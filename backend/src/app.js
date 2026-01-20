import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import { startFindWorkCron } from "./cron/adzuna.cron.js";
import "./cron/cleanupUnverifiedUsers.cron.js";

startFindWorkCron();

const app = express();

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true, limit: '32kb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);

import resumeRoutes from "./routes/resume.routes.js";
app.use("/api/v1/resume", resumeRoutes);

import jobIngestRoutes from "./routes/jobIngest.routes.js";
app.use("/api/v1/ingest", jobIngestRoutes);

import opportunityRoutes from "./routes/opportunity.routes.js";
app.use("/api/v1/opportunity", opportunityRoutes);

import skillGapRoutes from "./routes/skillGap.routes.js";
app.use("/api/v1/skillgap", skillGapRoutes);

import roadmapRoutes from "./routes/roadmap.routes.js";
app.use("/api/v1/roadmap", roadmapRoutes);

app.use(errorHandler);


export default app;