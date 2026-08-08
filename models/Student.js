const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  dateOfBirth: { type: Date, required: true },
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  stream: { type: String }, // e.g., "A", "B", "North", "South"

  // Parent/Guardian Details
  parentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  parentEmail: { type: String },
  address: { type: String },

  // Background info
  previousSchool: { type: String },
  medicalInformation: { type: String },

  // Files
  photoUrl: { type: String, default: "" },

  // Administrative
  registrationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Active", "Graduated", "Suspended", "Transferred", "Archived"],
    default: "Active"
  },

  // Link to a Parent User account if applicable
  parentAccount: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Multi-school isolation
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings" },

  createdAt: { type: Date, default: Date.now },
});

// Indexes for performance
studentSchema.index({ firstName: 1, lastName: 1 });
studentSchema.index({ admissionNumber: 1 });
studentSchema.index({ studentClass: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ school: 1 });

// Helper for generating Full Name
studentSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("Student", studentSchema);
