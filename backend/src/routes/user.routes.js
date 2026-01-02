import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getUserProfile,
    updateUserProfile,
    changeUserPassword,
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

router.post("/logout", verifyToken, logoutUser);
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.put("/change-password", verifyToken, changeUserPassword);

export default router;