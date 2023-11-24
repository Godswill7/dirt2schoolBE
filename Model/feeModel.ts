import { Schema, Types } from "mongoose";


const feeModel = new Schema({
    ammountPaid: {
        type:Number
    },
    userID: {
        type: Types.ObjectId,
        ref:"auths"
    }
})