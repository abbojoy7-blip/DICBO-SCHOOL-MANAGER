const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], required: true },
  startTime: { type: String, required: true }, // e.g., "08:00 AM"
  endTime: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

timetableSchema.index({ studentClass: 1, day: 1, startTime: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Timetable", timetableSchema);
