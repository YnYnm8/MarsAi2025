import jwt from "jsonwebtoken";

/**
 * Authentification via le cookie httpOnly "token" (cohérent avec authMiddleware).
 */
export const initSocket = (io, models) => {

  // Middleware d'authentification via cookie
  io.use((socket, next) => {
    try {
      // Lire le cookie "token" depuis le handshake (envoyé grâce à withCredentials: true)
      const rawCookie = socket.handshake.headers.cookie || "";
      const tokenEntry = rawCookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));

      // Fallback
      const fallbackToken =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace("Bearer ", "");

      const token = tokenEntry
        ? tokenEntry.split("=")[1].trim()
        : fallbackToken;

      if (!token) {
        return next(new Error("Token manquant. Connexion refusée."));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
      socket.userId   = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch {
      return next(new Error("Token invalide ou expiré."));
    }
  });

  // Gestion des connexions
  io.on("connection", async (socket) => {
    const userId = socket.userId;

    // Rejoindre la room privée de l'utilisateur
    socket.join(`user_${userId}`);
    console.log(`[Socket.io] ✅ User ${userId} connecté (socket: ${socket.id})`);

    // Envoyer le nombre de notifications non lues à la connexion
    try {
      const unreadCount = await models.Notification.count({
        where: { userId, isRead: false },
      });
      socket.emit("notifications:unread_count", { count: unreadCount });
    } catch (err) {
      console.error("[Socket.io] Erreur récupération unread count:", err.message);
    }

    // Marquer toutes les notifs comme lues via WebSocket
    socket.on("notifications:read_all", async () => {
      try {
        await models.Notification.update(
          { isRead: true },
          { where: { userId, isRead: false } }
        );
        socket.emit("notifications:unread_count", { count: 0 });
      } catch (err) {
        console.error("[Socket.io] Erreur read_all:", err.message);
      }
    });

    // Déconnexion
    socket.on("disconnect", (reason) => {
      console.log(`[Socket.io] ❌ User ${userId} déconnecté (${reason})`);
    });
  });
};