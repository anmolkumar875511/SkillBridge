import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  verifyEmailOTP,
  resendEmailOTP
} from "../controllers/user.controller.js";

const router = Router();

// Auth
router.post("/register", registerUser);
router.post("/verify-email", verifyEmailOTP);
router.post("/resend-otp", resendEmailOTP);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// Protected
router.post("/logout", verifyToken, logoutUser);
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.put("/change-password", verifyToken, changeUserPassword);

export default router;