import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/authController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.put("/profile", authMiddleware, updateProfile);

export default router;
