"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bagModel = new mongoose_1.Schema({
    bag: {
        type: Number,
    },
    cash: {
        type: Number,
    },
    userID: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("bags", bagModel);
