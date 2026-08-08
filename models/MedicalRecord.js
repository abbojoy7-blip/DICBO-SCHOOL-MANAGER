const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  visitDate: { type: Date, default: Date.now },
  symptoms: { type: String, required: true },
  diagnosis: { type: String },
  treatment: { type: String },
  prescribedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // e.g. School Nurse
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

medicalRecordSchema.index({ student: 1, visitDate: -1 });

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
