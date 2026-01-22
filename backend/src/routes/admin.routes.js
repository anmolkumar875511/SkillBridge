import { Router } from "express"
import { ingest, toggleBlacklist, getLogs, exportLogs } from "../controllers/admin.controller.js"
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyToken, authorizeRoles('admin'));

router.get("/fetch", ingest);
router.patch("/blacklist/:userId", toggleBlacklist);
router.get('/logs', getLogs);
router.get('/logs/export', exportLogs);

export default router;