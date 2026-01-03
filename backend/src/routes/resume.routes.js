import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  parseResumePreview,
  confirmResumeData
} from "../controllers/resume.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/parse",
  verifyToken,
  upload.single("resume"),
  parseResumePreview
);

router.post(
  "/confirm",
  verifyToken,
  confirmResumeData
);

export default router;
