import express from "express";
import {
  getOfficialSelection,
  addNote,
  modifyPlaylistStatus,
  addFilmToPlaylist,
  getComiteSortHistory
} from "../controllers/comiteController.mjs";

const comiteRouter = express.Router();

comiteRouter.get("/select", getOfficialSelection);
comiteRouter.post("/note", addNote);
comiteRouter.post("/select/:playlist_id", modifyPlaylistStatus);
comiteRouter.post("/film/list", addFilmToPlaylist);
comiteRouter.get("/sort/history/:userId", getComiteSortHistory);

export default comiteRouter;
