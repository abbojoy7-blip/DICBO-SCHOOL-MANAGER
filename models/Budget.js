const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  year: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetCategory", required: true },
  description: { type: String },
  plannedAmount: { type: Number, required: true, default: 0 },
  actualSpending: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Planned", "Active", "Closed"],
    default: "Planned"
  },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

budgetSchema.virtual("remainingBalance").get(function() {
  return this.plannedAmount - this.actualSpending;
});

budgetSchema.index({ school: 1, year: 1 });

module.exports = mongoose.model("Budget", budgetSchema);
