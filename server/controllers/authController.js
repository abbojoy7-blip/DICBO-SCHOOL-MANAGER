const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );
  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role
    }
  });
};
