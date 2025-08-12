const express = require("express");
const router = express.Router();
const { Habit } = require("../models");

router.get("/", async (req, res) => {
  try {
    const habits = await Habit.findAll();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const habit = await Habit.create({
      ...req.body,
      weekProgress: req.body.weekProgress || [false, false, false, false, false, false, false],
      morningCompletedDate: null,
      afternoonCompletedDate: null,
      lastCompletedDate: null,
    });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/toggle-day", async (req, res) => {
  try {
    const { dayIndex } = req.body;
    if (dayIndex < 0 || dayIndex > 6) {
      return res.status(400).json({ error: "Invalid day index" });
    }

    const habit = await Habit.findByPk(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });

    let updatedProgress = Array.isArray(habit.weekProgress)
      ? [...habit.weekProgress]
      : JSON.parse(habit.weekProgress || "[false,false,false,false,false,false,false]");

    updatedProgress[dayIndex] = !updatedProgress[dayIndex];

    let updatedStreak = habit.streak;
    if (updatedProgress[dayIndex]) {
      updatedStreak += 1;
    } else {
      updatedStreak = Math.max(updatedStreak - 1, 0);
    }

    habit.weekProgress = updatedProgress;
    habit.streak = updatedStreak;
    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const habit = await Habit.findByPk(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });

    await habit.destroy();
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
