import { Router } from "express";
import whomController from "../controllers/whom.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", whomController.getAll);
router.get("/:id", whomController.getById);
router.post(
  "/",

  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  whomController.create
);
router.put(
  "/:id",

  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  whomController.update
);
router.delete("/:id", whomController.delete);

export default router;
