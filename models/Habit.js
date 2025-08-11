const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Habit", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    icon: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, allowNull: false },
    streak: { type: DataTypes.INTEGER, defaultValue: 0 },
    weekProgress: {
      type: DataTypes.JSON,
      defaultValue: [false, false, false, false, false, false, false],
    },
  }, {
    tableName: "habits",
    timestamps: true,
  });
};
