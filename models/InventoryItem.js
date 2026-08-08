const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. "Stationery", "Cleaning"
  quantity: { type: Number, default: 0 },
  unit: { type: String }, // e.g. "Boxes", "Pieces"
  reorderLevel: { type: Number, default: 5 },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

inventoryItemSchema.index({ name: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);
