const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema({
  studentClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  academicYear: { type: String, required: true },
  term: { type: String, required: true },
  fees: [{
    type: { type: String, required: true }, // e.g., "Tuition"
    amount: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  discounts: [{
    name: { type: String },
    percentage: { type: Number },
    amount: { type: Number }
  }],
  latePenalty: { type: Number, default: 0 },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

feeStructureSchema.index({ studentClass: 1, academicYear: 1, term: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("FeeStructure", feeStructureSchema);
