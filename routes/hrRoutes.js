const express = require("express");
const router = express.Router();
const { processPayroll, getPayroll, requestLeave, getLeaveRequests, approveLeave } = require("../controllers/hrController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

// Payroll
router.get("/payroll", roleCheck("administrator", "accountant"), getPayroll);
router.post("/payroll", roleCheck("administrator", "accountant"), processPayroll);

// Leave
router.get("/leave", getLeaveRequests);
router.post("/leave", requestLeave);
router.put("/leave/:id/approve", roleCheck("administrator"), approveLeave);

module.exports = router;
