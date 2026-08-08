const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["Academic", "Finance", "System", "Alert"],
    default: "System"
  },
  isRead: { type: Boolean, default: false },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "SchoolSettings" },
  link: { type: String }, // Optional path to navigate to
}, { timestamps: true });

notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ school: 1 });

module.exports = mongoose.model("Notification", notificationSchema);
