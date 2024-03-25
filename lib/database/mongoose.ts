import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGO_DB_URL;

type MongooseConn = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const db = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("MongoDB URL doesnt exist");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "Cluster0",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
