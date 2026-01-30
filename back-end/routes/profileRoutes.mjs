import express from "express";
import { getMyProfile, updateMyProfile } from "../controllers/profileController.mjs";
import authMiddleware from "../middleware/auth.mjs";

const router = express.Router();

router.get("/profile", authMiddleware, getMyProfile);
router.put("profile", authMiddleware, updateMyProfile);

export default router;
