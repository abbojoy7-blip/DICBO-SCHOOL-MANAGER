const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    totalStudents: 3,
    paidFees: 2,
    pendingFees: 1
  });
});

module.exports = router;
