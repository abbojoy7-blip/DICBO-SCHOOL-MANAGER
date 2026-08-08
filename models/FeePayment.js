const mongoose = require("mongoose");

const feePaymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  method: {
    type: String,
    enum: ["Cash", "Bank Transfer", "Mobile Money", "Cheque", "Other"],
    default: "Cash"
  },
  receiptNumber: { type: String, required: true },
  academicYear: { type: String, required: true },
  term: { type: String, required: true },
  feeType: {
    type: String,
    enum: ["Tuition", "Boarding", "Transport", "Uniform", "Books", "Other"],
    default: "Tuition"
  },
  reference: { type: String },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings" },
  note: { type: String },
}, { timestamps: true });

feePaymentSchema.index({ student: 1 });
feePaymentSchema.index({ school: 1 });
feePaymentSchema.index({ receiptNumber: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("FeePayment", feePaymentSchema);
