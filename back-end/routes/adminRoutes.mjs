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
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.use(authMiddleware);

// Stats dashboard admin
router.get("/stats",roleMiddleware('admin'), getStats);

// Liste de tous les users
router.get("/users",roleMiddleware('admin'), getAllUsers);

router.patch("/users/:id/role",roleMiddleware('admin'), updateUserRole);

router.get("/films",roleMiddleware('admin'), getAllFilms); 

// Status films
router.get("/films/selected",roleMiddleware('admin'), getSelectedFilms); 
router.get("/films/rejected",roleMiddleware('admin'), getRejectedFilms); 
router.get("/films/pending",roleMiddleware('admin'), getPendingFilms);

// changement de status
router.put("/films/:id/status",roleMiddleware('admin'), updateFilmStatus);
router.get("/playlists",roleMiddleware(['admin', 'committee']), getAllPlaylists);
router.get("/playlist/:id",roleMiddleware('admin'), getPlaylistDetails);


export default router;
