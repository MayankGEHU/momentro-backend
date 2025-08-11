const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options to allow credentials and specify origin
const corsOptions = {
  origin: "http://localhost:3000", // frontend URL
  credentials: true,               // allow cookies/auth headers
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/timetable", require("./routes/timetable"));
app.use("/api/habits", require("./routes/habits"));
// Sync DB then start server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
