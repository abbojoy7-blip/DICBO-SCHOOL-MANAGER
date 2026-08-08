const express = require("express");
const router = express.Router();
const {
  createYear, getYears,
  createClass, getClasses,
  createSubject, getSubjects
} = require("../controllers/academicController");
const roleCheck = require("../middleware/role");

// Academic Years
router.get("/years", getYears);
router.post("/years", roleCheck("administrator"), createYear);

// Classes
router.get("/classes", getClasses);
router.post("/classes", roleCheck("administrator"), createClass);

// Subjects
router.get("/subjects", getSubjects);
router.post("/subjects", roleCheck("administrator"), createSubject);

module.exports = router;
