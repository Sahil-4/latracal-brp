import { Router } from "express";
import { getReviews, postReview } from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/authenticate.js";

const router = Router();

router.get("/:id", getReviews);

router.post("/:id", verifyToken, postReview);

export default router;
