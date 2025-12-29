import express from "express";
import {
  sendMessage,
  getMessages,
  markAsRead,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.post("/", sendMessage);

// Admin
router.get("/", protect, adminOnly, getMessages);
router.patch("/:id/read", protect, adminOnly, markAsRead);

export default router;
