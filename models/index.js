const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ Connection error:", err));

const User = require("./User")(sequelize, DataTypes);
const TimeSlot = require("./TimeSlot")(sequelize, DataTypes);
const Habit = require("./Habit")(sequelize, DataTypes);
const UserFavPic = require("./UserFavPic")(sequelize, DataTypes);

// Associations...
User.hasMany(TimeSlot, { foreignKey: "userId", onDelete: "CASCADE" });
TimeSlot.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Habit, { foreignKey: "userId", onDelete: "CASCADE" });
Habit.belongsTo(User, { foreignKey: "userId" });

User.hasMany(UserFavPic, { foreignKey: "userId", onDelete: "CASCADE" });
UserFavPic.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, TimeSlot, Habit, UserFavPic };
