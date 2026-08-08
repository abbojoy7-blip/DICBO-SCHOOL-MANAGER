const mongoose = require("mongoose");

const disciplineRecordSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  incidentDate: { type: Date, default: Date.now },
  incidentType: { type: String, required: true }, // e.g. "Late Coming", "Noise Making"
  description: { type: String },
  actionTaken: { type: String },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

disciplineRecordSchema.index({ student: 1, incidentDate: -1 });

module.exports = mongoose.model("DisciplineRecord", disciplineRecordSchema);
