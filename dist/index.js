"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = __importDefault(require("./mainApp"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./Config/db"));
dotenv_1.default.config();
const realPort = parseInt(process.env.PORT);
const port = realPort;
const app = (0, express_1.default)();
(0, mainApp_1.default)(app);
const server = app.listen(process.env.PORT || port, () => {
    console.log();
    (0, db_1.default)();
});
process.on("uncaughtException", (error) => {
    console.log("server is shutting down due to uncaught exception");
    console.log(error);
});
process.on("unhandledRejection", (reason) => {
    console.log("server is shutting down due to unhandled rejection");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
