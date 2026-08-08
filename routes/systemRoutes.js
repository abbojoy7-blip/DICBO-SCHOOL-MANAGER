const express = require("express");
const router = express.Router();
const {
  getAllSchools,
  getSystemStats,
  getSystemHealth,
  updateSchoolSubscription,
  getGlobalAuditLogs
} = require("../controllers/systemController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

// Strictly for Super Admins
router.use(auth);
router.use(roleCheck("superadmin"));

router.get("/schools", getAllSchools);
router.get("/stats", getSystemStats);
router.get("/health", getSystemHealth);
router.put("/schools/:schoolId/subscription", updateSchoolSubscription);
router.get("/audit-logs", getGlobalAuditLogs);

module.exports = router;
