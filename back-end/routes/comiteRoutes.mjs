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
  getAllOfficialSelection,
  getAllPlaylistsByUserId,
  // modifyPlaylistStatus,
  // getOfficialSelectionById,
  // getRefusedFilmsById,
  
} from "../controllers/comiteController.mjs";
import { getPlaylistDetails } from "../controllers/adminController.mjs";
import { authMiddleware,roleMiddleware } from "../middlewares/authMiddleware.mjs";

const comiteRouter = express.Router()
comiteRouter.use(authMiddleware);

comiteRouter.post("/select", roleMiddleware('committee'),getAllOfficialSelection);
comiteRouter.post("/review/:FilmId", roleMiddleware('committee'),reviewFilm);
comiteRouter.get("/allplaylists",roleMiddleware(['committee','admin']), getAllPlaylists)
comiteRouter.get("/allplaylistsbyuserid",roleMiddleware(['committee','admin']), getAllPlaylistsByUserId)

// Get playlist by id
comiteRouter.post("/create/playlist",roleMiddleware('committee'), createPlaylist);
comiteRouter.get("/refused",roleMiddleware('committee'),getAllRefusedFilms);
comiteRouter.post("/select/:FilmId",roleMiddleware('committee'), acceptedFilm);
comiteRouter.post("/refused/:FilmId",roleMiddleware('committee'), refuseFilm);
comiteRouter.post("/film/list",roleMiddleware('committee'), addFilmToPlaylist);
comiteRouter.get("/sort/history/:userId",roleMiddleware('committee'), getComiteSortHistory);
comiteRouter.post("/note",roleMiddleware('committee'),addNote);
comiteRouter.patch("/deletestatus",roleMiddleware('committee'),deletePlaylist);
comiteRouter.get("/playlist/:id",roleMiddleware('committee'), getPlaylistDetails);

// comiteRouter.post("/select/:playlist_id", modifyPlaylistStatus);
// Object.function(String,function)
// comiteRouter.get("/allstatuses",getFilmsByPlaylist);

// comiteRouter.get("/refused/:userId", getRefusedFilmsById);
// comiteRouter.get("/select/:userId", getOfficialSelectionById);
export default comiteRouter;