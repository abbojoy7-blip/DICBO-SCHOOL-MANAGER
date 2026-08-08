const express = require("express");
const router = express.Router();
const {
  markAttendance,
  getStudentAttendance,
  getClassAttendanceReport
} = require("../controllers/attendanceController");
const roleCheck = require("../middleware/role");

router.post("/", roleCheck("administrator", "teacher"), markAttendance);
router.get("/student/:id", getStudentAttendance);
router.get("/report", roleCheck("administrator", "teacher"), getClassAttendanceReport);

module.exports = router;
