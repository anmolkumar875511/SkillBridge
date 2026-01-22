import { Router } from "express"
import { ingest, toggleBlacklist } from "../controllers/admin.controller.js"
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/fetch", verifyToken, authorizeRoles("admin"), ingest);
router.patch("/blacklist/:userId", verifyToken, authorizeRoles("admin"), toggleBlacklist);

export default router;