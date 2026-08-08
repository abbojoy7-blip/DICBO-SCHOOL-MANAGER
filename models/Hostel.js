const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Boys", "Girls", "Mixed"], required: true },
  capacity: { type: Number, required: true },
  warden: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

hostelSchema.index({ name: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Hostel", hostelSchema);
