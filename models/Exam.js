const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Beginning of Term One"
  type: { type: String, enum: ["Quiz", "Mid-Term", "Final", "Other"], required: true },
  academicYear: { type: String, required: true },
  term: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ["Draft", "Active", "Completed", "Published"], default: "Draft" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

examSchema.index({ academicYear: 1, term: 1, school: 1 });

module.exports = mongoose.model("Exam", examSchema);
