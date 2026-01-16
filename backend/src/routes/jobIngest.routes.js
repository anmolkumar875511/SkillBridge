import express from "express";
import { ingestJobs } from "../controllers/jobIngest.controller.js";

const router = express.Router();

router.get("/findwork", ingestJobs);

export default router;