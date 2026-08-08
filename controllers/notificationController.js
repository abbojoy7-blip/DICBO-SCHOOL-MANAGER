const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true, message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Utility function (not an endpoint) for other controllers to use
exports.createNotification = async (recipientId, title, message, type, schoolId, link = null) => {
  try {
    const notif = new Notification({
      recipient: recipientId,
      title,
      message,
      type,
      school: schoolId,
      link
    });
    await notif.save();
  } catch (err) {
    console.error("Notification Error:", err);
  }
};
