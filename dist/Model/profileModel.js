"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileModel = new mongoose_1.Schema({
    address: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
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
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("profiles", profileModel);
