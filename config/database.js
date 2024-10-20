import mongoose from "mongoose";
dotenv.config({ path: "./config/config.env" });
import dotenv from "dotenv";

 const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "expenseApp",
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(`MongoDB connection error: ${err.message}`);
    });
};

export default connectDB;