import express from "express";
import {
  getAllOfficialSelection,
  getAllRefusedFilms,
  reviewFilm,
  createPlaylist,
  addNote,
  acceptedFilm,
  refuseFilm,
  addFilmToPlaylist,
  getComiteSortHistory,
  getAllPlaylists,
  // modifyPlaylistStatus,
  // getFilmsByPlaylist,
  // getOfficialSelectionById,
  // getRefusedFilmsById,
  
} from "../controllers/comiteController.mjs";

const comiteRouter = express.Router()
comiteRouter.get("/select", getAllOfficialSelection);
comiteRouter.post("/review/:FilmId", reviewFilm);
comiteRouter.get("/allplaylists",getAllPlaylists)
// comiteRouter.get("/allstatuses",getFilmsByPlaylist);
comiteRouter.post("/create/playlist",createPlaylist);
comiteRouter.get("/refused",getAllRefusedFilms);
comiteRouter.post("/select/:FilmId", acceptedFilm);
comiteRouter.post("/refused/:FilmId", refuseFilm);
comiteRouter.post("/film/list", addFilmToPlaylist);
comiteRouter.get("/sort/history/:userId", getComiteSortHistory);
comiteRouter.post("/note", addNote);
// comiteRouter.post("/select/:playlist_id", modifyPlaylistStatus);
// Object.function(String,function)

// comiteRouter.get("/refused/:userId", getRefusedFilmsById);
// comiteRouter.get("/select/:userId", getOfficialSelectionById);
export default comiteRouter;
