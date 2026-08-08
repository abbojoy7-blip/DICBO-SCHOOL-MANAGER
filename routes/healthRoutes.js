const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/health", async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    status: "UP",
    timestamp: Date.now(),
    checks: {
      database: "DOWN",
    }
  };

  try {
    if (mongoose.connection.readyState === 1) {
      healthCheck.checks.database = "UP";
    }

    res.json(healthCheck);
  } catch (error) {
    healthCheck.status = "DOWN";
    res.status(503).json(healthCheck);
  }
});

module.exports = router;
