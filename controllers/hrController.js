const Payroll = require("../models/Payroll");
const Leave = require("../models/Leave");

// Payroll
exports.processPayroll = async (req, res) => {
  try {
    const payroll = new Payroll({ ...req.body, school: req.user.schoolId, processedBy: req.user.id });
    await payroll.save();
    res.status(201).json({ success: true, payroll });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPayroll = async (req, res) => {
  try {
    const { year, month } = req.query;
    const filter = { school: req.user.schoolId };
    if (year) filter.year = year;
    if (month) filter.month = month;

    const records = await Payroll.find(filter).populate("staff", "name email role");
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Leave
exports.requestLeave = async (req, res) => {
  try {
    const leave = new Leave({ ...req.body, staff: req.user.id, school: req.user.schoolId });
    await leave.save();
    res.status(201).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLeaveRequests = async (req, res) => {
  try {
    const filter = { school: req.user.schoolId };
    if (req.user.role !== "administrator") {
      filter.staff = req.user.id;
    }
    const requests = await Leave.find(filter).populate("staff", "name role");
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveLeave = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findOneAndUpdate(
      { _id: req.params.id, school: req.user.schoolId },
      { status, approvedBy: req.user.id },
      { new: true }
    );
    res.json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
