import express from "express";
import {
  getStats,
  getAllUsers,
  updateUserRole,
  getAllFilms,        
  getRejectedFilms,   
  getPendingFilms,
  getSelectedFilms,
  updateFilmStatus,
  getPlaylistDetails

} from "../controllers/adminController.mjs";

import { getAllPlaylists } from "../controllers/comiteController.mjs";

const router = express.Router();

// Stats dashboard admin
router.get("/stats", getStats);

// Liste de tous les users
router.get("/users", getAllUsers);

router.patch("/users/:id/role", updateUserRole);

router.get("/films", getAllFilms); 

// Status films
router.get("/films/selected", getSelectedFilms); 
router.get("/films/rejected", getRejectedFilms); 
router.get("/films/pending", getPendingFilms);

// changement de status
router.put("/films/:id/status", updateFilmStatus);
router.get("/playlists", getAllPlaylists);
router.get("/playlist/:id", getPlaylistDetails);


export default router;
