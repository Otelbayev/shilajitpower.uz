import { Router } from "express";
import PricesController from "../controllers/prices.controller.js";

const router = Router();

router.get("/", PricesController.getAll);
router.get("/:id", PricesController.getById);
router.post("/", PricesController.create);
router.put("/:id", PricesController.update);
router.delete("/:id", PricesController.delete);

export default router;
