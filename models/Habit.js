// models/Habit.js
module.exports = (sequelize, DataTypes) => {
  const Habit = sequelize.define("Habit", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    icon: DataTypes.STRING,
    weekProgress: {
      type: DataTypes.JSON, // [true, false, ...]
      defaultValue: [false, false, false, false, false, false, false],
    },
    streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastCompletedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    morningCompletedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    afternoonCompletedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    }
  });

  return Habit;
};
