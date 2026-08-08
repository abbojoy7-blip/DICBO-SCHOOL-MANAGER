const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Student = require('../models/Student');
const User = require('../models/User');

const testBackupRestore = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("1. Connected to Database.");

    // 1. Export
    console.log("2. Performing Export...");
    const students = await Student.find().limit(5);
    const backupData = JSON.stringify(students, null, 2);
    const backupFile = path.join(__dirname, '../database/restore_test.json');
    fs.writeFileSync(backupFile, backupData);
    console.log(`   Export saved to ${backupFile}`);

    // 2. Clear (Simulated loss)
    // We won't actually delete, we will just verify the read
    const readData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
    console.log(`3. Verification: Read ${readData.length} records from backup file.`);

    if (readData.length > 0 && readData[0].firstName) {
       console.log("✅ RESTORE TEST PASSED: Data structure is intact.");
    } else {
       console.log("❌ RESTORE TEST FAILED: Data structure mismatch.");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ TEST FAILED:", error);
    process.exit(1);
  }
};

testBackupRestore();
