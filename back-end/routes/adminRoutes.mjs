import express from "express";
import {
  getStats,
  getAllUsers,
  updateUserRole,
  getAllFilms
} from "../controllers/adminController.mjs";

const router = express.Router();

// Stats dashboard admin
router.get("/stats", getStats);

// Liste de tous les users
router.get("/users", getAllUsers);

// Modifier le rôle d’un utilisateur
router.patch("/users/:id/role", updateUserRole);

router.get("/films", getAllFilms); // Endpoint: GET /admin/films

export default router;

