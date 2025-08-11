const express = require("express");
const { Habit } = require("../models");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id; 
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const habits = await Habit.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });
    res.json(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, description, icon, weekProgress, streak } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Name and description required" });
    }

    const habit = await Habit.create({
      name,
      description,
      icon: icon || "reading", 
      weekProgress: weekProgress || [false, false, false, false, false, false, false],
      streak: streak || 0,
      userId,
    });

    res.status(201).json(habit);
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const habit = await Habit.findOne({
      where: { id: req.params.id, userId },
    });

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const { updatedWeekProgress, updatedStreak } = req.body;

    if (!updatedWeekProgress || !Array.isArray(updatedWeekProgress) || updatedWeekProgress.length !== 7) {
      return res.status(400).json({ error: "Invalid weekProgress format" });
    }
    if (typeof updatedStreak !== "number") {
      return res.status(400).json({ error: "Invalid streak value" });
    }

    habit.weekProgress = updatedWeekProgress;
    habit.streak = updatedStreak;

    await habit.save();

    res.json(habit);
  } catch (err) {
    console.error("Error updating habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const deleted = await Habit.destroy({
      where: { id: req.params.id, userId },
    });

    if (deleted) return res.status(204).send();
    res.status(404).json({ error: "Habit not found" });
  } catch (err) {
    console.error("Error deleting habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
