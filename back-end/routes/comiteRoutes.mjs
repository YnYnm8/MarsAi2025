import express from "express";
import {
  getAllOfficialSelection,
  // getOfficialSelectionById,
  getAllRefusedFilms,
  getRefusedFilmsById,
  addNote,
  modifyPlaylistStatus,
  addFilmToPlaylist,
  getComiteSortHistory,
  
} from "../controllers/comiteController.mjs";

const comiteRouter = express.Router();

comiteRouter.get("/select", getAllOfficialSelection);
// comiteRouter.get("/select/:userId", getOfficialSelectionById);
comiteRouter.get("/refused",getAllRefusedFilms);
// comiteRouter.get("/refused/:userId", getRefusedFilmsById);
comiteRouter.post("/note", addNote);
comiteRouter.post("/select/:playlist_id", modifyPlaylistStatus);
comiteRouter.post("/film/list", addFilmToPlaylist);
comiteRouter.get("/sort/history/:userId", getComiteSortHistory);

export default comiteRouter;
