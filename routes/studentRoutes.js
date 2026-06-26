const express = require("express");
const router = express.Router();

// DEMO DATA ONLY (NO DB)
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "John Doe", class: "P5", feeStatus: "Paid" },
    { id: 2, name: "Sarah Namukasa", class: "P6", feeStatus: "Pending" },
    { id: 3, name: "Brian Okello", class: "P7", feeStatus: "Paid" }
  ]);
});

module.exports = router;
