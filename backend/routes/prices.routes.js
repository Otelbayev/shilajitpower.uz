import { Router } from "express";
import PricesController from "../controllers/prices.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, PricesController.getAll);
router.get("/:id", verifyToken, PricesController.getById);
router.post("/", verifyToken, PricesController.create);
router.put("/:id", verifyToken, PricesController.update);
router.delete("/:id", verifyToken, PricesController.delete);

export default router;
