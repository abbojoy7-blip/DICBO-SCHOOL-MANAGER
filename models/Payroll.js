const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: Number, min: 1, max: 12, required: true },
  year: { type: Number, required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  status: { type: String, enum: ["Draft", "Pending", "Paid"], default: "Draft" },
  paymentDate: { type: Date },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

payrollSchema.index({ staff: 1, month: 1, year: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Payroll", payrollSchema);
