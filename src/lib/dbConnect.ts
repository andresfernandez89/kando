import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI as string);
    if (connection.readyState === 1) {
      console.log("MongoDB connected OK");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(false);
  }
};
