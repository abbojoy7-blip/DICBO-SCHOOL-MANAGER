const mongoose = require("mongoose");

const hostelAssignmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  hostel: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
  roomNumber: { type: String },
  bedNumber: { type: String },
  academicYear: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

hostelAssignmentSchema.index({ student: 1, academicYear: 1 }, { unique: true });

module.exports = mongoose.model("HostelAssignment", hostelAssignmentSchema);
