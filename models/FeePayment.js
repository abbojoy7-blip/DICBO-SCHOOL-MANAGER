const mongoose = require("mongoose");

const feePaymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  method: { type: String, enum: ["cash", "mobile money", "card", "other"], default: "cash" },
  reference: { type: String },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  note: { type: String },
});

module.exports = mongoose.model("FeePayment", feePaymentSchema);
