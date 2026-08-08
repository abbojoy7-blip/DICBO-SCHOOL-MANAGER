const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");
const roleCheck = require("../middleware/role");

// All routes here require 'auth' (handled in server.js)
router.get("/", getStudents);
router.get("/:id", getStudentById);

// Administrative actions
router.post("/", roleCheck("administrator", "receptionist"), createStudent);
router.put("/:id", roleCheck("administrator", "receptionist"), updateStudent);
router.delete("/:id", roleCheck("administrator"), deleteStudent);

module.exports = router;
