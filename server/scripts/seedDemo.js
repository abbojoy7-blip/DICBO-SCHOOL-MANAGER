const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../../models/User");
const Class = require("../../models/Class");
const Student = require("../../models/Student");
const AcademicYear = require("../../models/AcademicYear");
const SchoolSettings = require("../../models/SchoolSettings");
const FeeStructure = require("../../models/FeeStructure");
const FeePayment = require("../../models/FeePayment");
const Attendance = require("../../models/Attendance");
const Counter = require("../../models/Counter");

const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const seedDemo = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB for demo seeding...");

    // 1. Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Class.deleteMany({}),
      Student.deleteMany({}),
      AcademicYear.deleteMany({}),
      SchoolSettings.deleteMany({}),
      FeeStructure.deleteMany({}),
      FeePayment.deleteMany({}),
      Attendance.deleteMany({}),
      Counter.deleteMany({})
    ]);

    // 2. Create Users (Staff)
    const admin = await User.create({
      name: "Admin User",
      email: "admin@dicbo.com",
      password: "password123",
      role: "administrator"
    });

    const teacher = await User.create({
      name: "John Teacher",
      email: "teacher@dicbo.com",
      password: "password123",
      role: "teacher"
    });

    const accountant = await User.create({
      name: "Sarah Accountant",
      email: "finance@dicbo.com",
      password: "password123",
      role: "accountant"
    });

    // 3. Create Academic Year
    const year2026 = await AcademicYear.create({
      year: "2026",
      status: "Active"
    });

    // 4. Create School Settings
    await SchoolSettings.create({
      name: "DICBO Demo Academy",
      shortName: "DICBO",
      address: "123 Education St, Kampala",
      phone: "+256 700 000 000",
      email: "info@dicbo.edu",
      currency: "UGX",
      currentAcademicYear: year2026._id,
      currentTerm: "Term 1"
    });

    // 5. Create Classes
    const classP1 = await Class.create({
      name: "Primary One",
      level: "Primary",
      teacher: teacher._id
    });

    const classP2 = await Class.create({
      name: "Primary Two",
      level: "Primary"
    });

    // 6. Create Fee Structure for P1
    await FeeStructure.create({
      studentClass: classP1._id,
      academicYear: "2026",
      term: "Term 1",
      fees: [
        { type: "Tuition", amount: 500000 },
        { type: "Boarding", amount: 300000 }
      ],
      totalAmount: 800000
    });

    // 7. Create Students
    const student1 = await Student.create({
      firstName: "Brian",
      lastName: "Okello",
      admissionNumber: "DICBO/2026/0001",
      gender: "Male",
      dateOfBirth: new Date("2018-05-15"),
      studentClass: classP1._id,
      parentName: "Moses Okello",
      parentPhone: "+256 750 111 222",
      status: "Active"
    });

    const student2 = await Student.create({
      firstName: "Jane",
      lastName: "Nalubega",
      admissionNumber: "DICBO/2026/0002",
      gender: "Female",
      dateOfBirth: new Date("2018-08-20"),
      studentClass: classP1._id,
      parentName: "Mary Nalubega",
      parentPhone: "+256 750 333 444",
      status: "Active"
    });

    // 8. Create Sample Payments
    await FeePayment.create({
      student: student1._id,
      amountPaid: 400000,
      receiptNumber: "RCPT/2026/0001",
      academicYear: "2026",
      term: "Term 1",
      method: "Bank Transfer",
      recordedBy: accountant._id
    });

    // 9. Create Attendance Records
    await Attendance.create({
      student: student1._id,
      studentClass: classP1._id,
      date: new Date().setHours(0,0,0,0),
      status: "Present",
      markedBy: teacher._id,
      term: "Term 1",
      academicYear: "2026"
    });

    await Attendance.create({
      student: student2._id,
      studentClass: classP1._id,
      date: new Date().setHours(0,0,0,0),
      status: "Absent",
      markedBy: teacher._id,
      term: "Term 1",
      academicYear: "2026"
    });

    console.log("Demo data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding demo data:", error);
    process.exit(1);
  }
};

seedDemo();
