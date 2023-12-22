"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const feeModel = new mongoose_1.Schema({
    ammountPaid: {
        type: Number,
    },
    userID: {
        type: String,
    },
    schoolID: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("fees", feeModel);
