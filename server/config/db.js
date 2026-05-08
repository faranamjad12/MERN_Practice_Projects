import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const hostName = await mongoose.connect(process.env.MONGO_LIVE);
    if (hostName) {
      console.log("Database is connected: ", hostName.connection.host);
    }
  } catch (error) {
    console.log("ERR: ", error);
  }
};
