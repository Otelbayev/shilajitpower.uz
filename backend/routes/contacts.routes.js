import express from "express";
import ContactsController from "../controllers/contacts.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",

  upload.single("icon"),
  ContactsController.createContact
);
router.get("/", ContactsController.getAllContacts);
router.get("/:id", ContactsController.getContactById);
router.put(
  "/:id",

  upload.single("icon"),
  ContactsController.updateContact
);
router.delete("/:id", ContactsController.deleteContact);

export default router;
