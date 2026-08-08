const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Middlewares
const auth = require("./middleware/auth");
const roleCheck = require("./middleware/role");
const errorHandler = require("./middleware/errorHandler");

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const feeRoutes = require("./routes/feeRoutes");
const reportRoutes = require("./routes/reportRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const academicRoutes = require("./routes/academicRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const staffRoutes = require("./routes/staffRoutes");
const backupRoutes = require("./routes/backupRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const demoRoutes = require("./routes/demoRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const systemRoutes = require("./routes/systemRoutes");
const healthRoutes = require("./routes/healthRoutes");
const examRoutes = require("./routes/examRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const disciplineRoutes = require("./routes/disciplineRoutes");
const hrRoutes = require("./routes/hrRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const timetableRoutes = require("./routes/timetableRoutes");

const app = express();
const VERSION = "1.0.0";
const RELEASE_DATE = new Date().toLocaleDateString();

// ===== SECURITY & PERFORMANCE MIDDLEWARE =====
// HTTP Headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Data Sanitization against NoSQL injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Compression
app.use(compression());

// Body parser with payload limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests from this IP, please try again later." }
});
app.use("/api/", limiter);

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== DATABASE =====
connectDB();

// ===== ROUTES =====
app.use("/api/auth", authRoutes);

// Protected routes (require authentication)
app.use("/api/students", auth, studentRoutes);
app.use("/api/fees", auth, roleCheck("administrator", "accountant"), feeRoutes);
app.use("/api/reports", auth, reportRoutes);
app.use("/api/attendance", auth, attendanceRoutes);
app.use("/api/academic", auth, academicRoutes);
app.use("/api/upload", auth, uploadRoutes);
app.use("/api/settings", auth, settingsRoutes);
app.use("/api/staff", auth, staffRoutes);
app.use("/api/backup", auth, backupRoutes);
app.use("/api/budget", auth, budgetRoutes);
app.use("/api/demo", auth, demoRoutes);
app.use("/api/notifications", auth, notificationRoutes);
app.use("/api/system", systemRoutes);
app.use("/api", healthRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/hostels", hostelRoutes);
app.use("/api/clinic", clinicRoutes);
app.use("/api/discipline", disciplineRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/timetable", timetableRoutes);

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DICBO School Manager Enterprise API is running 🚀",
    version: VERSION,
    releaseDate: RELEASE_DATE
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    server: "running",
    database: "connected",
    mode: process.env.NODE_ENV || "development",
    version: VERSION
  });
});

// ===== ERROR HANDLERS =====
app.use(errorHandler);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST === "0.0.0.0" ? "localhost" : HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    console.error('Server startup error:', err);
  }
});
