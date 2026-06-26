const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.get(
  "/dashboard",
  auth,
  roleCheck("admin"),
  (req, res) => {
    res.json({ message: "Admin dashboard data" });
  }
);

module.exports = router;
