import express from "express";
import {
  getAdminWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getWorkshops,
  createWorkshop,
  getTaux,
  getResatotales,
} from "../controllers/workshopController.mjs";

const router = express.Router();

/* ===================== */
/* ADMIN ROUTES */
/* ===================== */

// Voir tous les workshops (admin)
router.get("/admin/workshops", getAdminWorkshop);

router.get("/admin/resa/workshop", getResatotales);

router.get("./admin/taux/workshop", getTaux);
// Modifier un workshop
router.put("/admin/workshops/:id", updateWorkshop);

// Supprimer un workshop
router.delete("/admin/workshops/:id", deleteWorkshop);


/* ===================== */
/* PUBLIC ROUTES */
/* ===================== */

// Voir tous les workshops
router.get("/workshops", getWorkshops);

// Créer un workshop
router.post("/workshops", createWorkshop);

export default router;
