const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../../models/User");

// Load from root .env
dotenv.config({ path: "../../.env" });

const seedAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
      console.error("No MongoDB URI found in .env");
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB for seeding...");

    const adminEmail = "admin@dicbo.com";
    const existing = await User.findOne({ email: adminEmail });

    if (existing) {
      console.log("Admin account already exists.");
    } else {
      const admin = new User({
        name: "System Admin",
        email: adminEmail,
        password: "admin_secure_password_123", // Will be hashed by pre-save middleware
        role: "administrator",
      });

      await admin.save();
      console.log("Initial admin account created successfully:");
      console.log("Email: admin@dicbo.com");
      console.log("Password: admin_secure_password_123");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
