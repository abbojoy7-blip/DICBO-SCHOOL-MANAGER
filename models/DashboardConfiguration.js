const mongoose = require("mongoose");

const dashboardConfigurationSchema = new mongoose.Schema({
  // Presentation overrides/targets
  targetEnrollment: { type: Number, default: 0 },
  targetRevenue: { type: Number, default: 0 },
  targetAttendance: { type: Number, default: 95 },

  // Custom summary values (if admin wants to manually override for demo)
  manualTeacherCount: { type: Number },
  manualStaffCount: { type: Number },

  useManualStats: { type: Boolean, default: false },

  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("DashboardConfiguration", dashboardConfigurationSchema);
