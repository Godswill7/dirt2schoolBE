"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../Controller/profileController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("avatar");
const profileRouter = (0, express_1.Router)();
profileRouter.route("/:studentID/create-profile").post(upload, profileController_1.createProfile);
profileRouter.route("/view-all-profile").get(profileController_1.viewProfile);
profileRouter.route("/:profileID/view-one-profile").get(profileController_1.viewOneProfile);
profileRouter.route("/:profileID/delete-one-profile").delete(profileController_1.deleteOneProfile);
profileRouter.route("/:studentID/view-student-profile").get(profileController_1.veiwStudentProfile);
profileRouter.route("/:profileID/update-profile").patch(profileController_1.updateProfile);
exports.default = profileRouter;
