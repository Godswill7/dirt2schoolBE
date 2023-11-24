import { Schema, model, Types } from "mongoose";
import { iProfileData } from "../utils/interface";

const profileModel = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    balance: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    schoolName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    motivation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iProfileData>("profiles", profileModel);
