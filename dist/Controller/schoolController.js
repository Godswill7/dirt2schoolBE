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
exports.deleteSchool = exports.getAllSchools = exports.getSchool = exports.verifySchool = exports.loginSchool = exports.createSchool = void 0;
const schoolModel_1 = __importDefault(require("../Model/schoolModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = require("../utils/email");
const crypto_1 = __importDefault(require("crypto"));
const roles_1 = require("../utils/roles");
const mainError_1 = require("../error/mainError");
const createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolName, email, password, address } = req.body;
        const encrypt = yield bcrypt_1.default.genSalt(10);
        const decipher = yield bcrypt_1.default.hash(password, encrypt);
        const token = crypto_1.default.randomBytes(2).toString("hex");
        const school = yield schoolModel_1.default.create({
            schoolName,
            email,
            password: decipher,
            address,
            token,
            role: roles_1.role.SCHOOL,
        });
        (0, email_1.sendSchoolMail)(school).then(() => {
            console.log("School Mail Sent ...");
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: `${schoolName} school has been created successfully`,
            data: school,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `An Error Occured: ${error.message}`,
        });
    }
});
exports.createSchool = createSchool;
const loginSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findSchool = yield schoolModel_1.default.findOne({ email });
        if (findSchool) {
            if (findSchool.verified === true) {
                const isPassword = yield bcrypt_1.default.compare(findSchool === null || findSchool === void 0 ? void 0 : findSchool.password, password);
                if (isPassword) {
                    return res.status(mainError_1.HTTP.OK).json({
                        message: `Welcome back ${findSchool === null || findSchool === void 0 ? void 0 : findSchool.schoolName}`,
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "Incorrect password",
                    });
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "School is not verified to operate on this platform",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "School does not exist on this platform",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `An Error Occured: ${error.message}`,
        });
    }
});
exports.loginSchool = loginSchool;
const verifySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const findSchool = yield schoolModel_1.default.findById(schoolID);
        if (findSchool) {
            if (!findSchool.verified && findSchool.token !== "") {
                yield schoolModel_1.default.findByIdAndUpdate(schoolID, {
                    verified: true,
                    token: "",
                });
                return res.status(201).json({
                    message: "School has been verifeid",
                });
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "School is already verified",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "School does not exist",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `An Error Occured: ${error.message}`,
        });
    }
});
exports.verifySchool = verifySchool;
const getSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        const school = yield schoolModel_1.default.findById(schoolID);
        return res.status(200).json({
            message: `you have gotten ${school === null || school === void 0 ? void 0 : school.schoolName} successfully`,
            data: school,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `An Error Occured: ${error.message}`,
        });
    }
});
exports.getSchool = getSchool;
const getAllSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSchools = yield schoolModel_1.default.find();
        return res.status(200).json({
            message: "This is all schools",
            data: allSchools,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `An Error Occured: ${error.message}`,
        });
    }
});
exports.getAllSchools = getAllSchools;
const deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schoolID } = req.params;
        yield schoolModel_1.default.findByIdAndDelete(schoolID);
        return res.status(204).json({
            message: "school have been deleted successfully",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `An Error Occured: ${error.message}`,
        });
    }
});
exports.deleteSchool = deleteSchool;
