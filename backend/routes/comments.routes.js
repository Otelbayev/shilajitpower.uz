import express from "express";
import CommentsController from "../controllers/comments.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", CommentsController.getAll);
router.get("/:id", CommentsController.getOne);
router.post(
  "/",

  upload.single("image"),
  CommentsController.create
);
router.put(
  "/:id",

  upload.single("image"),
  CommentsController.update
);
router.delete("/:id", CommentsController.delete);

export default router;
