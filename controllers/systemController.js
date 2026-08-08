const SchoolSettings = require("../models/SchoolSettings");
const User = require("../models/User");
const Student = require("../models/Student");
const AuditLog = require("../models/AuditLog");

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await SchoolSettings.find().sort({ createdAt: -1 });
    res.json({ success: true, schools });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSystemStats = async (req, res) => {
  try {
    const [
      totalSchools,
      totalUsers,
      totalStudents,
      activeSubs,
      expiredSubs,
      recentActivity
    ] = await Promise.all([
      SchoolSettings.countDocuments(),
      User.countDocuments(),
      Student.countDocuments(),
      SchoolSettings.countDocuments({ subscriptionStatus: "Active" }),
      SchoolSettings.countDocuments({ subscriptionStatus: "Expired" }),
      AuditLog.find().sort({ createdAt: -1 }).limit(15).populate("user", "name role")
    ]);

    res.json({
      success: true,
      stats: {
        totalSchools,
        totalUsers,
        totalStudents,
        activeSubscriptions: activeSubs,
        expiredSubscriptions: expiredSubs
      },
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSystemHealth = async (req, res) => {
  try {
    const [schoolsCount, usersCount] = await Promise.all([
      SchoolSettings.countDocuments(),
      User.countDocuments()
    ]);

    res.json({
      success: true,
      health: {
        api: "Healthy",
        database: "Connected",
        storage: "Available",
        serverTime: new Date(),
        version: "1.0.0",
        release: "Production",
        registeredSchools: schoolsCount,
        activeUsers: usersCount,
        lastBackup: "Automated (Daily)"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleSchoolStatus = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { status } = req.body;

    const school = await SchoolSettings.findByIdAndUpdate(schoolId, {
      subscriptionStatus: status
    }, { new: true });

    await AuditLog.create({
      user: req.user.id,
      action: "SCHOOL_STATUS_CHANGE",
      details: `Changed status of school ${school.name} to ${status}`,
      resourceId: schoolId,
      resourceType: "SchoolSettings"
    });

    res.json({ success: true, message: `School status updated to ${status}`, school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSchoolSubscription = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { plan, status, expiryDate, maxStudents } = req.body;

    const school = await SchoolSettings.findByIdAndUpdate(schoolId, {
      subscriptionPlan: plan,
      subscriptionStatus: status,
      expiryDate,
      maxStudents
    }, { new: true });

    await AuditLog.create({
      user: req.user.id,
      action: "SUBSCRIPTION_UPDATE",
      details: `Updated subscription for ${school.name} to ${plan}`,
      resourceId: schoolId,
      resourceType: "SchoolSettings"
    });

    res.json({ success: true, message: "Subscription updated", school });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGlobalAuditLogs = async (req, res) => {
  try {
    const { schoolId } = req.query;
    const filter = schoolId ? { school: schoolId } : {};

    const logs = await AuditLog.find(filter)
      .populate("user", "name email")
      .populate("school", "name")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
