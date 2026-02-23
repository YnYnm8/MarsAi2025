import express from "express";
import {
  getStats,
  getAllUsers,
  updateUserRole,
  getAllFilms,        
  getRejectedFilms,   
  getPendingFilms,
  getAcceptedFilms 
} from "../controllers/adminController.mjs";


const router = express.Router();

// Stats dashboard admin
router.get("/stats", getStats);

// Liste de tous les users
router.get("/users", getAllUsers);

router.patch("/users/:id/role", updateUserRole);

router.get("/films", getAllFilms); 

router.get("/films/selected", getAcceptedFilms); 
router.get("/films/rejected", getRejectedFilms); 
router.get("/films/pending", getPendingFilms);

export default router;
