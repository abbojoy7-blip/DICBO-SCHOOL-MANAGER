const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  department: { type: String },
  level: { type: String, enum: ["Primary", "Secondary", "Both", "Nursery"] },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

subjectSchema.index({ name: 1, school: 1 }, { unique: true });
subjectSchema.index({ code: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Subject", subjectSchema);
