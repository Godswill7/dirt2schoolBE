"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const bagRouter_1 = __importDefault(require("./router/bagRouter"));
const feeRouter_1 = __importDefault(require("./router/feeRouter"));
const profileRouter_1 = __importDefault(require("./router/profileRouter"));
const schoolRouter_1 = __importDefault(require("./router/schoolRouter"));
const mainError_1 = require("./error/mainError");
const errorHandler_1 = require("./error/errorHandler");
const mainApp = (app) => {
    app.use((0, express_1.json)());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.set("view engine", "ejs");
    app.use("/api", authRouter_1.default);
    app.use("/api", bagRouter_1.default);
    app.use("/api", feeRouter_1.default);
    app.use("/api", profileRouter_1.default);
    app.use("/api", schoolRouter_1.default);
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });
    app.get("/", (req, res) => {
        try {
            return res.status(mainError_1.HTTP.OK).json({
                message: "Welcome to Dirt2School API, Enjoy 💥💫☑",
            });
        }
        catch (error) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "error",
                data: error.message,
            });
        }
    });
    app.use("*", (req, res, next) => {
        next(new mainError_1.mainError({
            name: "Route Error",
            message: `Incorrect url ${req.originalUrl} does not exist`,
            status: mainError_1.HTTP.BAD,
            success: false,
        }));
    });
    app.use(errorHandler_1.errorHandler);
};
exports.default = mainApp;
