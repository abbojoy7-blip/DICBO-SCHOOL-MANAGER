const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../../models/User");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const checkUsers = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB...");

    const emails = ["admin@dicbo.com", "teacher@dicbo.com", "finance@dicbo.com"];
    for (const email of emails) {
      const user = await User.findOne({ email });
      if (user) {
        console.log(`✅ User found: ${email} (Role: ${user.role})`);
      } else {
        console.log(`❌ User NOT found: ${email}`);
      }
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error checking users:", error);
    process.exit(1);
  }
};

checkUsers();
