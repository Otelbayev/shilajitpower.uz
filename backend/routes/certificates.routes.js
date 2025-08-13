import { Router } from "express";
import CertificatesController from "../controllers/certificates.controller.js";
import upload from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, CertificatesController.getAll);
router.get("/:id", verifyToken, CertificatesController.getById);
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  CertificatesController.create
);
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  CertificatesController.update
);
router.delete("/:id", verifyToken, CertificatesController.delete);

export default router;
