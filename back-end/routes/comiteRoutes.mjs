import express from "express";
import {
  getAllOfficialSelection,
  getAllRefusedFilms,
  reviewFilm,
  addNote,
  acceptedFilm,
  refuseFilm,
  addFilmToPlaylist,
  getComiteSortHistory,
  modifyPlaylistStatus,
  // getOfficialSelectionById,
  // getRefusedFilmsById,
  
} from "../controllers/comiteController.mjs";

const comiteRouter = express.Router();

comiteRouter.get("/select", getAllOfficialSelection);
comiteRouter.post("/review/:FilmId", reviewFilm);
comiteRouter.get("/refused",getAllRefusedFilms);
comiteRouter.post("/select/:FilmId", acceptedFilm);
comiteRouter.post("/refused/:FilmId", refuseFilm);
comiteRouter.post("/film/list", addFilmToPlaylist);
comiteRouter.get("/sort/history/:userId", getComiteSortHistory);
comiteRouter.post("/select/:playlist_id", modifyPlaylistStatus);
comiteRouter.post("/note", addNote);

// comiteRouter.get("/refused/:userId", getRefusedFilmsById);
// comiteRouter.get("/select/:userId", getOfficialSelectionById);
export default comiteRouter;
