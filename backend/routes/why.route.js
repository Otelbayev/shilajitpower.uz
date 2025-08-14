import { Router } from "express";
import WhyController from "../controllers/why.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", WhyController.getAll);
router.get("/:id", WhyController.getById);
router.post("/", upload.single("icon"), WhyController.create);
router.put("/:id", upload.single("icon"), WhyController.update);
router.delete("/:id", WhyController.delete);

export default router;
