const express = require("express");
const router = express.Router();
const { exportData } = require("../controllers/backupController");
const roleCheck = require("../middleware/role");

router.get("/export", roleCheck("administrator"), exportData);

module.exports = router;
