import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const Mongo_URL = process.env.MONGO_URI;

function connectDB() {
  mongoose
    .connect(Mongo_URL)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

export default connectDB;