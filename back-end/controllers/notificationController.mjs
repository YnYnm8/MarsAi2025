import { z } from "zod";


const markReadSchema = z.object({
  ids: z.array(z.number().int().positive()).optional(),
});


/**
 * GET /notifications
 * Récupère l'historique des notifications de l'utilisateur connecté (paginé).
 */
export const getMyNotifications = async (req, res) => {
  try {
    const { Notification } = req.app.locals.models;
    const userId = req.user.id;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const offset = (page - 1) * limit;

    const { count, rows } = await Notification.findAndCountAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes: ["id", "type", "title", "message", "isRead", "metadata", "createdAt"],
    });

    const unreadCount = await Notification.count({ where: { userId, isRead: false } });

    return res.status(200).json({
      notifications: rows,
      unreadCount,
      pagination: {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("[notificationController.getMyNotifications]", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

/**
 * PATCH /notifications/read-all
 * Marque toutes les notifications de l'utilisateur comme lues.
 */
export const markAllAsRead = async (req, res) => {
  try {
    const { Notification } = req.app.locals.models;
    const userId = req.user.id;

    const [updatedCount] = await Notification.update(
      { isRead: true },
      { where: { userId, isRead: false } }
    );

    return res.status(200).json({
      message: `${updatedCount} notification(s) marquée(s) comme lue(s).`,
      updatedCount,
    });
  } catch (error) {
    console.error("[notificationController.markAllAsRead]", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

/**
 * PATCH /notifications/read
 * Marque un tableau de notifications comme lues.
 */
export const markSomeAsRead = async (req, res) => {
  try {
    const parsed = markReadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Format invalide.", errors: parsed.error.format() });
    }

    const { Notification } = req.app.locals.models;
    const userId = req.user.id;
    const { ids } = parsed.data;

    const whereClause = { userId, isRead: false };
    if (ids && ids.length > 0) whereClause.id = ids;

    const [updatedCount] = await Notification.update({ isRead: true }, { where: whereClause });

    return res.status(200).json({ updatedCount });
  } catch (error) {
    console.error("[notificationController.markSomeAsRead]", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

/**
 * DELETE /notifications/:id
 * Supprime une notification spécifique de l'utilisateur connecté.
 */
export const deleteNotification = async (req, res) => {
  try {
    const { Notification } = req.app.locals.models;
    const userId = req.user.id;
    const notifId = parseInt(req.params.id);

    if (!notifId || isNaN(notifId)) {
      return res.status(400).json({ message: "ID invalide." });
    }

    const deleted = await Notification.destroy({
      where: { id: notifId, userId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Notification introuvable." });
    }

    return res.status(200).json({ message: "Notification supprimée." });
  } catch (error) {
    console.error("[notificationController.deleteNotification]", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};