const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();



const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FarmLink AI Backend is running 🚜🌱",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    database: mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚜 FarmLink AI server running on port ${PORT}`);
});