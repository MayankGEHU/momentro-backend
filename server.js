const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000", // local dev
    "https://momentro-frontend.vercel.app" // deployed frontend
  ],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/timetable", require("./routes/timetable"));
app.use("/api/habits", require("./routes/habits"));
app.use("/api/userfavpic", require("./routes/userFavPic"));

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to sync database:", err);
  });