import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("MongoDB database is successfully connected");
  } catch (error) {
    console.log("MongoDB connection failed:  ", error.message);
    process.exit(1);
  }
};
