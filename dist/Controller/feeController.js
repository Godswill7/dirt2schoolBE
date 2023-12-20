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
exports.createFee = void 0;
const feeModel_1 = __importDefault(require("../Model/feeModel"));
const schoolModel_1 = __importDefault(require("../Model/schoolModel"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const mainError_1 = require("../error/mainError");
const createFee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID, schoolID } = req.params;
        const { ammountPaid } = req.body;
        const getSchool = yield schoolModel_1.default.findById(schoolID);
        const getStudent = yield authModel_1.default.findById(studentID);
        if ((getSchool === null || getSchool === void 0 ? void 0 : getSchool.verified) && (getSchool === null || getSchool === void 0 ? void 0 : getSchool.token) === "") {
            if ((getStudent === null || getStudent === void 0 ? void 0 : getStudent.verified) && (getStudent === null || getStudent === void 0 ? void 0 : getStudent.token) === "") {
                const createFee = yield feeModel_1.default.create({
                    ammountPaid,
                    studentID: getStudent._id,
                    schoolID: getSchool._id,
                    schoolName: getSchool.schoolName,
                });
                return res.status(mainError_1.HTTP.CREATE).json({
                    message: `Fees paid to ${getSchool.schoolName} successfully`,
                    data: createFee,
                });
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "Student is not verified to receive payment",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "School is not verified to receive Payments",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `Error ${error.message}`,
        });
    }
});
exports.createFee = createFee;
