import { Schema,model } from 'mongoose';
import {  iBagData } from '../utils/interface';

const bagModel = new Schema<iBagData>(
  {
    bag: {
      type: Number,
    },
    cash: {
      type: Number,
    },
    userID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iBagData>("bags",bagModel)