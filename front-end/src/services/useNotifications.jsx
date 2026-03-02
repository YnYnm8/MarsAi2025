import { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

/**
Hook React pour gérer les notifications en temps réel via Socket.io et charger l'historique via l'API REST.
 */
const useNotifications = (token) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const socketRef = useRef(null);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Connexion Socket.io
  useEffect(() => {
    if (!token) return;

    const socket = io(API, {
      auth: { token },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    // Réception d'une nouvelle notification en temps réel
    socket.on("notification", (newNotif) => {
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Afficher un toast ou une alerte navigateur si l'onglet est en arrière-plan
      if (document.hidden && Notification.permission === "granted") {
        new Notification(`MarsAI — ${newNotif.title}`, { body: newNotif.message });
      }
    });

    // Mise à jour du compteur non lus
    socket.on("notifications:unread_count", ({ count }) => {
      setUnreadCount(count);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, API]);

  // Chargement de l'historique
  const fetchNotifications = useCallback(
    async (pageNum = 1) => {
      if (!token || loading) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`${API}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: pageNum, limit: 20 },
        });

        if (pageNum === 1) {
          setNotifications(data.notifications);
        } else {
          setNotifications((prev) => [...prev, ...data.notifications]);
        }

        setUnreadCount(data.unreadCount);
        setHasMore(pageNum < data.pagination.totalPages);
      } catch (err) {
        console.error("[useNotifications] fetchNotifications:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, API, loading]
  );

  useEffect(() => {
    if (token) fetchNotifications(1);
  }, [token]); // eslint-disable-line

  // Marquer tout comme lu
  const markAllRead = useCallback(async () => {
    try {
      // Optimiste
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);

      // Via WebSocket (plus léger)
      if (socketRef.current) {
        socketRef.current.emit("notifications:read_all");
      } else {
        // Fallback REST
        await axios.patch(
          `${API}/notifications/read-all`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("[useNotifications] markAllRead:", err);
    }
  }, [API, token]);

  // Charger la page suivante 
  const fetchMore = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNotifications(nextPage);
    }
  }, [hasMore, loading, page, fetchNotifications]);

  // Supprimer une notification
  const deleteNotif = useCallback(
    async (id) => {
      try {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        await axios.delete(`${API}/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("[useNotifications] deleteNotif:", err);
      }
    },
    [API, token]
  );

  return { notifications, unreadCount, loading, hasMore, markAllRead, fetchMore, deleteNotif };
};

export default useNotifications;


