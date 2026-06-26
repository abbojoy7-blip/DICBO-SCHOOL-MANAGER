const FeePayment = require("../models/FeePayment");
const Student = require("../models/Student");

exports.dailyCollections = async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const payments = await FeePayment.find({ paymentDate: { $gte: start, $lte: end } }).populate("student");
    const total = payments.reduce((sum, item) => sum + item.amountPaid, 0);

    res.json({ date: start.toISOString().slice(0, 10), total, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.studentBalances = async (req, res) => {
  try {
    const students = await Student.find();
    const balances = await Promise.all(
      students.map(async (student) => {
        const payments = await FeePayment.find({ student: student._id });
        const totalPaid = payments.reduce((sum, item) => sum + item.amountPaid, 0);
        return { student, totalPaid };
      })
    );
    res.json(balances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
