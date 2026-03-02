import { useState, useRef, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import DrapeauEn from "/src/assets/drapeauEn.png";
import DrapeauFr from "/src/assets/drapeauFr.png";
import Drapeaujp from "/src/assets/drapeauJp.png";
import DrapeauSp from "/src/assets/drapeauSp.png";
import DrapeauCr from "/src/assets/drapeauCr.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/authContext";

const API = "http://localhost:3000";

const TYPE_ICONS = {
  FILM_SELECTED:           { icon: "🏆" },
  FILM_APPROVED:           { icon: "✅" },
  FILM_REJECTED_ADMIN:     { icon: "⚠️" },
  FILM_BANNED:             { icon: "🚫" },
  FILM_MODIFICATION_ASKED: { icon: "📝" },
  FILM_MODIFICATION_OK:    { icon: "✅" },
  FILM_MODIFICATION_KO:    { icon: "❌" },
  FILM_SUBMITTED:          { icon: "🎬" },
  FILM_NOT_SELECTED:       { icon: "📋" },
  FILMS_ASSIGNED:          { icon: "📋" },
  SELECTION_OPENED:        { icon: "🟢" },
  SELECTION_CLOSED:        { icon: "🔴" },
  TICKET_CREATED:          { icon: "🚨" },
  NEW_FILM_PENDING:        { icon: "⏳" },
  MODIFICATION_REQUEST:    { icon: "📝" },
  SYSTEM:                  { icon: "🔔" },
  DEFAULT:                 { icon: "🔔" },
};

const useNotifications = (isLoggedIn) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount]     = useState(0);
  const [loading, setLoading]             = useState(false);
  const socketRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/notifications?page=1&limit=20`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error("[useNotifications] fetch:", err);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    fetchNotifications();

    const socket = io(API, {
      withCredentials: true,
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("notifications:unread_count", ({ count }) => setUnreadCount(count));

    socket.on("connect_error", (err) => {
      console.warn("[Socket.io] Erreur connexion:", err.message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  const markAllRead = useCallback(async () => {
    if (!isLoggedIn) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
    try {
      if (socketRef.current?.connected) {
        socketRef.current.emit("notifications:read_all");
      } else {
        await fetch(`${API}/notifications/read-all`, {
          method: "PATCH",
          credentials: "include",
        });
      }
    } catch (err) {
      console.error("[useNotifications] markAllRead:", err);
    }
  }, [isLoggedIn]);

  return { notifications, unreadCount, loading, markAllRead };
};

const NotificationBell = ({ isLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const panelRef        = useRef(null);
  const { notifications, unreadCount, loading, markAllRead } = useNotifications(isLoggedIn);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
      >
        <i className="fa-solid fa-bell text-gray-700 text-lg"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#1F66B1] cursor-pointer  text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-[200] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-[#1F66B1] cursor-pointer hover:text-blue-700 font-medium transition-colors cursor-pointer"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {loading && (
              <div className="flex justify-center py-6">
                <div className="w-5 h-5 border-2 border-[#1F66B1] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && notifications.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-2xl mb-2">🔔</p>
                <p className="text-sm text-gray-400">Aucune notification</p>
              </div>
            )}

            {!loading && notifications.map((notif) => {
              const { icon } = TYPE_ICONS[notif.type] || TYPE_ICONS.DEFAULT;
              return (
                <div
                  key={notif.id}
                  className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    !notif.isRead ? "bg-blue-50/60" : ""
                  }`}
                >
                  <span className="text-lg shrink-0 mt-0.5">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold leading-tight ${
                      !notif.isRead ? "text-gray-900" : "text-gray-600"
                    }`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">{formatDate(notif.createdAt)}</p>
                  </div>
                  {!notif.isRead && (
                    <span className="w-2 h-2 bg-[#1F66B1] rounded-full shrink-0 mt-1.5" />
                  )}
                </div>
              );
            })}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-2.5 text-center">
              <span className="text-xs text-gray-400">
                {notifications.length} notification{notifications.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TopNavbar = () => {
  const navigate                      = useNavigate();
  const [menuOpen, setMenuOpen]       = useState(false);
  const { t, i18n }                   = useTranslation("common");
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur réseau logout:", error);
    }
  };

  const toggleLanguage = () => {
    const newLang =
      i18n.language === "fr" ? "en" :
      i18n.language === "en" ? "jp" :
      i18n.language === "jp" ? "sp" :
      i18n.language === "sp" ? "cr" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded-b-2xl relative z-50 w-full">
        <div
          onClick={() => navigate("/")}
          className="bg-[#1F66B1] text-white font-bold text-xl px-3 py-3 rounded-2xl tracking-wider select-none cursor-pointer"
        >
          MARS.A.I
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t("navbar.home")}
            </button>
            <button onClick={() => navigate("/gallery")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t("navbar.gallery")}
            </button>
            <button onClick={() => navigate("/programs")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t("navbar.programs")}
            </button>
            <button onClick={() => navigate("/jury")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t("navbar.jury")}
            </button>
            {isLoggedIn ? (
              <>
                <button onClick={() => navigate("/form-movie")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t("navbar.submit")}
                </button>
                <button onClick={() => navigate("/profile")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t("navbar.profile")}
                </button>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 cursor-pointer transition-colors font-bold uppercase text-xs tracking-widest">
                  {t("navbar.logout")}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/register")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t("navbar.register")}
                </button>
                <button onClick={() => navigate("/login")} className="text-gray-800 cursor-pointer hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t("navbar.login")}
                </button>
              </>
            )}
          </div>

          <div onClick={toggleLanguage} className="flex items-center gap-2 cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity">
            <img
              src={
                i18n.language === "en" ? DrapeauEn :
                i18n.language === "jp" ? Drapeaujp :
                i18n.language === "sp" ? DrapeauSp :
                i18n.language === "cr" ? DrapeauCr :
                DrapeauFr
              }
              alt="Changer de langue"
              className="h-8 w-11 object-cover rounded-sm shadow-sm"
            />
            <span className="font-bold text-gray-700 uppercase text-sm">{i18n.language}</span>
          </div>

          {isLoggedIn && <NotificationBell isLoggedIn={isLoggedIn} />}

          <button
            onClick={() => setMenuOpen(true)}
            className="w-8 h-8 flex items-center justify-center cursor-pointer md:hidden text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-[60] ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-[70] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <span className="font-bold text-lg text-[#1F66B1]">MARS.A.I</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 hover:text-red-600 active:text-red-800 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <button onClick={() => { navigate("/"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t("navbar.home")}
          </button>
          <button onClick={() => { navigate("/gallery"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t("navbar.gallery")}
          </button>
          <button onClick={() => { navigate("/programs"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t("navbar.programs")}
          </button>
          <button onClick={() => { navigate("/jury"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t("navbar.jury")}
          </button>

          <hr className="border-gray-200" />



          {isLoggedIn ? (
            <>
              <button onClick={() => { navigate("/form-movie"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t("navbar.submit")}
              </button>
              <button onClick={() => { navigate("/profile"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t("navbar.profile")}
              </button>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left cursor-pointer text-red-600 hover:text-red-800 active:text-red-900 transition-colors font-bold uppercase text-sm tracking-widest">
                {t("navbar.logout")}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { navigate("/register"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t("navbar.register")}
              </button>
              <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="text-left cursor-pointer text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t("navbar.login")}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavbar;