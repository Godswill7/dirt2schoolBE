"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feeController_1 = require("../Controller/feeController");
const router = (0, express_1.Router)();
router.route("/:schoolID/:studentID/create-fee").post(feeController_1.createFee);
exports.default = router;
