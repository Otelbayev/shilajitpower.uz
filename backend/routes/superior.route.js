import express from "express";
import superiorController from "../controllers/superior.controller.js";

const router = express.Router();

router.get("/", superiorController.getAll);
router.post("/", superiorController.create);
router.put("/:id", superiorController.update);
router.delete("/:id", superiorController.delete);

export default router;
