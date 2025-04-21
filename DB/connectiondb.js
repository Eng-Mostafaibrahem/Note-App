import mongoose from "mongoose";

export const connection_db =async()=>{
    try {
        await mongoose.connect(process.env.CONNECCTION_DB_URI)
        console.log("Database connected");
    } catch (error) {
        console.log("connection failed",error);
    }
}