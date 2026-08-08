const Exam = require("../models/Exam");
const Grade = require("../models/Grade");
const Student = require("../models/Student");
const Subject = require("../models/Subject");

// Exams
exports.createExam = async (req, res) => {
  try {
    const exam = new Exam({ ...req.body, school: req.user.schoolId, createdBy: req.user.id });
    await exam.save();
    res.status(201).json({ success: true, exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ school: req.user.schoolId }).sort({ createdAt: -1 });
    res.json({ success: true, exams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Grades
exports.recordGrades = async (req, res) => {
  try {
    const { grades } = req.body; // Array of { student, exam, subject, score, remarks }
    if (!Array.isArray(grades)) return res.status(400).json({ message: "Invalid grades data" });

    const savedGrades = await Promise.all(grades.map(async g => {
      return await Grade.findOneAndUpdate(
        { student: g.student, exam: g.exam, subject: g.subject, school: req.user.schoolId },
        { ...g, school: req.user.schoolId, gradedBy: req.user.id },
        { upsert: true, new: true }
      );
    }));

    res.json({ success: true, count: savedGrades.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await Grade.find({ student: studentId, school: req.user.schoolId })
      .populate("exam")
      .populate("subject");
    res.json({ success: true, grades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
