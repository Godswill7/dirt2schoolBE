import { Schema, model } from "mongoose";
import { iFeeData } from "../utils/interface";

const feeModel = new Schema<iFeeData>(
  {
    ammountPaid: {
      type: Number,
    },
    userID: {
      type: String,
    },
    schoolID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<iFeeData>("fees", feeModel);
