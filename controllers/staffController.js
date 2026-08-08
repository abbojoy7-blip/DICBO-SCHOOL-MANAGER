const User = require("../models/User");
const logAction = require("../middleware/auditLogger");

exports.getStaff = async (req, res) => {
  try {
    const filter = { school: req.user.schoolId, role: { $ne: "parent" } };
    const staff = await User.find(filter).select("-password");
    res.json({ success: true, staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const user = new User({
      name,
      email,
      password,
      role,
      school: req.user.schoolId
    });
    await user.save();

    await logAction(
      req.user.id,
      "CREATE_STAFF",
      `Created staff account for ${name} with role ${role}`,
      user._id,
      "User",
      req.user.schoolId
    );

    res.status(201).json({ success: true, user: { id: user._id, name, email, role } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, school: req.user.schoolId },
      { name, email, role, status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    await logAction(
      req.user.id,
      "UPDATE_STAFF",
      `Updated staff account for ${user.name}`,
      user._id,
      "User",
      req.user.schoolId
    );

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
