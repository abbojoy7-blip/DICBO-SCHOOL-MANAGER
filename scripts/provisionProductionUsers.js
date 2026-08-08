const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const SchoolSettings = require('../models/SchoolSettings');

dotenv.config({ path: path.join(__dirname, '../.env') });

const provision = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database.");

    const school = await SchoolSettings.findOne({ name: "DIT INTERNATIONALSCHOOL" });
    if (!school) {
      console.error("BLOCKED: DIT INTERNATIONALSCHOOL not found in database. Run seedProductionDemo first.");
      process.exit(1);
    }

    const usersToCreate = [
      { name: "DIT Admin", email: "dit.admin@dit.edu", role: "administrator", tempPw: "DIT-Admin-2026-X!" },
      { name: "DIT Manager", email: "dit.manager@dit.edu", role: "administrator", tempPw: "DIT-Mgr-2026-Y?" },
      { name: "DIT Teacher", email: "teacher.one@dit.edu", role: "teacher", tempPw: "DIT-Tch-2026-Z#" },
      { name: "DIT Accountant", email: "finance.one@dit.edu", role: "accountant", tempPw: "DIT-Fin-2026-W@" }
    ];

    for (const u of usersToCreate) {
      const existing = await User.findOne({ email: u.email });
      if (existing) {
        console.log(`User ${u.email} already exists. Skipping.`);
        continue;
      }

      await User.create({
        name: u.name,
        email: u.email,
        password: u.tempPw, // Hashed by model pre-save
        role: u.role,
        school: school._id,
        status: "active"
      });
      console.log(`User created: ${u.email} (Role: ${u.role})`);
    }

    await mongoose.disconnect();
    console.log("Provisioning complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error during provisioning:", err);
    process.exit(1);
  }
};

provision();
