// Database configuration will go here
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED: ", error);
        throw new ApiError(500, "Failed to connect to database");
        process.exit(1);
    }
};

export default connectDB;
