import express from "express";
import { downloadZip } from "../controllers/zipController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/download", protect, downloadZip);

export default router;
