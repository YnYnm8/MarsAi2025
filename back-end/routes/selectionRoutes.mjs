import express from "express";
import {confirmSelection} from "../controllers/selectionController.mjs";

const router = express.Router();
router.post("/conform",confirmSelection);

export default router;