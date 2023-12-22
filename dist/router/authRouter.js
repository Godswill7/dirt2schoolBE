"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controller/authController");
const validatorHandler_1 = __importDefault(require("../utils/validatorHandler"));
const validator_1 = require("../utils/validator");
const router = (0, express_1.Router)();
router
    .route("/register-user")
    .post((0, validatorHandler_1.default)(validator_1.createUserValidator), authController_1.registerUser);
router
    .route("/register-student")
    .post((0, validatorHandler_1.default)(validator_1.createStudentValidator), authController_1.registerStudent);
router
    .route("/sign-in-student")
    .post((0, validatorHandler_1.default)(validator_1.signInStudentValidator), authController_1.signInStudent);
router
    .route("/sign-in-user")
    .post((0, validatorHandler_1.default)(validator_1.signInUserValidator), authController_1.signInUser);
router
    .route("/reset-password")
    .patch((0, validatorHandler_1.default)(validator_1.resetPassword), authController_1.forgotPassword);
router
    .route("/:userID/change-password")
    .patch((0, validatorHandler_1.default)(validator_1.changeValidator), authController_1.changePassword);
router
    .route("/:userID/input-otp")
    .patch((0, validatorHandler_1.default)(validator_1.inputOTP), authController_1.inputOtp);
router.route("/get-all-user").get(authController_1.getAllUser);
router.route("/:userID/delete-user").delete(authController_1.deleteUser);
router.route("/:userID/verify-user").patch(authController_1.verifyUser);
router.route("/:token/student-secret-key").patch(authController_1.firstStudentVerify);
exports.default = router;
