const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  purpose: { type: String },
  whomToSee: { type: String },
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Visitor", visitorSchema);
