const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../../models/User");
const Class = require("../../models/Class");
const Student = require("../../models/Student");
const AcademicYear = require("../../models/AcademicYear");
const SchoolSettings = require("../../models/SchoolSettings");
const FeeStructure = require("../../models/FeeStructure");
const FeePayment = require("../../models/FeePayment");
const Attendance = require("../../models/Attendance");
const Budget = require("../../models/Budget");
const BudgetCategory = require("../../models/BudgetCategory");
const DashboardConfiguration = require("../../models/DashboardConfiguration");
const Counter = require("../../models/Counter");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "Richard", "Barbara", "Joseph", "Susan", "Thomas", "Jessica", "Charles", "Sarah", "Christopher", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle", "Kenneth", "Dorothy", "Kevin", "Carol", "Brian", "Amanda", "George", "Melissa", "Edward", "Deborah", "Ronald", "Stephanie", "Timothy", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Ryan", "Cynthia", "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Shirley", "Eric", "Angela", "Jonathan", "Helen", "Stephen", "Anna", "Larry", "Brenda", "Justin", "Pamela", "Scott", "Nicole", "Brandon", "Emma", "Benjamin", "Samantha", "Samuel", "Katherine", "Gregory", "Christine", "Alexander", "Debra", "Frank", "Rachel", "Patrick", "Catherine", "Raymond", "Carolyn", "Jack", "Janet", "Dennis", "Ruth", "Jerry", "Maria", "Tyler", "Heather", "Aaron", "Diane", "Jose", "Virginia", "Adam", "Julie", "Nathan", "Joyce", "Henry", "Victoria", "Douglas", "Olivia", "Zachary", "Kelly", "Peter", "Christina", "Kyle", "Lauren", "Walter", "Joan", "Ethan", "Evelyn", "Jeremy", "Judith", "Harold", "Megan", "Keith", "Cheryl", "Christian", "Andrea", "Roger", "Hannah", "Noah", "Martha", "Gerald", "Jacqueline", "Carl", "Frances", "Terry", "Gloria", "Sean", "Ann", "Austin", "Teresa", "Arthur", "Kathryn", "Lawrence", "Sara", "Christian", "Janice", "Jesse", "Jean", "Dylan", "Alice", "Bryan", "Madison", "Joe", "Doris", "Jordan", "Abigail", "Billy", "Julia", "Bruce", "Judy", "Albert", "Grace", "Willie", "Denise", "Gabriel", "Amber", "Logan", "Marilyn", "Alan", "Beverly", "Juan", "Danielle", "Wayne", "Theresa", "Roy", "Sophia", "Ralph", "Marie", "Randy", "Diana", "Eugene", "Brittany", "Vincent", "Natalie", "Russell", "Isabella", "Louis", "Charlotte", "Philip", "Rose", "Bobby", "Alexis", "Johnny", "Kayla"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Bazira", "Mugisha", "Okello", "Auma", "Nalubega", "Ssekandi", "Namukasa", "Katushabe", "Otieno", "Othieno", "Byaruhanga", "Kiwuwa", "Nsubuga", "Mukasa", "Lutaaya", "Zavuga", "Kabale", "Ssewanyana", "Semanda", "Wasswa", "Kato", "Babirye", "Nakato", "Nantongo", "Nakafeero", "Nabirye", "Namubiru", "Kaggwa", "Bwanika", "Luyima", "Mukiibi", "Sendi", "Matovu", "Mayanja", "Kimbowa", "Mwebaze", "Ruhakana", "Tumusiime", "Taremwa", "Asiimwe", "Kyomukama", "Ahimbisibwe"];

