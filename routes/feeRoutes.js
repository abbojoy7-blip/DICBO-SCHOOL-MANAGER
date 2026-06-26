const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { student: "John Doe", amount: 200000, status: "Paid" },
    { student: "Sarah Namukasa", amount: 200000, status: "Unpaid" }
  ]);
});

module.exports = router;
