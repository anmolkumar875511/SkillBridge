import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createRoadmap, toggleTaskStatus}  from "../controllers/roadmap.controller.js";

const router = Router();

router.get("/gerenate/:opportunityId", verifyToken, createRoadmap);
router.put("/toggle/:roadmapId/:taskId", verifyToken, toggleTaskStatus);

export default router;