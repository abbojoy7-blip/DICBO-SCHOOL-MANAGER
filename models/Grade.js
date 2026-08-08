const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  score: { type: Number, min: 0, max: 100, required: true },
  remarks: { type: String },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true },
  gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

gradeSchema.index({ student: 1, exam: 1, subject: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Grade", gradeSchema);
