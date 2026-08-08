const mongoose = require("mongoose");

const academicYearSchema = new mongoose.Schema({
  year: { type: String, required: true, unique: true }, // e.g. "2026"
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ["Active", "Past", "Future"], default: "Future" }
}, { timestamps: true });

module.exports = mongoose.model("AcademicYear", academicYearSchema);
