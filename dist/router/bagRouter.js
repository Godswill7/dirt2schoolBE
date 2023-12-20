"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bagController_1 = require("../Controller/bagController");
const router = (0, express_1.Router)();
router.route("/:studentID/create-bag").post(bagController_1.createBag);
exports.default = router;
