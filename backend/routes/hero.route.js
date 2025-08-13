import { Router } from "express";
import heroController from "../controllers/hero.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, heroController.get);
router.post("/", verifyToken, heroController.save);

export default router;
