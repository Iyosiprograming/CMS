import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
export const connectDB = async () => {
    try {
        mongoose.connect(MONGO_URI as string);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("database error while connecting");
        process.exit(1);
    }
}