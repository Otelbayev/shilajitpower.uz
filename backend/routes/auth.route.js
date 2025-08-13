import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", authController.login);
router.get("/check", verifyToken, authController.check);

export default router;
