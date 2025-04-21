import mongoose from "mongoose";
import { systemRole } from "../../src/utils/system-role.utils.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
      required: true,
    },

    age: {
      type: Number,
      min: 10,
      max1: 60,
      required: true,
    },
    role:{
      type: String,
      default:"user",
      enum:Object.values(systemRole)
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
