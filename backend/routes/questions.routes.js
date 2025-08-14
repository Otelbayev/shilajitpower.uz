import { Router } from "express";
import QuestionsController from "../controllers/questions.controller.js";

const router = Router();

router.get("/", QuestionsController.getAll);
router.get("/:id", QuestionsController.getById);
router.post("/", QuestionsController.create);
router.put("/:id", QuestionsController.update);
router.delete("/:id", QuestionsController.delete);

export default router;
