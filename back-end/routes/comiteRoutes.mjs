import express from "express";
import {

  getAllRefusedFilms,
  reviewFilm,
  createPlaylist,
  addNote,
  acceptedFilm,
  refuseFilm,
  addFilmToPlaylist,
  getComiteSortHistory,
  getAllPlaylists,
  deletePlaylist,
  putAllFilmsToOfficialSelection,
  // modifyPlaylistStatus,
  // getFilmsByPlaylist,
  // getOfficialSelectionById,
  // getRefusedFilmsById,
  
} from "../controllers/comiteController.mjs";

const comiteRouter = express.Router()
comiteRouter.post("/select", putAllFilmsToOfficialSelection);
comiteRouter.post("/review/:FilmId", reviewFilm);
comiteRouter.get("/allplaylists",getAllPlaylists)
comiteRouter.post("/create/playlist",createPlaylist);
comiteRouter.get("/refused",getAllRefusedFilms);
comiteRouter.post("/select/:FilmId", acceptedFilm);
comiteRouter.post("/refused/:FilmId", refuseFilm);
comiteRouter.post("/film/list", addFilmToPlaylist);
comiteRouter.get("/sort/history/:userId", getComiteSortHistory);
comiteRouter.post("/note", addNote);
comiteRouter.patch("/deletestatus",deletePlaylist);

// comiteRouter.post("/select/:playlist_id", modifyPlaylistStatus);
// Object.function(String,function)
// comiteRouter.get("/allstatuses",getFilmsByPlaylist);

// comiteRouter.get("/refused/:userId", getRefusedFilmsById);
// comiteRouter.get("/select/:userId", getOfficialSelectionById);
export default comiteRouter;
