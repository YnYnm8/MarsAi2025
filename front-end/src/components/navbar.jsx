import { useState, useEffect } from "react";
import drapeauIcon from "/src/assets/drapeau.png";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Nouvel état pour savoir si on est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. Au chargement, on vérifie si l'utilisateur est connecté
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Erreur vérification auth:", error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Déconnexion réussie");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur réseau logout:", error);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded-b-2xl relative z-50 w-full">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="bg-[#1F66B1] text-white font-bold text-xl px-3 py-3 rounded-2xl tracking-wider select-none cursor-pointer"
        >
          MARS.A.I
        </div>

        {/* ICONS & MENU BUTTON */}
        <div className="flex items-center gap-3">
          <img
            src={drapeauIcon}
            alt="LogoDrapeau"
            className="h-8 w-11 object-cover cursor-pointer rounded-sm"
          />

          <button
            onClick={() => setMenuOpen(true)}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            <i className="fa-solid fa-bars text-black text-xl"></i>
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-[60] ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* SIDEBAR MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-[70] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER DU MENU */}
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <span className="font-bold text-lg text-[#1F66B1]">MARS.A.I</span>
          <button onClick={() => setMenuOpen(false)} className="text-black">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* LIENS DU MENU */}
        <div className="p-6 flex flex-col gap-6">
          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest"
          >
            HOME
          </button>

          <button
            onClick={() => {
              navigate("/gallery");
              setMenuOpen(false);
            }}
            className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest"
          >
            GALERIE
          </button>

          <button className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest">
            PROGRAMMES & INFOS
          </button>

          <button
            onClick={() => {
              navigate("/jury");
              setMenuOpen(false);
            }}
            className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest"
          >
            JURY
          </button>

          <hr className="border-gray-200" />

          {/* --- BLOC CONNECTÉ --- */}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  navigate("/form-movie");
                  setMenuOpen(false);
                }}
                className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest"
              >
                SOUMETTRE
              </button>

              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest"
              >
                PROFILE
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-left text-red-600 hover:text-red-800 font-bold uppercase text-sm tracking-widest"
              >
                SE DÉCONNECTER
              </button>
            </>
          ) : (
            /* --- BLOC NON CONNECTÉ --- */
            <>
              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
                className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest"
              >
                REGISTER
              </button>

              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="text-left text-gray-800 hover:text-blue-500 font-bold uppercase text-sm tracking-widest"
              >
                LOGIN
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
