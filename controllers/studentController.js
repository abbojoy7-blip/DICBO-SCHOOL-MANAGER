const Student = require("../models/Student");
const Counter = require("../models/Counter");
const User = require("../models/User");
const logAction = require("../middleware/auditLogger");

// Helper to generate admission number: DICBO/2026/0001
const generateAdmissionNumber = async (schoolId) => {
  const year = new Date().getFullYear();
  const counter = await Counter.findOneAndUpdate(
    { id: `admissionNumber_${schoolId || 'global'}` },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const sequence = String(counter.seq).padStart(4, "0");
  return `DICBO/${year}/${sequence}`;
};

exports.createStudent = async (req, res) => {
  try {
    const data = { ...req.body, school: req.user.schoolId };

    if (!data.admissionNumber) {
      data.admissionNumber = await generateAdmissionNumber(req.user.schoolId);
    }

    const student = new Student(data);
    await student.save();

    await logAction(
      req.user.id,
      "REGISTER_STUDENT",
      `Registered student ${student.firstName} ${student.lastName} with Admission ${student.admissionNumber}`,
      student._id,
      "Student",
      req.user.schoolId
    );

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const { search, studentClass, status, stream, page = 1, limit = 50 } = req.query;
    const filter = { school: req.user.schoolId };

    if (search) {
      filter.$or = [
        { firstName: new RegExp(search, "i") },
        { lastName: new RegExp(search, "i") },
        { admissionNumber: new RegExp(search, "i") },
      ];
    }

    if (studentClass) filter.studentClass = studentClass;
    if (status) filter.status = status;
    if (stream) filter.stream = stream;

    // RBAC: Parents only see their children
    if (req.user.role === "parent") {
      const user = await User.findById(req.user.id);
      filter._id = { $in: user.children };
    }

    const students = await Student.find(filter)
      .populate("studentClass", "name level")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Student.countDocuments(filter);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, school: req.user.schoolId })
      .populate("studentClass")
      .populate("parentAccount", "name email");

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    if (req.user.role === "parent") {
      const user = await User.findById(req.user.id);
      if (!user.children.includes(student._id)) {
        return res.status(403).json({ success: false, message: "Access denied: This is not your child." });
      }
    }

    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, school: req.user.schoolId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    await logAction(
      req.user.id,
      "UPDATE_STUDENT",
      `Updated profile for student ${student.firstName} ${student.lastName}`,
      student._id,
      "Student",
      req.user.schoolId
    );

    res.json({
      success: true,
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, school: req.user.schoolId },
      { status: "Archived" },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    await logAction(
      req.user.id,
      "ARCHIVE_STUDENT",
      `Archived record for student ${student.firstName} ${student.lastName}`,
      student._id,
      "Student",
      req.user.schoolId
    );

    res.json({
      success: true,
      message: "Student record archived successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
