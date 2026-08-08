const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true }, // e.g., "CREATE_STUDENT", "RECORD_PAYMENT"
  details: { type: String }, // Human readable description
  ipAddress: { type: String },
  resourceId: { type: String }, // ID of the affected student/payment/etc
  resourceType: { type: String }, // "Student", "FeePayment", etc
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings" },
}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);
