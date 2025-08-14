import { Router } from "express";
import CertificatesController from "../controllers/certificates.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", CertificatesController.getAll);
router.get("/:id", CertificatesController.getById);
router.post("/", upload.single("image"), CertificatesController.create);
router.put("/:id", upload.single("image"), CertificatesController.update);
router.delete("/:id", CertificatesController.delete);

export default router;
