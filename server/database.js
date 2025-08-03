
const mongoose = require("mongoose");

module.exports = async function databaseConnection() {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore";
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
