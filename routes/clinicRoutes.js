const express = require("express");
const router = express.Router();
const { recordVisit, getMedicalRecords } = require("../controllers/clinicController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getMedicalRecords);
router.post("/", roleCheck("administrator", "teacher"), recordVisit);

module.exports = router;
