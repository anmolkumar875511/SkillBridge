import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createRoadmap}  from "../controllers/roadmap.controller.js";

const router = Router();

router.get("/gerenate/:opportunityId", verifyToken, createRoadmap);

export default router;