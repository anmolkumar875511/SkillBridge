import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createRoadmap, getRoadmap, toggleTaskStatus, getCompletedRoadmaps, deletedRoadmap }  from "../controllers/roadmap.controller.js";

const router = Router();

router.get("/generate/:opportunityId", verifyToken, createRoadmap);
router.get("/completed", verifyToken, getCompletedRoadmaps);
router.get("/", verifyToken, getRoadmap);
router.put("/toggle/:roadmapId/:taskId", verifyToken, toggleTaskStatus);
router.delete("/:roadmapId", verifyToken, deletedRoadmap);

export default router;