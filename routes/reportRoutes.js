const express = require("express");
const router = express.Router();
const {
  dailyCollections,
  studentBalances,
  getDashboardStats,
  getFinancialReport,
  getStudentReport
} = require("../controllers/reportController");
const roleCheck = require("../middleware/role");

router.get("/daily", dailyCollections);
router.get("/balances", studentBalances);
router.get("/dashboard", getDashboardStats);

// Advanced Reports
router.get("/financial", roleCheck("administrator", "accountant"), getFinancialReport);
router.get("/students", roleCheck("administrator", "receptionist"), getStudentReport);

module.exports = router;
