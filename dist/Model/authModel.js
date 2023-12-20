"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authModel = new mongoose_1.Schema({
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
    verified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    profile: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "profiles",
        },
    ],
    bagHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "bags",
        },
    ],
    feeHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "fees"
        },
    ],
    secretKey: {
        type: String,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", authModel);
