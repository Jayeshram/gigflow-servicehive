const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");

// Load env variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS for frontend + cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "GigFlow Backend Running ✅" });
});

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/gigs", require("./src/routes/gigRoutes"));
app.use("/api/bids", require("./src/routes/bidRoutes"));

const PORT = process.env.PORT || 5000;

// ✅ Start server ONLY after MongoDB is connected
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
