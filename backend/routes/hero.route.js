import { Router } from "express";
import heroController from "../controllers/hero.controller.js";

const router = Router();

router.get("/", heroController.get);
router.post("/", heroController.save);

export default router;
