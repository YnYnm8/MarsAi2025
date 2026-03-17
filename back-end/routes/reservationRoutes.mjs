import express from "express";
import {
  getResa,
  insertResa,
  
} from "../controllers/reservationController.mjs";

const router = express.Router();

router.post("/", insertResa);


export default router;
