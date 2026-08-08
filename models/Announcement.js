const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  targetAudience: {
    type: String,
    enum: ["All", "Staff", "Parents", "Students"],
    default: "All"
  },
  publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings", required: true }
}, { timestamps: true });

announcementSchema.index({ school: 1, createdAt: -1 });

module.exports = mongoose.model("Announcement", announcementSchema);
