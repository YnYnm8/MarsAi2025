import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Gallery = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("gallery", "common");
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    iaType: null,
    country: null,
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeShareId, setActiveShareId] = useState(null);
  const iaOptions = [
    { label: t("badge_full_ai"), value: "fullAi" },
    { label: t("badge_hybrid"), value: "hybrid" },
  ];

  const paysOptions = [
    { label: t("country_FR", "France"), value: "France" },
    { label: t("country_JP", "Japon"), value: "Japon" },
    { label: t("country_EN", "Angleterre"), value: "Angleterre" },
    { label: t("country_CR", "Créole"), value: "Créole" },
    { label: t("country_SP", "Espagne"), value: "Espagne" },
  ];
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/films", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Erreur réseau");
        const result = await response.json();
        if (Array.isArray(result)) {
          setFilms(result);
        } else if (result.data && Array.isArray(result.data)) {
          setFilms(result.data);
        } else {
          setFilms([]);
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError(t("error_fetch_films"));
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, [t]);
  const getDirectorObj = (film) => film.User || film.user || film.director || {};
  const getDirectorName = (film) => {
    const director = getDirectorObj(film);
    if (director && typeof director === "object") {
      const firstName = director.firstName || "";
      const lastName = director.lastName || "";
      return firstName || lastName
        ? `${firstName} ${lastName}`.trim()
        : t("unknown_director", "Inconnu");
    }
    if (typeof director === "string") return director;
    return t("unknown_director", "Inconnu");
  };
  const getPosterUrl = (film) => {
    if (film.Files && film.Files.length > 0 && film.Files[0].poster_url) {
      const url = film.Files[0].poster_url;
      if (url.startsWith("http")) return url;
      let cleanPath = url.replace(/\\/g, "/").replace(/^(\/)?public\//, "");
      return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    }

    return "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop";
  };
  const getFilmUrl = (film) => {
    if (film.Files && film.Files.length > 0 && film.Files[0].film_url) {
        const url = film.Files[0].film_url;
        if (url.startsWith("http")) return url;
        let cleanPath = url.replace(/\\/g, "/").replace(/^(\/)?public\//, "");
        return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    }
    return null;
};
  const copyToClipboard = (id) => {
    const url = `${window.location.origin}/films/${id}`;
    navigator.clipboard.writeText(url);
    alert(t("share_link_copied", "Lien copié dans le presse-papier !"));
  };
  const shareToNetwork = async (e, network, film) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/films/${film.id}`;
    const encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(t("share_text", { title: film.title || t("untitled") }));
    let shareLink = "";
    switch (network) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "x":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`;
        break;
      case "telegram":
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${text}`;
        break;
      case "copy":
        copyToClipboard(film.id);
        break;
      default:
        break;
    }
    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer");
    }
    setActiveShareId(null);
    try {
      const response = await fetch(`http://localhost:3000/films/share/${film.id}`, { method: "POST" });
      const result = await response.json();
      if (result.success && result.incremented) {
        setFilms((prevFilms) =>
          prevFilms.map((f) => (f.id === film.id ? { ...f, shares: result.shares } : f))
        );
      }
    } catch (err) {
      console.error("Erreur lors du comptage du partage:", err);
    }
  };
  useEffect(() => {
    const handleClickOutside = () => setActiveShareId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  const handleFilmClick = (film) => {
    setSelectedFilm(film);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const FilmCard = ({ film }) => (
    <div
      onClick={() => handleFilmClick(film)}
      className="flex flex-col items-center w-[318px] rounded-[32px] cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg group relative"
    >
      <div className="relative w-[318px] h-[200px] rounded-t-[32px] overflow-hidden bg-gray-900 border-x border-t border-gray-800 group-hover:border-[#246BAD] transition-colors">
        <img
          src={getPosterUrl(film)}
          alt={film.title || t("untitled")}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-[24px] left-[24px] px-[12px] py-[4px] bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
          <span className="font-light text-[10px] uppercase text-white tracking-wide">
            {film.generateAi === "fullAi" ? t("badge_full_ai") : t("badge_hybrid")}
          </span>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-[#246BAD]/80 group-hover:border-[#246BAD] transition-all">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
        </div>
      </div>
      <div className="flex flex-col items-start p-[24px] gap-[16px] w-[318px] h-auto min-h-[140px] bg-[#0F0F0F] rounded-b-[32px] border-x border-b border-gray-800 group-hover:border-[#246BAD] transition-colors">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="font-['Inter'] font-extrabold text-[18px] uppercase text-white truncate max-w-[180px] group-hover:text-[#246BAD] transition-colors">
            {film.title || t("untitled")}
          </h3>
          <div className="flex flex-row justify-center items-center px-[8px] py-[6px] bg-[rgba(255,88,69,0.15)] rounded-[4px]">
            <span className="font-['Inter'] font-extrabold text-[10px] uppercase text-[#FF5845]">
              {film.duration ? `${film.duration} ${t("sec", "SEC")}` : "N/A"}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-[12px]">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-[10px] uppercase text-gray-500">
                {t("director_label")}
              </span>
              <span className="font-bold text-[12px] text-gray-200 truncate max-w-[140px]">
                {getDirectorName(film)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-semibold text-[10px] uppercase text-gray-500">
                {t("origin_label")}
              </span>
              <div className="flex flex-row items-center gap-[6px]">
                <span className="w-[16px] h-[16px] bg-gray-700 rounded-full flex items-center justify-center text-[8px]">
                  🌍
                </span>
                <span className="font-semibold text-[12px] text-gray-200">
                  {t(`country_${getDirectorObj(film).country || "FR"}`, getDirectorObj(film).country || "FR")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center pt-3 border-t border-gray-800/60 relative">
            <div className="flex items-center gap-1.5 text-gray-400 transition-colors">
              <i className="fa-regular fa-eye text-[14px]"></i>
              <span className="font-bold text-[11px]">{film.views || 0}</span>
            </div>
            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveShareId(activeShareId === film.id ? null : film.id);
                }}
                className={`flex items-center gap-1.5 p-1 -ml-1 rounded-md cursor-pointer transition-colors ${activeShareId === film.id ? "text-white bg-gray-800" : "text-gray-400 hover:text-[#246BAD]"}`}
              >
                <i className="fa-solid fa-share text-[14px]"></i>
                <span className="font-bold text-[11px]">{film.shares || 0}</span>
              </div>
              {activeShareId === film.id && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-56 bg-[#2C2C2D] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden p-2 grid grid-cols-2 gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={(e) => shareToNetwork(e, "facebook", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors">
                    <i className="fa-brands fa-facebook text-[#1877F2] text-[16px] w-4 text-center"></i> Facebook
                  </button>
                  <button onClick={(e) => shareToNetwork(e, "x", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors">
                    <img width="16" height="16" src="https://img.icons8.com/material-outlined/24/ffffff/twitterx--v1.png" alt="X" /> X
                  </button>
                  <button onClick={(e) => shareToNetwork(e, "linkedin", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors">
                    <i className="fa-brands fa-linkedin text-[#0A66C2] text-[16px] w-4 text-center"></i> LinkedIn
                  </button>
                  <button onClick={(e) => shareToNetwork(e, "whatsapp", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors">
                    <i className="fa-brands fa-whatsapp text-[#25D366] text-[16px] w-4 text-center"></i> WhatsApp
                  </button>
                  <button onClick={(e) => shareToNetwork(e, "telegram", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors">
                    <i className="fa-brands fa-telegram text-[#24A1DE] text-[16px] w-4 text-center"></i> Telegram
                  </button>
                  <button onClick={(e) => shareToNetwork(e, "copy", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-400 transition-colors">
                    <i className="fa-solid fa-link text-gray-400 text-[14px] w-4 text-center"></i> {t("share_link_btn")}
                  </button>
                </div>
              )}
            </div>
            {film.averageScore > 0 && (
              <div className="flex items-center gap-1 text-[#FFD700] absolute right-0 font-bold text-[11px]">
                <span>★</span> {film.averageScore}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  let processedFilms = films.filter((film) => {
    if (activeFilters.search) {
      const searchTerm = activeFilters.search.toLowerCase().trim();
      const title = (film.title || "").toLowerCase();
      const director = getDirectorName(film).toLowerCase();
      if (!title.includes(searchTerm) && !director.includes(searchTerm))
        return false;
    }
    if (activeFilters.iaType && film.generateAi !== activeFilters.iaType) return false;
    if (activeFilters.country && getDirectorObj(film).country?.toLowerCase() !== activeFilters.country.toLowerCase()) return false;
    return true;
  });
  processedFilms.sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(processedFilms.length / itemsPerPage);
  const paginatedFilms = processedFilms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleFilterClick = (type, value) => {
    setActiveFilters((prev) => ({ ...prev, [type]: value }));
    setOpenDropdown(null);
    setCurrentPage(1);
  };
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };
  return (
    <div className="min-h-screen bg-[#050505] font-['Plus_Jakarta_Sans'] flex flex-col items-center text-white">
      <div className="w-full">

      </div>
      <div className="flex flex-col items-start w-full max-w-[1280px] px-[20px] py-[43px] gap-[38px] min-h-[600px]">

        {selectedFilm ? (
          <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <p
                onClick={() => setSelectedFilm(null)}
                className="text-sm text-[#246BAD] font-bold tracking-widest uppercase cursor-pointer hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> {t("back_gallery", "RETOUR GALERIE")}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-black flex justify-center">
              {getFilmUrl(selectedFilm) && getFilmUrl(selectedFilm).endsWith('.mp4') ? (
                <video controls className="w-full max-h-[500px] object-contain" poster={getPosterUrl(selectedFilm)}>
                  <source src={getFilmUrl(selectedFilm)} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              ) : getFilmUrl(selectedFilm) ? (
                <iframe
                  src={getFilmUrl(selectedFilm).replace("watch?v=", "embed/")}
                  className="w-full h-[300px] md:h-[500px]"
                  allowFullScreen
                  title={selectedFilm.title}
                ></iframe>
              ) : (
                <img
                  src={getPosterUrl(selectedFilm)}
                  alt={selectedFilm.title}
                  className="w-full h-[300px] md:h-[500px] object-cover opacity-90"
                />
              )}
            </div>
            <div className="flex flex-wrap items-start gap-8 px-2">
              <div className="flex items-center gap-4">
                <img
                  src={getDirectorObj(selectedFilm).avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Avatar"
                  className="bg-orange-500 rounded-full w-12 h-12 flex-shrink-0 object-cover border border-gray-700"
                />
                <div className="flex flex-col">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t("director_label", "Réalisateur")}</p>
                  <h2 className="font-bold text-lg text-gray-200">{getDirectorName(selectedFilm)}</h2>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-xl border border-gray-700">
                  🌍
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t("origin_label", "Origine")}</p>
                  <h2 className="font-bold text-lg text-gray-200 uppercase">
                    {t(`country_${getDirectorObj(selectedFilm).country || "FR"}`, getDirectorObj(selectedFilm).country || "FR")}
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-[#0F0F0F] border border-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                  {selectedFilm.title || t("untitled", "Sans titre")}
                </h2>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-[#246BAD]/20 text-[#246BAD] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#246BAD]/30">
                    {selectedFilm.generateAi === "fullAi" ? t("badge_full_ai", "Génération 100% IA") : t("badge_hybrid", "Hybride")}
                  </span>
                  {selectedFilm.duration && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/30">
                      {selectedFilm.duration} {t("seconds", "SECONDES")}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="flex items-center gap-4">
                  <h3 className="text-xs text-gray-500 font-bold uppercase tracking-widest whitespace-nowrap">
                    {t("share_this_film", "Partager ce film")}
                  </h3>
                  <div className="flex gap-3">
                    <i onClick={(e) => shareToNetwork(e, 'facebook', selectedFilm)} className="fa-brands fa-facebook text-[#1877F2] text-2xl cursor-pointer hover:scale-110 transition-transform"></i>
                    <img onClick={(e) => shareToNetwork(e, 'x', selectedFilm)} src="https://img.icons8.com/material-outlined/24/ffffff/twitterx--v1.png" alt="X" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
                    <i onClick={(e) => shareToNetwork(e, 'whatsapp', selectedFilm)} className="fa-brands fa-whatsapp text-[#25D366] text-2xl cursor-pointer hover:scale-110 transition-transform"></i>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{t("direct_link", "Lien Direct")}</p>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 bg-black border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-400 outline-none focus:border-[#246BAD]"
                      value={`${window.location.origin}/films/${selectedFilm.id}`}
                      readOnly
                    />
                    <button
                      onClick={() => copyToClipboard(selectedFilm.id)}
                      className="px-6 py-2 bg-gray-200 hover:bg-white text-black font-extrabold uppercase tracking-widest rounded-xl text-xs transition-colors"
                    >
                      {t("copy", "Copier")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#0F0F0F] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-book-open text-orange-500 text-xl"></i>
                  <h3 className="font-extrabold uppercase tracking-widest text-sm text-orange-500">{t("synopsis", "Synopsis")}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                  {selectedFilm.description || t("no_synopsis", "Aucun synopsis n'a été renseigné pour ce film.")}
                </p>
              </div>
              <div className="bg-[#0F0F0F] border border-gray-800 rounded-2xl p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-microchip text-blue-400 text-xl"></i>
                  <h3 className="font-extrabold uppercase tracking-widest text-sm text-blue-400">{t("tech_stack_title", "Tech Stack & IA")}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                  {(selectedFilm.Files && selectedFilm.Files[0]?.outil_Ai) || t("no_tool", "Aucun outil mentionné.")}
                </p>
                {selectedFilm.Files && selectedFilm.Files[0]?.creativeMethodology && (
                  <div className="mt-4 pt-4 border-t border-gray-800/50 space-y-2">
                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t("methodology", "Méthodologie")}</h4>
                    <p className="text-gray-400 text-sm italic">
                      {selectedFilm.Files[0].creativeMethodology}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex flex-row items-center gap-2 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <span className="text-[#246BAD] text-xl group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <span className="font-bold text-[20px] uppercase text-[#246BAD] tracking-wider group-hover:text-[#3a86d1] transition-colors">
                {t("back_home")}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-extrabold text-[40px] md:text-[64px] leading-tight uppercase text-white">
                {t("title")}
              </h1>
              <p className="font-medium text-[18px] md:text-[20px] text-gray-400 max-w-[780px]">
                {t("subtitle")}
              </p>
            </div>
            {error && (
              <div className="w-full p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 text-center">
                {error}
              </div>
            )}
            <div className="flex flex-wrap gap-[20px] w-full justify-center relative z-20">
              <div className="flex flex-wrap gap-[20px] w-full max-w-[1060px] items-center">
                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  className="flex-1 min-w-[200px] px-[28px] py-[23px] bg-[#0F0F0F] border border-gray-800 rounded-[20px] h-[66px] text-gray-400 focus:border-[#246BAD] focus:outline-none transition-colors"
                  onChange={(e) => {
                    setActiveFilters((prev) => ({ ...prev, search: e.target.value }));
                    setCurrentPage(1);
                  }}
                  value={activeFilters.search}
                />
                {/* FILTRE 1: TYPE D'IA */}
                <div className="relative flex-1 min-w-[200px]">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown("ia");
                    }}
                    className={`flex items-center px-[28px] py-[23px] gap-[10px] bg-[#0F0F0F] border ${openDropdown === "ia" ? "border-[#246BAD]" : "border-gray-800"} rounded-[20px] h-[66px] w-full cursor-pointer hover:border-[#246BAD] transition-colors`}
                  >
                    <span className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">🤖</span>
                    <span className="font-bold text-[16px] text-gray-300 flex-grow">
                      {activeFilters.iaType
                        ? iaOptions.find((o) => o.value === activeFilters.iaType)?.label
                        : t("filter_ia_type")}
                    </span>
                    <span className="text-gray-500">▼</span>
                  </div>
                  {openDropdown === "ia" && (
                    <div className="absolute top-[70px] left-0 w-full bg-[#1A1A1A] border border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                      <div
                        onClick={() => handleFilterClick("iaType", null)}
                        className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-gray-400 hover:text-white transition"
                      >
                        {t("filter_all")}
                      </div>
                      {iaOptions.map((opt) => (
                        <div
                          key={opt.value}
                          onClick={() => handleFilterClick("iaType", opt.value)}
                          className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-white border-t border-gray-800 transition"
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* FILTRE 2: PAYS */}
                <div className="relative flex-1 min-w-[200px]">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown("country");
                    }}
                    className={`flex items-center px-[28px] py-[23px] gap-[10px] bg-[#0F0F0F] border ${openDropdown === "country" ? "border-[#246BAD]" : "border-gray-800"} rounded-[20px] h-[66px] w-full cursor-pointer hover:border-[#246BAD] transition-colors`}
                  >
                    <span className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">🌍</span>
                    <span className="font-bold text-[16px] text-gray-300 flex-grow uppercase">
                      {activeFilters.country
                        ? paysOptions.find((o) => o.value === activeFilters.country)?.label || activeFilters.country
                        : t("filter_country")}
                    </span>
                    <span className="text-gray-500">▼</span>
                  </div>
                  {openDropdown === "country" && (
                    <div className="absolute top-[70px] left-0 w-full bg-[#1A1A1A] border border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                      <div
                        onClick={() => handleFilterClick("country", null)}
                        className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-gray-400 hover:text-white transition"
                      >
                        {t("filter_all")}
                      </div>
                      {paysOptions.map((opt) => (
                        <div
                          key={opt.value}
                          onClick={() => handleFilterClick("country", opt.value)}
                          className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-white border-t border-gray-800 transition uppercase"
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* LOADING & GRILLE */}
            {loading ? (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#246BAD]"></div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-[38px] items-center">
                <div className="flex flex-wrap gap-[40px] justify-center w-full max-w-[1060px]">
                  {paginatedFilms.length === 0 && !error && (
                    <div className="w-full text-center py-10 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                      {t("no_films_found")}
                    </div>
                  )}
                  {paginatedFilms.map((film) => (
                    <FilmCard key={film.id} film={film} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-6 w-full pt-8 pb-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-6 py-3 bg-[#0F0F0F] border border-gray-800 rounded-xl disabled:opacity-30 hover:border-[#246BAD] transition-colors text-white font-bold"
                    >
                      {t("pagination_prev")}
                    </button>
                    <span className="font-medium text-gray-400">
                      {t("pagination_info", { currentPage, totalPages }).split(/<[0-9]+>|<\/[0-9]+>/).map((part, i) => {
                        if (part === currentPage.toString() || part === totalPages.toString()) {
                          return <span key={i} className="text-white">{part}</span>
                        }
                        return part;
                      })}
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-6 py-3 bg-[#0F0F0F] border border-gray-800 rounded-xl disabled:opacity-30 hover:border-[#246BAD] transition-colors text-white font-bold"
                    >
                      {t("pagination_next")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Gallery;