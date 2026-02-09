// import { validate } from '../middlewares/authMiddleware.mjs';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/authValidator.mjs';
import express from "express";
import { register,login,logout,updateProfile,getCurrentUser } from "../controllers/authController.mjs";
import { authLimiter } from "../middlewares/rateLimiter.mjs"
import { validate } from '../validators/validate.mjs'; 
import { authMiddleware, roleMiddleware  } from '../middlewares/authMiddleware.mjs';





const router = express.Router();

router.post("/register",authLimiter, validate(registerSchema), register);
router.post("/login",authLimiter, validate(loginSchema), login);
router.put("/profile",authMiddleware,roleMiddleware('director'), validate(updateProfileSchema), updateProfile);
router.get("/me",authMiddleware,roleMiddleware('admin'), getCurrentUser)
router.post("/logout", logout);

export default router;
