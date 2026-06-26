const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "User created", user: { id: user._id, name, email, role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
