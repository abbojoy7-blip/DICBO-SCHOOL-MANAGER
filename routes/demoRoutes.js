const express = require("express");
const router = express.Router();
const { generateDemoData, resetData } = require("../controllers/demoController");
const roleCheck = require("../middleware/role");

router.post("/generate", roleCheck("administrator"), generateDemoData);
router.post("/reset", roleCheck("administrator"), resetData);

module.exports = router;
