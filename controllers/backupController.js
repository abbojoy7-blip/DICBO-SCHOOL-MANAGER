const Student = require("../models/Student");
const FeePayment = require("../models/FeePayment");
const User = require("../models/User");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");

exports.exportData = async (req, res) => {
  try {
    const students = await Student.find();
    const fees = await FeePayment.find();
    const users = await User.find().select("-password");
    const classes = await Class.find();
    const attendance = await Attendance.find();

    const backupData = {
      backupDate: new Date(),
      students,
      fees,
      users,
      classes,
      attendance
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename=dicbo_backup_${new Date().toISOString().slice(0, 10)}.json`);
    res.send(JSON.stringify(backupData, null, 2));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
