import mongoose from "mongoose";

const { MONGODB_URL } = process.env;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URL as string);
    if (connection.readyState === 1) {
      console.log("DB connection successful!");
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(false);
  }
};
