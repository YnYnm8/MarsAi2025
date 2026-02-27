import { useState } from "react";
import DrapeauEn from "/src/assets/drapeauEn.png";
import DrapeauFr from "/src/assets/drapeauFr.png";
import Drapeaujp from "/src/assets/drapeauJp.png";
import DrapeauSp from "/src/assets/drapeauSp.png";
import DrapeauCr from "/src/assets/drapeauCr.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../context/authContext";

const TopNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation('common');
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
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
      i18n.language === 'fr' ? 'en' :
      i18n.language === 'en' ? 'jp' :
      i18n.language === 'jp' ? 'sp' :
      i18n.language === 'sp' ? 'cr' : 'fr';
    i18n.changeLanguage(newLang);
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

        <div className="flex items-center gap-6">
          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t('navbar.home')}
            </button>
            <button onClick={() => navigate("/gallery")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t('navbar.gallery')}
            </button>
            <button onClick={() => navigate("/programs")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t('navbar.programs')}
            </button>
            <button onClick={() => navigate("/jury")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
              {t('navbar.jury')}
            </button>

            {isLoggedIn ? (
              <>
                <button onClick={() => navigate("/form-movie")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t('navbar.submit')}
                </button>
                <button onClick={() => navigate("/profile")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t('navbar.profile')}
                </button>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/register")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t('navbar.register')}
                </button>
                <button onClick={() => navigate("/login")} className="text-gray-800 hover:text-blue-500 transition-colors font-bold uppercase text-xs tracking-widest">
                  {t('navbar.login')}
                </button>
              </>
            )}
          </div>

          {/* BOUTON LANGUE */}
          <div onClick={toggleLanguage} className="flex items-center gap-2 cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity">
            <img
              src={
                i18n.language === 'en' ? DrapeauEn :
                i18n.language === 'jp' ? Drapeaujp :
                i18n.language === 'sp' ? DrapeauSp :
                i18n.language === 'cr' ? DrapeauCr :
                DrapeauFr
              }
              alt="Changer de langue"
              className="h-8 w-11 object-cover rounded-sm shadow-sm"
            />
            <span className="font-bold text-gray-700 uppercase text-sm">{i18n.language}</span>
          </div>

          {/* BOUTON BURGER active:text-blue-600 ajouté */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-8 h-8 flex items-center justify-center cursor-pointer md:hidden text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <i className="fa-solid fa-bars text-xl"></i>
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

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-[70] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <span className="font-bold text-lg text-[#1F66B1]">MARS.A.I</span>
          {/* BOUTON FERMER active:text-red-800 ajouté */}
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 hover:text-red-600 active:text-red-800 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* LIENS MOBILE active:text-blue-600 ajouté partout */}
          <button onClick={() => { navigate("/"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t('navbar.home')}
          </button>
          <button onClick={() => { navigate("/gallery"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t('navbar.gallery')}
          </button>
          <button onClick={() => { navigate("/programs"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t('navbar.programs')}
          </button>
          <button onClick={() => { navigate("/jury"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
            {t('navbar.jury')}
          </button>

          <hr className="border-gray-200" />

          {isLoggedIn ? (
            <>
              <button onClick={() => { navigate("/form-movie"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t('navbar.submit')}
              </button>
              <button onClick={() => { navigate("/profile"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t('navbar.profile')}
              </button>
              {/* BOUTON DECONNEXION active:text-red-900 ajouté */}
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left text-red-600 hover:text-red-800 active:text-red-900 transition-colors font-bold uppercase text-sm tracking-widest">
                {t('navbar.logout')}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { navigate("/register"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t('navbar.register')}
              </button>
              <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="text-left text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                {t('navbar.login')}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavbar;