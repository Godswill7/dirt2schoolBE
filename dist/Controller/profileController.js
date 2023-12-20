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
exports.deleteOneProfile = exports.updateProfile = exports.veiwStudentProfile = exports.viewOneProfile = exports.viewProfile = exports.createProfile = void 0;
const authModel_1 = __importDefault(require("../Model/authModel"));
const profileModel_1 = __importDefault(require("../Model/profileModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const streamUpload_1 = require("../utils/streamUpload");
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const { motivation, fullName, schoolName, address, phoneNumber, gender } = req.body;
        const student = yield authModel_1.default.findById(studentID);
        const { secure_url, public_id } = yield (0, streamUpload_1.streamUpload)(req);
        if (student) {
            const profiled = yield profileModel_1.default.create({
                motivation,
                fullName,
                schoolName,
                address,
                phoneNumber,
                gender,
                avatar: secure_url,
                avatarID: public_id,
            });
            student.profile.push(new mongoose_1.default.
                Types.ObjectId(profiled === null || profiled === void 0 ? void 0 : profiled._id));
            yield student.save();
            return res.status(201).json({
                message: "student profile created",
                data: profiled,
            });
        }
        else {
            return res.status(404).json({
                message: "student not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating profile",
            data: error.message,
        });
    }
});
exports.createProfile = createProfile;
const viewProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiled = yield profileModel_1.default.find();
        return res.status(200).json({
            message: "can see all profiles",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.viewProfile = viewProfile;
const viewOneProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        const profiled = yield profileModel_1.default.findById(profileID);
        return res.status(200).json({
            message: "can see one profile",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.viewOneProfile = viewOneProfile;
const veiwStudentProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const student = yield authModel_1.default.findById(studentID).populate({
            path: "profile",
        });
        return res.status(200).json({
            message: "can see a student profile",
            data: student,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.veiwStudentProfile = veiwStudentProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        const { schoolName, phoneNumber, address } = req.body;
        const profiled = yield profileModel_1.default.findByIdAndUpdate(profileID, { schoolName, phoneNumber, address }, { new: true });
        return res.status(201).json({
            message: "Profile updated",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.updateProfile = updateProfile;
const deleteOneProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        const profiled = yield profileModel_1.default.findByIdAndDelete(profileID);
        return res.status(200).json({
            message: "can see one profile",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.deleteOneProfile = deleteOneProfile;
