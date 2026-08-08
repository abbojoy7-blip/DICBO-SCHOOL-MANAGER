const User = require("../models/User");
const SchoolSettings = require("../models/SchoolSettings");
const DashboardConfiguration = require("../models/DashboardConfiguration");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, schoolId: user.school },
    process.env.JWT_SECRET || "fallback_secret",
    { expiresIn: "1d" }
  );
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, role, schoolName } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    let schoolId = null;

    if (schoolName) {
      const newSchool = new SchoolSettings({ name: schoolName });
      await newSchool.save();

      const newConfig = new DashboardConfiguration();
      await newConfig.save();

      schoolId = newSchool._id;
    } else if (req.user && req.user.schoolId) {
      schoolId = req.user.schoolId;
    }

    const user = new User({
      name,
      email,
      password,
      role: role || "administrator",
      school: schoolId
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User created",
      token,
      user: { id: user._id, name, email, role: user.role, schoolId }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.status === "inactive") {
      return res.status(403).json({ message: "Account is deactivated. Contact administrator." });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, role: user.role, schoolId: user.school }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
