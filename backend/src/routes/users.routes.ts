import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authenticate.js";

const router = Router();

router.get("/:id", getUserProfile);

router.put("/:id", verifyToken, updateUserProfile);

export default router;
