import { Router } from "express";
import QuestionsController from "../controllers/questions.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, QuestionsController.getAll);
router.get("/:id", verifyToken, QuestionsController.getById);
router.post("/", verifyToken, QuestionsController.create);
router.put("/:id", verifyToken, QuestionsController.update);
router.delete("/:id", verifyToken, QuestionsController.delete);

export default router;
