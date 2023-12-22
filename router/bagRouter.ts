import { Router } from "express";
import { createBag, deleteBag, viewBagDetails } from "../Controller/bagController";

const router = Router();

router.route("/:userID/create-bag").post(createBag);
router.route("/:bagID/view-bag-details").get(viewBagDetails);
router.route("/:bagID/delete-bag").post(deleteBag);

export default router;
