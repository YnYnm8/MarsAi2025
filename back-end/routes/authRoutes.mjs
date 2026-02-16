import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  getCurrentUser,
  getNotifications,
  markReadAll,
  getMyFilms,
} from "../controllers/authController.mjs";

import { authLimiter } from "../middlewares/rateLimiter.mjs";
import { validate } from "../validators/validate.mjs";
import { registerSchema, loginSchema } from "../validators/authValidator.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { uploadFields } from "../middlewares/multerConfig.mjs";

const router = express.Router();

// Routes Publiques
router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", logout);

// Routes Protégées (Nécessitent une connexion)
router.get("/me", authMiddleware, getCurrentUser);

// 👇 ROUTE PROFIL MISE À JOUR
router.put(
  "/profile",
  authMiddleware, // 1. On vérifie qui c'est
  uploadFields, // 2. On traite l'image (avatar) via Multer
  updateProfile, // 3. On met à jour la base de données
);

router.get("/notifications", authMiddleware, getNotifications);
router.patch("/notifications/read-all", authMiddleware, markReadAll);
router.get("/my-films", authMiddleware, getMyFilms);

export default router;
