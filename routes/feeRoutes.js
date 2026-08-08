const express = require("express");
const router = express.Router();
const { recordPayment, getPayments, getStudentBalance, getFeeStructures } = require("../controllers/feeController");

router.get("/", getPayments);
router.get("/structures", getFeeStructures);
router.post("/", recordPayment);
router.get("/balance/:studentId", getStudentBalance);

module.exports = router;
