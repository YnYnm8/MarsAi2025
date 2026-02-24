import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Gallery = () => {
  const navigate = useNavigate();

  // ÉTATS
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // État pour les filtres et le tri
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    iaType: null,
    country: null,
    status: null,
    sort: "recent", // 'recent' ou 'topRated'
  });

  // États pour les menus
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeShareId, setActiveShareId] = useState(null);

  // CHARGEMENT DES DONNÉES
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
        setError(
          "Impossible de charger les films. Veuillez réessayer plus tard.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  // --- HELPERS ---
  const getDirectorObj = (film) =>
    film.User || film.user || film.director || {};

  const getDirectorName = (film) => {
    const director = getDirectorObj(film);
    if (director && typeof director === "object") {
      const firstName = director.firstName || "";
      const lastName = director.lastName || "";
      return firstName || lastName
        ? `${firstName} ${lastName}`.trim()
        : "Inconnu";
    }
    if (typeof director === "string") return director;
    return "Inconnu";
  };

  const getPosterUrl = (film) => {
    if (film.Files && film.Files.length > 0 && film.Files[0].poster_url) {
      const url = film.Files[0].poster_url;
      return url.startsWith("http")
        ? url
        : `http://localhost:3000/${url.replace(/\\/g, "/")}`;
    }
    return "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop";
  };

  // --- GESTION DU PARTAGE ---
  const shareToNetwork = async (e, network, film) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/films/${film.id}`;
    const encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(
      `Découvrez le film "${film.title}" généré par IA !`,
    );

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
        await navigator.clipboard.writeText(url);
        alert("Lien du film copié dans le presse-papier !");
        break;
      default:
        break;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer");
    }

    setActiveShareId(null);

    try {
      const response = await fetch(
        `http://localhost:3000/films/share/${film.id}`,
        {
          method: "POST",
        },
      );
      const result = await response.json();

      if (result.success && result.incremented) {
        setFilms((prevFilms) =>
          prevFilms.map((f) =>
            f.id === film.id ? { ...f, shares: result.shares } : f,
          ),
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

  // --- COMPOSANT CARTE FILM ---
  const FilmCard = ({ film }) => (
    <div
      onClick={() => navigate(`/films/${film.id}`)}
      className="flex flex-col items-center w-[318px] rounded-[32px] cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg group relative"
    >
      <div className="relative w-[318px] h-[200px] rounded-t-[32px] overflow-hidden bg-gray-900 border-x border-t border-gray-800 group-hover:border-[#246BAD] transition-colors">
        <img
          src={getPosterUrl(film)}
          alt={film.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />

        <div className="absolute top-[24px] left-[24px] px-[12px] py-[4px] bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
          <span className="font-light text-[10px] uppercase text-white tracking-wide">
            {film.generateAi === "fullAi" ? "FULL AI" : "HYBRID"}
          </span>
        </div>

        <div className="absolute top-[24px] right-[24px] px-[12px] py-[4px] bg-[#246BAD]/80 border border-white/10 rounded-full backdrop-blur-md shadow-md">
          <span className="font-bold text-[10px] uppercase text-white tracking-wide">
            {film.status || "SUBMITTED"}
          </span>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-[#246BAD]/80 group-hover:border-[#246BAD] transition-all">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
        </div>
      </div>

      <div className="flex flex-col items-start p-[24px] gap-[16px] w-[318px] h-auto min-h-[140px] bg-[#0F0F0F] rounded-b-[32px] border-x border-b border-gray-800 group-hover:border-[#246BAD] transition-colors">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="font-['Inter'] font-extrabold text-[18px] uppercase text-white truncate max-w-[180px] group-hover:text-[#246BAD] transition-colors">
            {film.title || "Sans titre"}
          </h3>
          <div className="flex flex-row justify-center items-center px-[8px] py-[6px] bg-[rgba(255,88,69,0.15)] rounded-[4px]">
            <span className="font-['Inter'] font-extrabold text-[10px] uppercase text-[#FF5845]">
              {film.duration ? `${film.duration} MIN` : "N/A"}
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full gap-[12px]">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-[10px] uppercase text-gray-500">
                RÉALISATEUR
              </span>
              <span className="font-bold text-[12px] text-gray-200 truncate max-w-[140px]">
                {getDirectorName(film)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-semibold text-[10px] uppercase text-gray-500">
                ORIGINE
              </span>
              <div className="flex flex-row items-center gap-[6px]">
                <span className="w-[16px] h-[16px] bg-gray-700 rounded-full flex items-center justify-center text-[8px]">
                  🌍
                </span>
                <span className="font-semibold text-[12px] text-gray-200">
                  {getDirectorObj(film).country || "FR"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center pt-3 border-t border-gray-800/60 relative">
            {/* Vues */}
            <div className="flex items-center gap-1.5 text-gray-400 transition-colors">
              <i className="fa-regular fa-eye text-[14px]"></i>
              <span className="font-bold text-[11px]">{film.views || 0}</span>
            </div>

            {/* Partages */}
            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveShareId(activeShareId === film.id ? null : film.id);
                }}
                className={`flex items-center gap-1.5 p-1 -ml-1 rounded-md cursor-pointer transition-colors ${activeShareId === film.id ? "text-white bg-gray-800" : "text-gray-400 hover:text-[#246BAD]"}`}
              >
                <i className="fa-solid fa-share text-[14px]"></i>
                <span className="font-bold text-[11px]">
                  {film.shares || 0}
                </span>
              </div>

              {/* MENU DE PARTAGE MODERNE EN GRILLE */}
              {activeShareId === film.id && (
                <div
                  className="absolute bottom-full left-0 mb-2 w-56 bg-[#2C2C2D] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden p-2 grid grid-cols-2 gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={(e) => shareToNetwork(e, "facebook", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors">
                    <i className="fa-brands fa-facebook text-[#1877F2] text-[16px] w-4 text-center"></i> Facebook
                  </button>
                  <button onClick={(e) => shareToNetwork(e, "x", film)} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-800 rounded-lg text-xs text-gray-300 transition-colors">
                    <img width="16" height="16" src="https://img.icons8.com/material-outlined/24/ffffff/twitterx--v1.png" alt="X"/> X
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
                    <i className="fa-solid fa-link text-gray-400 text-[14px] w-4 text-center"></i> Lien
                  </button>
                </div>
              )}
            </div>

            {/* Note Moyenne (Affichée uniquement si > 0) */}
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

  // --- OPTIONS DE FILTRES ---
  const uniqueCountries = [
    ...new Set(films.map((f) => getDirectorObj(f).country).filter(Boolean)),
  ];
  const uniqueStatuses = [
    ...new Set(films.map((f) => f.status).filter(Boolean)),
  ];
  const iaOptions = [
    { label: "Full AI", value: "fullAi" },
    { label: "Hybrid", value: "hybrid" },
  ];
  const sortOptions = [
    { label: "Plus récents", value: "recent" },
    { label: "Mieux notés", value: "topRated" },
  ];

  // --- LOGIQUE DE FILTRAGE ET TRI ---
  let processedFilms = films.filter((film) => {
    if (activeFilters.search) {
      const searchTerm = activeFilters.search.toLowerCase().trim();
      const title = (film.title || "").toLowerCase();
      const director = getDirectorName(film).toLowerCase();
      if (!title.includes(searchTerm) && !director.includes(searchTerm))
        return false;
    }
    if (activeFilters.iaType && film.generateAi !== activeFilters.iaType)
      return false;
    if (
      activeFilters.country &&
      getDirectorObj(film).country !== activeFilters.country
    )
      return false;
    if (activeFilters.status && film.status !== activeFilters.status)
      return false;
    return true;
  });

  // Appliquer le tri (Top Rated ou Récents)
  processedFilms.sort((a, b) => {
    if (activeFilters.sort === "topRated") {
      const scoreA = a.averageScore || 0;
      const scoreB = b.averageScore || 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      // Départager par le nombre de vues en cas d'égalité de note
      return (b.views || 0) - (a.views || 0);
    }
    // Par défaut (récents) : on suppose que le plus grand ID est le plus récent
    return b.id - a.id;
  });

  // --- LOGIQUE DE PAGINATION ---
  const totalPages = Math.ceil(processedFilms.length / itemsPerPage);
  const paginatedFilms = processedFilms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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
        <div
          className="flex flex-row items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <span className="text-[#246BAD] text-xl group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="font-bold text-[20px] uppercase text-[#246BAD] tracking-wider group-hover:text-[#3a86d1] transition-colors">
            RETOUR ACCUEIL
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-extrabold text-[40px] md:text-[64px] leading-tight uppercase text-white">
            LA GALERIE DES FILMS
          </h1>
          <p className="font-medium text-[18px] md:text-[20px] text-gray-400 max-w-[780px]">
            Explorez l'intégralité de la sélection officielle. Des visions
            uniques, des courts-métrages pionniers créés avec l'Intelligence
            Artificielle.
          </p>
        </div>

        {error && (
          <div className="w-full p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 text-center">
            {error}
          </div>
        )}

        {/* BARRE DE RECHERCHES & FILTRES */}
        <div className="flex flex-wrap gap-[20px] md:gap-[38px] w-full relative z-20">
          <input
            type="text"
            placeholder="Rechercher par titre, réalisateur..."
            className="flex-grow md:flex-grow-0 min-w-[300px] px-[28px] py-[23px] bg-[#0F0F0F] border border-gray-800 rounded-[20px] h-[66px] text-gray-400 focus:border-[#246BAD] focus:outline-none transition-colors"
            onChange={(e) => {
              setActiveFilters((prev) => ({ ...prev, search: e.target.value }));
              setCurrentPage(1);
            }}
            value={activeFilters.search}
          />

          <div className="flex flex-wrap gap-[20px] md:gap-[38px] w-full relative z-20">
            {/* FILTRE 1: TYPE D'IA */}
            <div className="relative flex-grow md:flex-grow-0">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("ia");
                }}
                className={`flex items-center px-[28px] py-[23px] gap-[10px] bg-[#0F0F0F] border ${openDropdown === "ia" ? "border-[#246BAD]" : "border-gray-800"} rounded-[20px] h-[66px] min-w-[300px] cursor-pointer hover:border-[#246BAD] transition-colors`}
              >
                <span className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">
                  🤖
                </span>
                <span className="font-bold text-[16px] text-gray-300 flex-grow">
                  {activeFilters.iaType
                    ? iaOptions.find((o) => o.value === activeFilters.iaType)
                        ?.label
                    : "Type d'IA"}
                </span>
                <span className="text-gray-500">▼</span>
              </div>
              {openDropdown === "ia" && (
                <div className="absolute top-[70px] left-0 w-full bg-[#1A1A1A] border border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div
                    onClick={() => handleFilterClick("iaType", null)}
                    className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-gray-400 hover:text-white transition"
                  >
                    Tout voir
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
            <div className="relative flex-grow md:flex-grow-0">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("country");
                }}
                className={`flex items-center px-[28px] py-[23px] gap-[10px] bg-[#0F0F0F] border ${openDropdown === "country" ? "border-[#246BAD]" : "border-gray-800"} rounded-[20px] h-[66px] min-w-[300px] cursor-pointer hover:border-[#246BAD] transition-colors`}
              >
                <span className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">
                  🌍
                </span>
                <span className="font-bold text-[16px] text-gray-300 flex-grow">
                  {activeFilters.country || "Pays d'origine"}
                </span>
                <span className="text-gray-500">▼</span>
              </div>
              {openDropdown === "country" && (
                <div className="absolute top-[70px] left-0 w-full bg-[#1A1A1A] border border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50 max-h-[300px] overflow-y-auto">
                  <div
                    onClick={() => handleFilterClick("country", null)}
                    className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-gray-400 hover:text-white transition"
                  >
                    Tout voir
                  </div>
                  {uniqueCountries.map((c) => (
                    <div
                      key={c}
                      onClick={() => handleFilterClick("country", c)}
                      className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-white border-t border-gray-800 transition"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FILTRE 3: STATUT */}
            <div className="relative flex-grow md:flex-grow-0">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("status");
                }}
                className={`flex items-center px-[28px] py-[23px] gap-[10px] bg-[#0F0F0F] border ${openDropdown === "status" ? "border-[#246BAD]" : "border-gray-800"} rounded-[20px] h-[66px] min-w-[300px] cursor-pointer hover:border-[#246BAD] transition-colors`}
              >
                <span className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">
                  📌
                </span>
                <span className="font-bold text-[16px] text-gray-300 flex-grow uppercase">
                  {activeFilters.status || "Statut"}
                </span>
                <span className="text-gray-500">▼</span>
              </div>
              {openDropdown === "status" && (
                <div className="absolute top-[70px] left-0 w-full bg-[#1A1A1A] border border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div
                    onClick={() => handleFilterClick("status", null)}
                    className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-gray-400 hover:text-white transition"
                  >
                    Tout voir
                  </div>
                  {uniqueStatuses.map((s) => (
                    <div
                      key={s}
                      onClick={() => handleFilterClick("status", s)}
                      className="px-6 py-3 hover:bg-[#246BAD] cursor-pointer text-white border-t border-gray-800 transition uppercase"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FILTRE 4: TRIER PAR */}
            <div className="relative flex-grow md:flex-grow-0">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown("sort");
                }}
                className={`flex items-center px-[28px] py-[23px] gap-[10px] bg-[#0F0F0F] border ${openDropdown === "sort" ? "border-[#246BAD]" : "border-gray-800"} rounded-[20px] h-[66px] min-w-[300px] cursor-pointer hover:border-[#246BAD] transition-colors`}
              >
                <span className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">
                  ⭐
                </span>
                <span className="font-bold text-[16px] text-gray-300 flex-grow">
                  {sortOptions.find((o) => o.value === activeFilters.sort)
                    ?.label || "Trier par"}
                </span>
                <span className="text-gray-500">▼</span>
              </div>
              {openDropdown === "sort" && (
                <div className="absolute top-[70px] left-0 w-full bg-[#1A1A1A] border border-gray-700 rounded-2xl shadow-xl overflow-hidden z-50">
                  {sortOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => handleFilterClick("sort", opt.value)}
                      className={`px-6 py-3 cursor-pointer text-white border-b border-gray-800 transition ${activeFilters.sort === opt.value ? "bg-[#246BAD]" : "hover:bg-gray-800"}`}
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
          <div className="w-full flex flex-col gap-[38px]">
            <div className="flex flex-wrap gap-[24px] justify-center md:justify-start w-full">
              {paginatedFilms.length === 0 && !error && (
                <div className="w-full text-center py-10 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                  Aucun film ne correspond à vos critères.
                </div>
              )}
              {paginatedFilms.map((film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 w-full pt-8 pb-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-6 py-3 bg-[#0F0F0F] border border-gray-800 rounded-xl disabled:opacity-30 hover:border-[#246BAD] transition-colors text-white font-bold"
                >
                  Précédent
                </button>
                <span className="font-medium text-gray-400">
                  Page <span className="text-white">{currentPage}</span> sur{" "}
                  <span className="text-white">{totalPages}</span>
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 bg-[#0F0F0F] border border-gray-800 rounded-xl disabled:opacity-30 hover:border-[#246BAD] transition-colors text-white font-bold"
                >
                  Suivant
                </button>
              </div>
            )}
          </div>
        )}
      </div>
 
    </div>
  );
};

export default Gallery;