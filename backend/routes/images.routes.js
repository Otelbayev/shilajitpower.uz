import { Router } from "express";
import ImagesController from "../controllers/images.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", ImagesController.getAll);
router.get("/:id", ImagesController.getById);
router.post("/", upload.array("images", 10), ImagesController.create);
router.put("/:id", upload.array("images", 10), ImagesController.update);
router.delete("/:id", ImagesController.delete);

export default router;
