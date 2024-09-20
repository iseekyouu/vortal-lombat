import mongoose from "mongoose";

// Replace with your actual MongoDB URI
const MONGO_URI = "mongodb://localhost:27018/vortal-lombat";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
