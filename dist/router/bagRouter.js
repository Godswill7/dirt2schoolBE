"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bagController_1 = require("../Controller/bagController");
const router = (0, express_1.Router)();
router.route("/:userID/create-bag").post(bagController_1.createBag);
router.route("/:bagID/view-bag-details").get(bagController_1.viewBagDetails);
router.route("/:bagID/delete-bag").post(bagController_1.deleteBag);
exports.default = router;
