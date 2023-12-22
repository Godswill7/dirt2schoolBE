"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstStudentVerify = exports.deleteUser = exports.getAllUser = exports.inputOtp = exports.changePassword = exports.resetPassword = exports.verifyUser = exports.signInStudent = exports.signInUser = exports.registerStudent = exports.registerUser = void 0;
const authModel_1 = __importDefault(require("../Model/authModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const roles_1 = require("../utils/roles");
const email_1 = require("../utils/email");
const dotenv_1 = __importDefault(require("dotenv"));
const mainError_1 = require("../error/mainError");
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const token = crypto_1.default.randomBytes(2).toString("hex");
        const user = yield authModel_1.default.create({
            email,
            password: hash,
            token,
            role: roles_1.role.USER,
        });
        (0, email_1.sendAccountMail)(user).then(() => {
            console.log("sent verify email");
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error registering user",
            data: error.message,
        });
    }
});
exports.registerUser = registerUser;
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const secretKey = crypto_1.default.randomBytes(2).toString("hex");
        const student = yield authModel_1.default.create({
            email,
            password: hash,
            secretKey,
            role: roles_1.role.STUDENT,
        });
        (0, email_1.sendFirstAccountMail)(student).then(() => {
            console.log("sent student otp");
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "created successfully",
            data: student,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error registering user",
            data: error.message,
        });
    }
});
exports.registerStudent = registerStudent;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user.password);
            if (check) {
                if (user.verified && user.token === "") {
                    return res.status(mainError_1.HTTP.CREATE).json({
                        message: `${user.email} signed in successfully`,
                        data: user,
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "user not verified",
                    });
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "invalid password",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "user not found",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error signing in",
            data: error.message,
        });
    }
});
exports.signInUser = signInUser;
const signInStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const student = yield authModel_1.default.findOne({ email });
        if (student) {
            const check = yield bcrypt_1.default.compare(password, student.password);
            if (check) {
                if (student.verified && student.token === "") {
                    return res.status(mainError_1.HTTP.CREATE).json({
                        message: `${student.email} signed in successfully`,
                        data: student,
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "student not verified ",
                    });
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "invalid password",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "student not found",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error signing in",
            data: error.message,
        });
    }
});
exports.signInStudent = signInStudent;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findByIdAndUpdate(userID, { verified: true, token: "" }, { new: true });
        return res.status(mainError_1.HTTP.UPDATE).json({
            message: "user verified successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.verifyUser = verifyUser;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if ((user === null || user === void 0 ? void 0 : user.verified) && user.token === "") {
            const token = crypto_1.default.randomBytes(2).toString("hex");
            const reset = yield authModel_1.default.findByIdAndUpdate(user._id, { token }, { new: true });
            (0, email_1.resetAccountPassword)(user).then(() => {
                console.log("sent reset password email notification");
            });
            return res.status(mainError_1.HTTP.UPDATE).json({
                message: "you can reset your password go to your mail",
                data: reset,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { password } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if ((user === null || user === void 0 ? void 0 : user.verified) && user.token !== "") {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const change = yield authModel_1.default.findByIdAndUpdate(userID, { password: hash, token: "" }, { new: true });
            return res.status(mainError_1.HTTP.UPDATE).json({
                message: "changed password successfully",
                data: change,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "user not verified",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error changing password",
            data: error.message,
        });
    }
});
exports.changePassword = changePassword;
const inputOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { token } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if (user === null || user === void 0 ? void 0 : user.verified) {
            if (token === user.token) {
                const update = yield authModel_1.default.findByIdAndUpdate(user._id, {
                    token: "",
                }, { new: true });
                (0, email_1.InputOtp)(user).then(() => {
                    console.log("OTP mail sent ...");
                });
                return res.status(mainError_1.HTTP.UPDATE).json({
                    message: "You can now proceed to change Password",
                    data: update,
                });
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "Incorrect Token",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "User is Not Verified",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error with Your Token",
        });
    }
});
exports.inputOtp = inputOtp;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: `viewing all users ${user.length}`,
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.getAllUser = getAllUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error deleting user",
            data: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const firstStudentVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const { secretKey } = req.body;
        const user = yield authModel_1.default.findById(studentID);
        if ((user === null || user === void 0 ? void 0 : user.secretKey) === secretKey) {
            (0, email_1.sendAccountMail)(user).then(() => {
                console.log("sent verification email");
            });
            return res.status(mainError_1.HTTP.OK).json({
                message: "Verification email",
                data: user,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "error",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.firstStudentVerify = firstStudentVerify;
