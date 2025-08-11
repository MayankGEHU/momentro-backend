const express = require("express");
const multer = require("multer");
const path = require("path");
const { UserFavPic } = require("../models");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("req.user in upload:", req.user);

      if (!req.file)
        return res.status(400).json({ error: "No file uploaded" });

      const userId = req.user?.id || req.user?.userId;

      if (!userId)
        return res.status(400).json({ error: "User ID missing in request" });

      const imageUrl = `/uploads/${req.file.filename}`;

      const userFavPic = await UserFavPic.create({
        userId,
        imageUrl,
      });

      res.status(201).json({
        message: "Image uploaded successfully",
        imageUrl: userFavPic.imageUrl,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.get("/", authenticate, async (req, res) => {
  try {
    console.log("req.user in get pics:", req.user);

    const userId = req.user?.id || req.user?.userId;

    if (!userId)
      return res.status(400).json({ error: "User ID missing in request" });

    const pics = await UserFavPic.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(pics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
