import { Router } from "express";
import {
  getMyNotifications,
  markAllAsRead,
  markSomeAsRead,
  deleteNotification,
} from "../controllers/notificationController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

/**
 * GET    /notifications            → Historique paginé
 * PATCH  /notifications/read-all  → Tout marquer comme lu
 * PATCH  /notifications/read      → Marquer une sélection comme lue
 * DELETE /notifications/:id       → Supprimer une notification
 */

const notificationRoute = Router();

notificationRoute.use(authMiddleware);

notificationRoute.get("/", getMyNotifications);
notificationRoute.patch("/read-all", markAllAsRead);
notificationRoute.patch("/read", markSomeAsRead);
notificationRoute.delete("/:id", deleteNotification);

export default notificationRoute;