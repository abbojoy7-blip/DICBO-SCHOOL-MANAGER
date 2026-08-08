const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  studentClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Excused"],
    required: true,
    default: "Present"
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings" },
  remarks: { type: String },
  term: { type: String },
  academicYear: { type: String }
}, { timestamps: true });

attendanceSchema.index({ student: 1, date: 1 }, { unique: true });
attendanceSchema.index({ school: 1, date: 1 });

module.exports = mongoose.model("Attendance", attendanceSchema);
