import mongoose from "mongoose";

export const connection_db = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) => {
      console.log(`database connected : ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database error : ${err}`);
      process.exit(1);
    });
};
