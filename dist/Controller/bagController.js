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
exports.createBag = void 0;
const bagModel_1 = __importDefault(require("../Model/bagModel"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const mainError_1 = require("../error/mainError");
const createBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID } = req.params;
        const { bag, cash } = req.body;
        const student = yield authModel_1.default.findById(studentID);
        if (student) {
            if (student.verified && student.token === "") {
                const createBag = yield bagModel_1.default.create({
                    bag,
                    cash,
                    studentID,
                });
                return res.status(mainError_1.HTTP.CREATE).json({
                    message: `Your ${bag} has been created successfully`,
                    data: createBag
                });
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "student not verified",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "student does not exist",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: `Error: ${error.message}`,
        });
    }
});
exports.createBag = createBag;
