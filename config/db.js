const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!uri) {
      console.log("⚠️ No Mongo URI found — running in DEMO MODE (no DB)");
      return;
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("⚠️ MongoDB failed, continuing in DEMO MODE");
    console.log("Reason:", error.message);
  }
};

module.exports = connectDB;
