const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings" },
  createdAt: { type: Date, default: Date.now },
});

// Class names should be unique within a school
classSchema.index({ name: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema);
