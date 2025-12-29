import express from "express";
import {
	registerUser,
	loginUser,
	requestPasswordReset,
	resetPassword,
} from "../controllers/authController.js";
import { googleAuth } from "../controllers/googleAuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
