import { Router } from "express";
import StatisticsController from "../controllers/statistics.controller.js";

const router = Router();

router.get("/", StatisticsController.getAll);
router.get("/:id", StatisticsController.getById);
router.post("/", StatisticsController.create);
router.put("/:id", StatisticsController.update);
router.delete("/:id", StatisticsController.delete);

export default router;
