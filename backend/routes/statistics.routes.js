import { Router } from "express";
import StatisticsController from "../controllers/statistics.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, StatisticsController.getAll);
router.get("/:id", verifyToken, StatisticsController.getById);
router.post("/", verifyToken, StatisticsController.create);
router.put("/:id", verifyToken, StatisticsController.update);
router.delete("/:id", verifyToken, StatisticsController.delete);

export default router;
