"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputOTP = exports.changeValidator = exports.resetPassword = exports.signInStudentValidator = exports.signInUserValidator = exports.createStudentValidator = exports.createUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserValidator = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim().required(),
    password: joi_1.default.string().required(),
    confirm: joi_1.default.ref("password"),
});
exports.createStudentValidator = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim().required(),
    password: joi_1.default.string().required(),
    confirm: joi_1.default.ref("password"),
});
exports.signInUserValidator = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim().required(),
    password: joi_1.default.string().required(),
});
exports.signInStudentValidator = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim().required(),
    password: joi_1.default.string().required(),
});
exports.resetPassword = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim().required(),
});
exports.changeValidator = joi_1.default.object({
    password: joi_1.default.string().required(),
});
exports.inputOTP = joi_1.default.object({
    token: joi_1.default.string().required(),
});