const seedProductionDemo = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB for DIT InternationalSchool seeding...");

    // 1. Clear existing data
    console.log("Cleaning database...");
    await Promise.all([
      User.deleteMany({}),
      Class.deleteMany({}),
      Student.deleteMany({}),
      AcademicYear.deleteMany({}),
      SchoolSettings.deleteMany({}),
      FeeStructure.deleteMany({}),
      FeePayment.deleteMany({}),
      Attendance.deleteMany({}),
      Budget.deleteMany({}),
      BudgetCategory.deleteMany({}),
      DashboardConfiguration.deleteMany({}),
      Counter.deleteMany({})
    ]);

    // 2. Create School (DIT INTERNATIONALSCHOOL)
    const school = await SchoolSettings.create({
      name: "DIT INTERNATIONALSCHOOL",
      shortName: "DIT IS",
      motto: "Trust • Excellence • Discipline",
      vision: "To be a global leader in transformative international education.",
      mission: "Nurturing innovative minds through holistic, high-standard learning.",
      address: "Plot 88, Academic Avenue",
      district: "Kampala",
      phone: "+256 700 888 999",
      email: "erp@dit-international.edu",
      website: "www.dit-international.edu",
      principalName: "Dr. Othieno Constant",
      currency: "UGX",
      primaryColor: "#0B1F3A",
      secondaryColor: "#163D6B",
      academicGold: "#C9A227"
    });

    // 3. Create Academic Year
    const year2026 = await AcademicYear.create({
      year: "2026",
      status: "Active"
    });

    school.currentAcademicYear = year2026._id;
    await school.save();

    // 4. Create Staff
    console.log("Creating staff members...");
    const adminUser = await User.create({
      name: "DIT System Admin",
      email: "admin@dit.edu",
      password: "password123",
      role: "administrator",
      school: school._id
    });

    const staff = [];
    const roles = ["administrator", "teacher", "accountant", "receptionist", "librarian", "transport"];
    for(let i=0; i<62; i++){
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const role = i < 40 ? "teacher" : roles[Math.floor(Math.random() * roles.length)];
      staff.push({
        name: `${fn} ${ln}`,
        email: `staff${i+1}@dit.edu`,
        password: "password123",
        role,
        school: school._id
      });
    }
    const createdStaff = await User.insertMany(staff);
    const teachers = createdStaff.filter(s => s.role === "teacher");

    // 5. Create Classes
    const levels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6", "Year 7", "Year 8", "Year 9", "Year 10"];
    const streams = ["Alpha", "Beta", "Gamma"];
    const schoolClasses = [];
    for(const level of levels){
      for(const stream of streams){
        schoolClasses.push({
          name: `${level} ${stream}`,
          level: "Primary",
          teacher: teachers[Math.floor(Math.random() * teachers.length)]._id,
          school: school._id
        });
      }
    }
    const createdClasses = await Class.insertMany(schoolClasses);

    // 6. Create Fee Structure
    for(const c of createdClasses){
      await FeeStructure.create({
        studentClass: c._id,
        academicYear: "2026",
        term: "Term 1",
        fees: [{ type: "Tuition", amount: 1500000 }],
        totalAmount: 1500000,
        school: school._id
      });
    }

    // 7. Create 850 Students
    console.log("Generating 850 students...");
    const students = [];
    for(let i=0; i<850; i++){
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      students.push({
        firstName: fn,
        lastName: ln,
        admissionNumber: `DIT/${2026}/${String(i+1).padStart(4, '0')}`,
        gender: i % 2 === 0 ? "Male" : "Female",
        dateOfBirth: new Date(2015 + Math.floor(Math.random() * 5), 0, 1),
        studentClass: createdClasses[Math.floor(Math.random() * createdClasses.length)]._id,
        parentName: `${lastNames[Math.floor(Math.random() * lastNames.length)]} Parent`,
        parentPhone: "+256 700 000 000",
        status: "Active",
        school: school._id
      });
    }
    const createdStudents = await Student.insertMany(students);

    // 8. Dashboard Config
    await DashboardConfiguration.create({
      targetEnrollment: 1000,
      targetRevenue: 1000000000,
      targetAttendance: 98,
      useManualStats: false,
      updatedBy: adminUser._id
    });

    console.log("DIT INTERNATIONALSCHOOL seeded successfully! 🚀");
    console.log("Login: admin@dit.edu / password123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding DIT demo:", error);
    process.exit(1);
  }
};

seedProductionDemo();
