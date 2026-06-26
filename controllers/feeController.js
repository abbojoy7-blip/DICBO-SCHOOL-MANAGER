const FeePayment = require("../models/FeePayment");
const Student = require("../models/Student");

exports.recordPayment = async (req, res) => {
  try {
    const payment = new FeePayment({ ...req.body, recordedBy: req.body.recordedBy });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await FeePayment.find().populate("student recordedBy");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentBalance = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const payments = await FeePayment.find({ student: student._id });
    const totalPaid = payments.reduce((sum, item) => sum + item.amountPaid, 0);
    res.json({ student, totalPaid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
