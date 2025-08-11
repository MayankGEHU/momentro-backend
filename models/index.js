const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ Connection error:", err));


const User = require("./User")(sequelize, DataTypes);
const TimeSlot = require("./TimeSlot")(sequelize, DataTypes);
const Habit = require("./Habit")(sequelize, DataTypes);
const UserFavPic = require("./UserFavPic")(sequelize, DataTypes);

User.hasMany(TimeSlot, { foreignKey: "userId", onDelete: "CASCADE" });
TimeSlot.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Habit, { foreignKey: "userId", onDelete: "CASCADE" });
Habit.belongsTo(User, { foreignKey: "userId" });

User.hasMany(UserFavPic, { foreignKey: "userId", onDelete: "CASCADE" });
UserFavPic.belongsTo(User, { foreignKey: "userId" });


module.exports = { sequelize, User, TimeSlot, Habit, UserFavPic };