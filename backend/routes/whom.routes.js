import { Router } from "express";
import whomController from "../controllers/whom.controller.js";
import upload from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, whomController.getAll);
router.get("/:id", verifyToken, whomController.getOne);
router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "image", verifyToken, maxCount: 1 },
    { name: "icon", verifyToken, maxCount: 1 },
  ]),
  whomController.create
);
router.put(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "image", verifyToken, maxCount: 1 },
    { name: "icon", verifyToken, maxCount: 1 },
  ]),
  whomController.update
);
router.delete("/:id", verifyToken, whomController.delete);

export default router;
