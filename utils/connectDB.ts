import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, { dbName: "shopscom" });

    isConnected = true;
  } catch (error) {
    console.log("[ERROR WHILE CONNECTING DATABASE]", error);
  }
}
