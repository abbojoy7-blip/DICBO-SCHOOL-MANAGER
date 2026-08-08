const SchoolSettings = require("../models/SchoolSettings");
const DashboardConfiguration = require("../models/DashboardConfiguration");
const logAction = require("../middleware/auditLogger");

exports.getSettings = async (req, res) => {
  try {
    let settings = await SchoolSettings.findOne().populate("currentAcademicYear");
    if (!settings) {
      settings = new SchoolSettings({ name: "DICBO School Manager" });
      await settings.save();
    }

    let dashboardConfig = await DashboardConfiguration.findOne();
    if (!dashboardConfig) {
      dashboardConfig = new DashboardConfiguration();
      await dashboardConfig.save();
    }

    res.json({ success: true, settings, dashboardConfig });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const data = { ...req.body, updatedBy: req.user.id };
    const settings = await SchoolSettings.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true
    });

    await logAction(
      req.user.id,
      "UPDATE_SCHOOL_PROFILE",
      `Updated school settings for ${settings.name}`,
      settings._id,
      "SchoolSettings",
      settings._id
    );

    res.json({ success: true, message: "Settings updated successfully", settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDashboardConfig = async (req, res) => {
  try {
    const data = { ...req.body, updatedBy: req.user.id };
    const config = await DashboardConfiguration.findOneAndUpdate({}, data, {
      new: true,
      upsert: true
    });
    res.json({ success: true, message: "Dashboard configuration updated", config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
