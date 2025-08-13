import express from "express";
import ContactsController from "../controllers/contacts.controller.js";
import upload from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.single("icon"),
  ContactsController.createContact
);
router.get("/", verifyToken, ContactsController.getAllContacts);
router.get("/:id", verifyToken, ContactsController.getContactById);
router.put(
  "/:id",
  verifyToken,
  upload.single("icon"),
  ContactsController.updateContact
);
router.delete("/:id", verifyToken, ContactsController.deleteContact);

export default router;
