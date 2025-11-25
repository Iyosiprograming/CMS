import mongoose from "mongoose";

export const connectDB = async (MONGOURI: string) => {
    try {
        mongoose.connect(MONGOURI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("database error while connecting");
        process.exit(1);
    }
}