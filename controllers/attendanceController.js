const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

exports.markAttendance = async (req, res) => {
  try {
    const { attendanceRecords, date, studentClass, term, academicYear } = req.body;

    if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
      return res.status(400).json({ success: false, message: "Invalid attendance data" });
    }

    const savedRecords = await Promise.all(
      attendanceRecords.map(async (record) => {
        // Use upsert to update if already exists for that day
        return await Attendance.findOneAndUpdate(
          {
            student: record.studentId,
            date: new Date(date).setHours(0,0,0,0),
            school: req.user.schoolId
          },
          {
            student: record.studentId,
            studentClass,
            date: new Date(date).setHours(0,0,0,0),
            status: record.status,
            remarks: record.remarks,
            markedBy: req.user.id,
            term,
            academicYear,
            school: req.user.schoolId
          },
          { upsert: true, new: true }
        );
      })
    );

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      count: savedRecords.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const records = await Attendance.find({ student: id, school: req.user.schoolId }).sort({ date: -1 });

    const presentCount = records.filter(r => r.status === "Present").length;
    const percentage = records.length > 0 ? (presentCount / records.length) * 100 : 0;

    res.json({
      success: true,
      stats: {
        totalDays: records.length,
        present: presentCount,
        percentage: percentage.toFixed(2)
      },
      records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassAttendanceReport = async (req, res) => {
  try {
    const { studentClass, date } = req.query;
    const queryDate = date ? new Date(date).setHours(0,0,0,0) : new Date().setHours(0,0,0,0);

    const records = await Attendance.find({
      studentClass,
      date: queryDate,
      school: req.user.schoolId
    }).populate("student", "firstName lastName admissionNumber");

    res.json({
      success: true,
      date: new Date(queryDate).toISOString().slice(0, 10),
      records
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
