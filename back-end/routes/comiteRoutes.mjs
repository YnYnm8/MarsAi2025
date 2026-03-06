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


comiteRouter.post("/select",authMiddleware, roleMiddleware('committee'),getAllOfficialSelection);
comiteRouter.post("/review/:FilmId", authMiddleware, roleMiddleware('committee'),reviewFilm);
comiteRouter.get("/allplaylists",authMiddleware,roleMiddleware('committee' || "admin"), getAllPlaylists)
comiteRouter.get("/allplaylistsbyuserid",authMiddleware,roleMiddleware('committee' || "admin"), getAllPlaylistsByUserId)

// Get playlist by id
comiteRouter.post("/create/playlist",authMiddleware,roleMiddleware('committee'), createPlaylist);
comiteRouter.get("/refused",authMiddleware, roleMiddleware('committee'),getAllRefusedFilms);
comiteRouter.post("/select/:FilmId",authMiddleware, roleMiddleware('committee'), acceptedFilm);
comiteRouter.post("/refused/:FilmId",authMiddleware, roleMiddleware('committee'), refuseFilm);
comiteRouter.post("/film/list", authMiddleware,roleMiddleware('committee'), addFilmToPlaylist);
comiteRouter.get("/sort/history/:userId",authMiddleware, roleMiddleware('committee'), getComiteSortHistory);
comiteRouter.post("/note", authMiddleware, roleMiddleware('committee'),addNote);
comiteRouter.patch("/deletestatus",authMiddleware, roleMiddleware('committee'),deletePlaylist);
comiteRouter.get("/playlist/:id",authMiddleware,roleMiddleware('committee'), getPlaylistDetails);

// comiteRouter.post("/select/:playlist_id", modifyPlaylistStatus);
// Object.function(String,function)
// comiteRouter.get("/allstatuses",getFilmsByPlaylist);

// comiteRouter.get("/refused/:userId", getRefusedFilmsById);
// comiteRouter.get("/select/:userId", getOfficialSelectionById);
export default comiteRouter;