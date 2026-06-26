const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  dateOfBirth: { type: Date },
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  parentName: { type: String },
  parentContact: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
