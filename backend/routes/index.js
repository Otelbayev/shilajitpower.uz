import { Router } from "express";
import authRoutes from "./auth.route.js";
import heroRoutes from "./hero.route.js";
import whyRoutes from "./why.route.js";
import commentsRoutes from "./comments.routes.js";
import statisticsRoutes from "./statistics.routes.js";
import questionsRoutes from "./questions.routes.js";
import contactsRoutes from "./contacts.routes.js";
import certificatesRoutes from "./certificates.routes.js";
import pricesRoutes from "./prices.routes.js";
import whomRoutes from "./whom.routes.js";
import superiorRoutes from "./superior.route.js";
import { getAllData } from "../controllers/all.controller.js";
import {
  getOrders,
  submitForm,
  updateOrderStatus,
} from "../controllers/form.controller.js";
import { formLimiter } from "../middleware/limit.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/hero", verifyToken, heroRoutes);
router.use("/why", verifyToken, whyRoutes);
router.use("/comments", verifyToken, commentsRoutes);
router.use("/statistics", verifyToken, statisticsRoutes);
router.use("/questions", verifyToken, questionsRoutes);
router.use("/contacts", verifyToken, contactsRoutes);
router.use("/certificates", verifyToken, certificatesRoutes);
router.use("/prices", verifyToken, pricesRoutes);
router.use("/whom", verifyToken, whomRoutes);
router.use("/superior", verifyToken, superiorRoutes);

router.get("/all", getAllData);
router.post("/submit", formLimiter, submitForm);
router.get("/orders", verifyToken, getOrders);
router.put("/orders/:id/status", verifyToken, updateOrderStatus);

export default router;
