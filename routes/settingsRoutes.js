const express = require("express");
const router = express.Router();
const { getSettings, updateSettings, updateDashboardConfig } = require("../controllers/settingsController");
const roleCheck = require("../middleware/role");

router.get("/", roleCheck("administrator"), getSettings);
router.put("/", roleCheck("administrator"), updateSettings);
router.put("/dashboard-config", roleCheck("administrator"), updateDashboardConfig);

module.exports = router;
