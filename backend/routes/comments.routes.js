import express from "express";
import CommentsController from "../controllers/comments.controller.js";
import upload from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, CommentsController.getAll);
router.get("/:id", verifyToken, CommentsController.getOne);
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  CommentsController.create
);
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  CommentsController.update
);
router.delete("/:id", verifyToken, CommentsController.delete);

export default router;
