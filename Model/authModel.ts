import mongoose, { Schema, model } from "mongoose";
import { iAuthData } from "../utils/interface";

const authModel = new Schema<iAuthData>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    profile: [
      {
        type: mongoose.Types.ObjectId,
        ref: "profiles",
      },
    ],
    secretKey:{
      type: String,
    }
  },
  { timestamps: true }
);

export default model<iAuthData>("users", authModel);
