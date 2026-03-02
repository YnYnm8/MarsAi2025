import express from "express";
import { saveAllInfos } from "../controllers/contactController.mjs";

const contactRouter = express.Router()
contactRouter.post("/inpos",saveAllInfos);



export default contactRouter;