const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../../models/User");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const seedSuperAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB for Super Admin seeding...");

    const email = "superadmin@dicbo.com";
    const existing = await User.findOne({ email });

    if (existing) {
      existing.role = "superadmin";
      await existing.save();
      console.log("Super Admin account updated.");
    } else {
      await User.create({
        name: "DICBO Super Admin",
        email,
        password: "super_secure_password_123",
        role: "superadmin"
      });
      console.log("Super Admin account created.");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding super admin:", error);
    process.exit(1);
  }
};

seedSuperAdmin();
