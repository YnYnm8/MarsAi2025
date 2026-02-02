
import express from "express";
import {
  getComite,
  selectFilm,
  addNote,
  validateFilm,
  refuseFilm,
  listFilms,
  sortHistory
} from "../controllers/committeeController.mjs";

const comiteRouter = express.Router();

comiteRouter.get("/", getComite);
comiteRouter.get("/select", selectFilm);
comiteRouter.post("/note", addNote);
comiteRouter.post("/select/:filmid", validateFilm);
comiteRouter.post("/refuse/:filmid", refuseFilm);
comiteRouter.post("/film/list", listFilms);
comiteRouter.get("/sort/history", sortHistory);

export default comiteRouter;
