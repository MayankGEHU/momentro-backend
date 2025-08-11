const express = require("express");
const { TimeSlot } = require("../models");  // Make sure TimeSlot is exported in models/index.js
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// GET /api/timetable/
// Get all time slots for the authenticated user
router.get("/", authenticate, async (req, res) => {
  try {
    // Use req.user.userId as user identifier (depends on your JWT payload structure)
    const userId = req.user.userId || req.user.id; // fallback to id if userId not present

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const slots = await TimeSlot.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });

    res.json(slots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/timetable/
// Create a new time slot for authenticated user
router.post("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { time, name, description } = req.body;
    if (!time || !name || !description) {
      return res.status(400).json({ error: "All fields required" });
    }

    const slot = await TimeSlot.create({
      time,
      name,
      description,
      userId,
    });

    res.status(201).json(slot);
  } catch (err) {
    console.error("Error creating slot:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/timetable/:id
// Delete a time slot by id, only if it belongs to the authenticated user
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deleted = await TimeSlot.destroy({
      where: {
        id: req.params.id,
        userId,
      },
    });

    if (deleted) {
      return res.status(204).send();
    }

    res.status(404).json({ error: "Time slot not found" });
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
