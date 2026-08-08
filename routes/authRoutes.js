const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

// Only administrators can register new accounts via this endpoint
router.post(
  "/register",
  auth,
  roleCheck("administrator"),
  [
    body("email").isEmail().withMessage("Provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
    body("name").notEmpty().withMessage("Name is required")
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Provide a valid email"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  login
);

module.exports = router;
