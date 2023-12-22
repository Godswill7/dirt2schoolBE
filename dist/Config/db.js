"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.APPLICATION_URL;
const Database = () => {
    try {
        (0, mongoose_1.connect)(URL).then(() => {
            console.log("DB connected 🚀🚀🚀 ...");
        });
    }
    catch (error) {
        console.log("Error", error.message);
    }
};
exports.default = Database;
