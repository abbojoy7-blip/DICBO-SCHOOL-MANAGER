const FeePayment = require("../models/FeePayment");
const FeeStructure = require("../models/FeeStructure");
const Student = require("../models/Student");
const Counter = require("../models/Counter");
const logAction = require("../middleware/auditLogger");

// Helper to generate receipt number: RCPT/2026/0001
const generateReceiptNumber = async (schoolId) => {
  const year = new Date().getFullYear();
  const counter = await Counter.findOneAndUpdate(
    { id: `receiptNumber_${schoolId || 'global'}` },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const sequence = String(counter.seq).padStart(4, "0");
  return `RCPT/${year}/${sequence}`;
};

exports.recordPayment = async (req, res) => {
  try {
    const data = { ...req.body, school: req.user.schoolId };

    if (!data.receiptNumber) {
      data.receiptNumber = await generateReceiptNumber(req.user.schoolId);
    }

    data.recordedBy = req.user.id;

    const payment = new FeePayment(data);
    await payment.save();

    const student = await Student.findById(data.student);
    await logAction(
      req.user.id,
      "RECORD_PAYMENT",
      `Recorded payment of ${data.amountPaid} for student ${student ? student.firstName : data.student} (Receipt: ${payment.receiptNumber})`,
      payment._id,
      "FeePayment",
      req.user.schoolId
    );

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentBalance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { academicYear, term } = req.query;

    const student = await Student.findOne({ _id: studentId, school: req.user.schoolId }).populate("studentClass");
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Find applicable fee structure
    const structure = await FeeStructure.findOne({
      studentClass: student.studentClass._id,
      academicYear,
      term
    });

    if (!structure) {
      return res.status(404).json({
        success: false,
        message: "No fee structure found for this class/term"
      });
    }

    // Find all payments for this student for this year/term
    const payments = await FeePayment.find({
      student: studentId,
      academicYear,
      term,
      school: req.user.schoolId
    });

    const totalPaid = payments.reduce((sum, p) => sum + p.amountPaid, 0);
    const balance = structure.totalAmount - totalPaid;

    res.json({
      success: true,
      student: {
        id: student._id,
        name: `${student.firstName} ${student.lastName}`,
        class: student.studentClass.name
      },
      feeSummary: {
        totalFees: structure.totalAmount,
        totalPaid,
        balance,
        status: balance <= 0 ? "Paid" : (totalPaid > 0 ? "Partial" : "Unpaid")
      },
      payments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const { academicYear, term } = req.query;
    const filter = { school: req.user.schoolId };
    if (academicYear) filter.academicYear = academicYear;
    if (term) filter.term = term;

    const payments = await FeePayment.find(filter)
      .populate("student", "firstName lastName admissionNumber")
      .populate("recordedBy", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: payments.length, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFeeStructures = async (req, res) => {
  try {
    const structures = await FeeStructure.find({ school: req.user.schoolId }).populate("studentClass");
    res.json({ success: true, structures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
