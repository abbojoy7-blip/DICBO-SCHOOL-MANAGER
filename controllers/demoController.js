const User = require("../models/User");
const Class = require("../models/Class");
const Student = require("../models/Student");
const AcademicYear = require("../models/AcademicYear");
const FeePayment = require("../models/FeePayment");
const Attendance = require("../models/Attendance");
const Counter = require("../models/Counter");

exports.generateDemoData = async (req, res) => {
  try {
    // Basic seeder logic (simplified for immediate use)
    const year = await AcademicYear.findOne({ status: "Active" });
    if (!year) return res.status(400).json({ success: false, message: "Please set up an Academic Year first." });

    const classes = await Class.find().limit(2);
    if (classes.length === 0) return res.status(400).json({ success: false, message: "Please create at least one class first." });

    const names = ["Peter", "Grace", "Samuel", "Sarah", "David", "Mary"];
    const surnames = ["Mugisha", "Nalubega", "Okello", "Auma", "Katushabe"];

    const students = [];
    for (let i = 0; i < 10; i++) {
      const fn = names[Math.floor(Math.random() * names.length)];
      const ln = surnames[Math.floor(Math.random() * surnames.length)];
      students.push({
        firstName: fn,
        lastName: ln,
        admissionNumber: `DEMO/2026/${String(i+100).padStart(4, '0')}`,
        gender: i % 2 === 0 ? "Male" : "Female",
        dateOfBirth: new Date("2017-01-01"),
        studentClass: classes[Math.floor(Math.random() * classes.length)]._id,
        parentName: `Parent of ${fn}`,
        parentPhone: "+256700000000",
        status: "Active"
      });
    }

    await Student.insertMany(students);
    res.json({ success: true, message: "10 sample students generated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.resetData = async (req, res) => {
  try {
    // Dangerous operation: Only clears students and transactions for safety
    await Student.deleteMany({ admissionNumber: /DEMO/ });
    await FeePayment.deleteMany({});
    await Attendance.deleteMany({});
    res.json({ success: true, message: "Demo students and records cleared." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
