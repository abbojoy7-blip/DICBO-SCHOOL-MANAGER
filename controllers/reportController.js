const FeePayment = require("../models/FeePayment");
const Student = require("../models/Student");
const Class = require("../models/Class");
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const DashboardConfiguration = require("../models/DashboardConfiguration");

exports.getDashboardStats = async (req, res) => {
  try {
    const config = await DashboardConfiguration.findOne();

    // 1. Real Stats
    const totalStudents = await Student.countDocuments();
    const maleStudents = await Student.countDocuments({ gender: "Male" });
    const femaleStudents = await Student.countDocuments({ gender: "Female" });
    const totalClasses = await Class.countDocuments();
    const payments = await FeePayment.find();

    const totalCollected = payments.reduce((sum, p) => sum + p.amountPaid, 0);
    const paidFeesCount = payments.length;

    // Attendance
    const today = new Date().setHours(0,0,0,0);
    const attendanceToday = await Attendance.find({ date: today });
    let attendancePct = 0;
    if (attendanceToday.length > 0) {
      const present = attendanceToday.filter(r => r.status === "Present").length;
      attendancePct = Math.round((present / attendanceToday.length) * 100);
    }

    // Staff
    const teachers = await User.countDocuments({ role: "teacher" });
    const totalStaff = await User.countDocuments({ role: { $ne: "parent" } });

    // 2. Build Response (with manual overrides for presentation if enabled)
    const stats = {
      totalStudents: config?.useManualStats ? (config.manualStaffCount || totalStudents) : totalStudents,
      maleStudents,
      femaleStudents,
      totalClasses,
      totalCollected,
      attendanceToday: attendancePct,
      teacherCount: config?.useManualStats ? (config.manualTeacherCount || teachers) : teachers,
      staffCount: totalStaff,
      targetEnrollment: config?.targetEnrollment || 0,
      targetRevenue: config?.targetRevenue || 0
    };

    const recentPayments = await FeePayment.find()
      .sort({ paymentDate: -1 })
      .limit(5)
      .populate("student");

    res.json({
      success: true,
      stats,
      recentPayments: recentPayments.map(p => ({
        id: p._id,
        student: p.student ? `${p.student.firstName} ${p.student.lastName}` : "Unknown",
        amount: p.amountPaid,
        status: "Paid",
        date: p.paymentDate.toISOString().slice(0, 10),
        receipt: p.receiptNumber
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.dailyCollections = async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const payments = await FeePayment.find({ paymentDate: { $gte: start, $lte: end } }).populate("student");
    const total = payments.reduce((sum, item) => sum + item.amountPaid, 0);

    res.json({ success: true, date: start.toISOString().slice(0, 10), total, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFinancialReport = async (req, res) => {
  try {
    const { startDate, endDate, academicYear, term } = req.query;
    const filter = {};
    if (academicYear) filter.academicYear = academicYear;
    if (term) filter.term = term;
    if (startDate && endDate) {
      filter.paymentDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const payments = await FeePayment.find(filter)
      .populate("student", "firstName lastName admissionNumber")
      .sort({ paymentDate: -1 });

    const totalCollected = payments.reduce((sum, p) => sum + p.amountPaid, 0);

    const breakdownByType = {};
    payments.forEach(p => {
      breakdownByType[p.feeType] = (breakdownByType[p.feeType] || 0) + p.amountPaid;
    });

    res.json({
      success: true,
      summary: {
        totalCollected,
        count: payments.length,
        breakdownByType
      },
      payments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentReport = async (req, res) => {
  try {
    const { studentClass, status, gender } = req.query;
    const filter = {};
    if (studentClass) filter.studentClass = studentClass;
    if (status) filter.status = status;
    if (gender) filter.gender = gender;

    const students = await Student.find(filter).populate("studentClass", "name");

    const stats = {
      total: students.length,
      gender: {
        Male: students.filter(s => s.gender === "Male").length,
        Female: students.filter(s => s.gender === "Female").length
      },
      status: {}
    };

    students.forEach(s => {
      stats.status[s.status] = (stats.status[s.status] || 0) + 1;
    });

    res.json({
      success: true,
      stats,
      students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.json({ success: true, balances });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
