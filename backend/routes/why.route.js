import { Router } from "express";
import WhyController from "../controllers/why.controller.js";
import upload from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, WhyController.getAll);
router.get("/:id", verifyToken, WhyController.getById);
router.post("/", verifyToken, upload.single("icon"), WhyController.create);
router.put("/:id", verifyToken, upload.single("icon"), WhyController.update);
router.delete("/:id", verifyToken, WhyController.delete);

export default router;
