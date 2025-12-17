import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import Image from "../models/Image.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 0, 100);
    const images = await Image.find()
      .sort({ createdAt: -1 })
      .limit(limit || undefined);
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch images", error: err.message });
  }
});

router.post("/upload", protect, upload.array("image", 20), async (req, res) => {
  try {
    const names = req.body.names ? JSON.parse(req.body.names) : [];
    const images = await Promise.all(
      req.files.map((file, idx) =>
        Image.create({
          url: file.path,
          publicId: file.filename,
          name: names[idx] || file.originalname,
          user: req.user.id,
        })
      )
    );
    res.status(201).json(images);
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

export default router;