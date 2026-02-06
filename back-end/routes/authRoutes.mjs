// import { validate } from '../middlewares/authMiddleware.mjs';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/authValidator.mjs';
import express from "express";
import { register,login,logout,updateProfile,getCurrentUser } from "../controllers/authController.mjs";
import { authLimiter } from "../middlewares/rateLimiter.mjs"
import { validate } from '../middlewares/validate.mjs'; 
import { authMiddleware, roleMiddleware  } from '../middlewares/authMiddleware.mjs';





const router = express.Router();

router.post("/register", validate(registerSchema), register, authLimiter);
router.post("/login", validate(loginSchema), login, authLimiter);
router.put("/profile",authMiddleware,roleMiddleware, validate(updateProfileSchema), updateProfile);
router.get("/me",authMiddleware,roleMiddleware, getCurrentUser)
router.post("/logout", logout);

export default router;
