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
exports.InputOtp = exports.sendSchoolMail = exports.sendFirstAccountMail = exports.resetAccountPassword = exports.sendAccountMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GOOGLE_ID = process.env.G_ID;
const GOOGLE_SECRET = process.env.G_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.G_REFRESH_TOKEN;
const GOOGLE_URL = process.env.G_URL;
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });
const sendAccountMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            userToken: user.token,
        }, process.env.SECRET);
        const readData = path_1.default.join(__dirname, "../views/verifyAccount.ejs");
        const data = yield ejs_1.default.renderFile(readData, {
            // name: user.userName,
            email: user.email,
            token: user.token,
            url: `http://localhost:5173/api/${token}/verify-user`,
        });
        const mailer = {
            from: " <eumeh3882@gmail.com> ",
            to: user.email,
            subject: "Dirt2school",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.sendAccountMail = sendAccountMail;
const resetAccountPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET);
        const readData = path_1.default.join(__dirname, "../views/resetPassword.ejs");
        const data = yield ejs_1.default.renderFile(readData, {
            //  name: user.userName,
            token: user.token,
            email: user.email,
            url: `http://localhost:3783/api/${token}/reset-password`,
        });
        const mailer = {
            from: " <eumeh3882@gmail.com > ",
            to: user.email,
            subject: `Welcome ${user.email} you can now reset your password`,
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetAccountPassword = resetAccountPassword;
const sendFirstAccountMail = (student) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: student._id,
            userToken: student.token,
        }, process.env.SECRET);
        const readData = path_1.default.join(__dirname, "../views/studentOTP.ejs");
        const data = yield ejs_1.default.renderFile(readData, {
            // name: user.userName,
            email: student.email,
            token: student.token,
            code: student === null || student === void 0 ? void 0 : student.secretKey,
            url: `http://localhost:3783/api/${token}/student-secret-key`,
        });
        const mailer = {
            from: " <eumeh3882@gmail.com> ",
            to: student.email,
            subject: "Dirt2school",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendFirstAccountMail = sendFirstAccountMail;
const sendSchoolMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET);
        const readData = path_1.default.join(__dirname, "../views/verifySchool.ejs");
        const data = yield ejs_1.default.renderFile(readData, {
            // name: user.userName,
            email: user === null || user === void 0 ? void 0 : user.email,
            token: user === null || user === void 0 ? void 0 : user.token,
            code: user === null || user === void 0 ? void 0 : user.secretKey,
            url: `http://localhost:3783/api/${token}/verify-user`,
        });
        const mailer = {
            from: " <eumeh3882@gmail.com> ",
            to: user.email,
            subject: " dirt2school",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendSchoolMail = sendSchoolMail;
const InputOtp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, userToken: user.token }, process.env.SECRET);
        const readData = path_1.default.join(__dirname, "../views/inputOtp.ejs");
        const data = yield ejs_1.default.renderFile(readData, {
            name: (_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.fullName,
            token: user.token,
            email: user.email,
            url: `http://localhost:3783/api/${user._id}/input-otp`,
        });
        const mailer = {
            from: " <eumeh3882@gmail.com > ",
            to: user.email,
            subject: `Welcome ${user.email} you will be directed to input your otp`,
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.InputOtp = InputOtp;
