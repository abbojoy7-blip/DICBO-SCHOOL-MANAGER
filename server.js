const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const DEMO_MODE = true;

dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const feeRoutes = require("./routes/feeRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== DATABASE =====
connectDB().catch((err) => {
  console.log("DB connection error ignored for demo:", err.message);
});

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/reports", reportRoutes);

// ===== DEMO DATA (NO DATABASE REQUIRED) =====
app.get("/api/students", (req, res) => {
  res.json([
    { id: 1, name: "John Doe", class: "P5", feeStatus: "Paid" },
    { id: 2, name: "Sarah Namukasa", class: "P6", feeStatus: "Pending" },
    { id: 3, name: "Brian Okello", class: "P7", feeStatus: "Paid" },
  ]);
});

app.get("/api/fees", (req, res) => {
  res.json([
    { student: "John Doe", amount: 200000, status: "Paid" },
    { student: "Sarah Namukasa", amount: 200000, status: "Unpaid" },
  ]);
});

app.get("/api/reports", (req, res) => {
  res.json({
    totalStudents: 3,
    paidFees: 2,
    pendingFees: 1,
  });
});

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running successfully 🚀",
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    server: "running",
    database: process.env.MONGO_URI ? "configured" : "not configured",
    mode: "demo-safe",
  });
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`Port ${PORT} is already in use; continuing without the backend server.`);
  } else {
    console.error('Server startup error:', err);
  }
});
