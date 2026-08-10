const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const SchoolSettings = require("../../models/SchoolSettings");

dotenv.config({
  path: path.join(__dirname, "../../.env")
});

const createProductionAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not configured.");
    }

    await mongoose.connect(uri);

    console.log("Connected to MongoDB.");

    const email = "admin@dit.edu";
    const password = "password123";

    let user = await User.findOne({ email });

    if (user) {
      console.log(`User ${email} already exists.`);

      user.password = password;
      user.role = "administrator";
      user.status = "active";

      if (!user.school) {
        const school = await SchoolSettings.findOne();

        if (school) {
          user.school = school._id;
          console.log(`Linked administrator to school: ${school.name}`);
        }
      }

      await user.save();

      console.log("Administrator password and account status updated.");
    } else {
      console.log(`User ${email} does not exist. Creating administrator...`);

      const school = await SchoolSettings.findOne();

      if (!school) {
        throw new Error(
          "No SchoolSettings record exists. Cannot safely create administrator."
        );
      }

      user = await User.create({
        name: "DIT System Admin",
        email,
        password,
        role: "administrator",
        status: "active",
        school: school._id
      });

      console.log("Administrator created successfully.");
    }

    console.log("");
    console.log("======================================");
    console.log("PRODUCTION ADMIN READY");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("======================================");

    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error("Production admin recovery failed:");
    console.error(error);

    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
};

createProductionAdmin();
