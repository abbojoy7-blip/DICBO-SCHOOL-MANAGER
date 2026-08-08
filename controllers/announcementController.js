const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement({ ...req.body, school: req.user.schoolId, publishedBy: req.user.id });
    await announcement.save();
    res.status(201).json({ success: true, announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ school: req.user.schoolId }).sort({ createdAt: -1 });
    res.json({ success: true, announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
