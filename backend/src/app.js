import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middleware.js";

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
app.use(errorHandler);


export default app;