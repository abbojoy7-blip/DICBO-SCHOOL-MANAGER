const express = require("express");
const router = express.Router();
const { recordIncident, getDisciplineRecords } = require("../controllers/disciplineController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getDisciplineRecords);
router.post("/", roleCheck("administrator", "teacher"), recordIncident);

module.exports = router;
