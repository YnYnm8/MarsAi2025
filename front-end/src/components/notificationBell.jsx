import { useState } from "react";
import useNotifications from "./useNotifications";
// COMPOSANT CLOCHE

/**
 * Composant cloche de notification (header).
 */
export const NotificationBell = ({ token }) => {
  const { notifications, unreadCount, markAllRead, fetchMore, hasMore, loading } =
    useNotifications(token);

  const [open, setOpen] = useState(false);

  // Icônes par type
  const TYPE_ICONS = {
    FILM_SELECTED: "🏆",
    FILM_APPROVED: "✅",
    FILM_REJECTED_ADMIN: "⚠️",
    FILM_BANNED: "🚫",
    FILM_MODIFICATION_ASKED: "📝",
    FILM_MODIFICATION_OK: "✅",
    FILM_MODIFICATION_KO: "❌",
    FILM_SUBMITTED: "🎬",
    FILM_NOT_SELECTED: "📋",
    FILMS_ASSIGNED: "📋",
    SELECTION_OPENED: "🟢",
    SELECTION_CLOSED: "🔴",
    TICKET_CREATED: "🚨",
    NEW_FILM_PENDING: "⏳",
    MODIFICATION_REQUEST: "📝",
    DEFAULT: "🔔",
  };

  return (
    <div className="relative">
      {/* Bouton cloche */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-full hover:bg-purple-900/40 transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panneau déroulant */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-[#1a1a2e] border border-[#2a2a4a] rounded-xl shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a4a]">
            <span className="font-bold text-white">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          {/* Liste */}
          <div className="max-h-96 overflow-y-auto divide-y divide-[#2a2a4a]">
            {notifications.length === 0 && !loading && (
              <p className="text-center text-gray-500 py-8 text-sm">Aucune notification</p>
            )}

            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex gap-3 px-4 py-3 hover:bg-[#22223a] transition-colors ${
                  !notif.isRead ? "bg-purple-900/10" : ""
                }`}
              >
                <span className="text-xl shrink-0 mt-0.5">
                  {TYPE_ICONS[notif.type] || TYPE_ICONS.DEFAULT}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${!notif.isRead ? "text-white" : "text-gray-300"}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{notif.message}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(notif.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!notif.isRead && (
                  <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0 mt-2" />
                )}
              </div>
            ))}

            {/* Charger plus */}
            {hasMore && (
              <button
                onClick={fetchMore}
                disabled={loading}
                className="w-full py-3 text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                {loading ? "Chargement..." : "Voir plus"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};