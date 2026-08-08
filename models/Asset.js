const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagNumber: { type: String }, // Unique asset tag
  category: { type: String }, // e.g. "Furniture", "Electronics"
  purchaseDate: { type: Date },
  value: { type: Number },
  status: { type: String, enum: ["Operational", "Damaged", "Under Maintenance", "Disposed"], default: "Operational" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

assetSchema.index({ tagNumber: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Asset", assetSchema);
