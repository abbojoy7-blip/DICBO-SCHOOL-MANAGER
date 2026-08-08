const express = require("express");
const router = express.Router();
const { createExam, getExams, recordGrades, getStudentGrades } = require("../controllers/examController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getExams);
router.post("/", roleCheck("administrator"), createExam);
router.post("/grades", roleCheck("administrator", "teacher"), recordGrades);
router.get("/grades/:studentId", getStudentGrades);

module.exports = router;
