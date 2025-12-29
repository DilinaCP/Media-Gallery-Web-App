import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  getStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getStats);
router.get("/users", getUsers);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/status", updateUserStatus);

export default router;
