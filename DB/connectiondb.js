import mongoose from "mongoose";
// db.js

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connection_db = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.CONNECTION_DB_URI, {
      dbName: "NoteApp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    }).then(mongoose => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connected");
    return cached.conn;
  } catch (error) {
    console.log("Connection failed", error);
    throw error;
  }
};
