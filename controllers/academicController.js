const AcademicYear = require("../models/AcademicYear");
const Class = require("../models/Class");
const Subject = require("../models/Subject");

// Academic Year (Global for now, or could be per school)
exports.createYear = async (req, res) => {
  try {
    const year = new AcademicYear(req.body);
    await year.save();
    res.status(201).json({ success: true, year });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getYears = async (req, res) => {
  try {
    const years = await AcademicYear.find().sort({ year: -1 });
    res.json({ success: true, years });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Classes
exports.createClass = async (req, res) => {
  try {
    const studentClass = new Class({ ...req.body, school: req.user.schoolId });
    await studentClass.save();
    res.status(201).json({ success: true, studentClass });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find({ school: req.user.schoolId }).populate("teacher", "name email");
    res.json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Subjects
exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject({ ...req.body, school: req.user.schoolId });
    await subject.save();
    res.status(201).json({ success: true, subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ school: req.user.schoolId }).sort({ name: 1 });
    res.json({ success: true, subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
