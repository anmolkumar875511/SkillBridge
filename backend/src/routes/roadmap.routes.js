import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createRoadmap, getRoadmap, toggleTaskStatus}  from "../controllers/roadmap.controller.js";

const router = Router();

router.get("/gerenate/:opportunityId", verifyToken, createRoadmap);
router.get("/", verifyToken, getRoadmap);
router.put("/toggle/:roadmapId/:taskId", verifyToken, toggleTaskStatus);

export default router;