const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup for both local dev and deployed frontend
const corsOptions = {
  origin: [
    "http://localhost:3000", // Local development
    "https://momentro-frontend.vercel.app" // Vercel frontend
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/timetable", require("./routes/timetable"));
app.use("/api/habits", require("./routes/habits"));
app.use("/api/userfavpic", require("./routes/userFavPic"));

// ✅ Database sync and server start
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to sync database:", err);
  });
