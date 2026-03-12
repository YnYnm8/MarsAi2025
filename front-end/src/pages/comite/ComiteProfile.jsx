import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { VITE_API_URL_FRONTEND } from "../../services/config";
export default function ComiteProfile() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [filter, setFilter] = useState("NOT_WATCHED");
  const [playlists, setPlaylist] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




  useEffect(() => {
    fetchFilmAndPlaylists();
  }, []);

  const fetchFilmAndPlaylists = async () => {
    try {
      const filmRes = await fetch(`${VITE_API_URL_FRONTEND}/films`);
      if (!filmRes.ok) throw new Error("Failed to fetch film data");
      const filmsData = await filmRes.json();

      const playlistRes = await fetch(`${VITE_API_URL_FRONTEND}/comite/allplaylistsbyuserid`, {
        credentials: "include",
      });
      if (!playlistRes.ok) throw new Error("Failed to fetch playlists");
      const playlistsData = await playlistRes.json();

      const playlistsWithName = playlistsData.map(p => ({
        ...p,
        name: p.name || p.status || "Sans nom",
        filmCount: 0
      }));

      const filmsWithStatus = filmsData.map(film => {
        if (!film.PlaylistFilms || film.PlaylistFilms.length === 0) {
          return { ...film, status: "NOT_WATCHED", playlistName: "Pas de  name" };
        }

        const latestPlaylistFilm = film.PlaylistFilms[film.PlaylistFilms.length - 1];
        const playlistObj = playlistsData.find(p => p.id === latestPlaylistFilm.PlaylistId);


        return {
          ...film,
          status: playlistObj?.status || "NOT_WATCHED",
          playlistName: playlistObj?.name || "pas de nom",
        };
      });

      setFilms(filmsWithStatus);
      setPlaylist(playlistsWithName);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredFilms = films.filter(film => film.status === filter);

  const customPlaylists = playlists.filter(
    (p) => !["NOT_WATCHED", "selected", "rejected", "pending"].includes(p.status)
  );


  const playlistsWithCounts = useMemo(() => {
    if (!playlists.length) return [];
    return playlists.map((p) => {
      let count;
      if (p.status === "NOT_WATCHED") {
        count = films.filter(film => film.status === "NOT_WATCHED").length;
      } else {
        count = films.filter(film =>
          film.PlaylistFilms?.some(pf => pf.PlaylistId === p.id)
        ).length;
      }
      return { ...p, filmCount: count };
    });
  }, [films, playlists]);

  return (
    <div className="flex min-h-screen bg-black text-white">


      {/* 左側：ユーザー情報 */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        {/* <img src={user.avatar} className="rounded-full w-10 h-10" /> */}
        <span className="font-semibold">{films[0]?.User?.firstName}</span>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-10 overflow-y-auto">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden bg-white text-black px-3 py-1 rounded mb-3"
        >
          Accéder aux listes
        </button>

        <h1 className="text-2xl font-bold mb-6">
          COMITE - MES ÉVALUATIONS
        </h1>
        {/* 戻るボタン */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/comite/note")}
            className="text-white px-6 py-2 rounded-lg font-semibold"
          >
            ← RETOUR À L'ÉVALUATION
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFilms.map(film => (
            console.log(film),
            <div
              key={film.id}
              className="bg-gray-800 rounded-xl p-4 shadow"
            >
              <img
                src={
                  film.Files?.[0]?.poster_url
                    ? (film.Files[0].poster_url.startsWith('http')
                      ? film.Files[0].poster_url
                      : `${VITE_API_URL_FRONTEND}${film.Files[0].poster_url}`)
                    : `${VITE_API_URL_FRONTEND}/uploads/youtubeimg.webp`
                }
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-bold">{film.title}</h2>
              Score : {film.NotesDirect?.[0]?.score ?? 0}/10
              <p>{film.NotesDirect?.[0]?.comment ?? "Pas de comment"}</p>
            </div>
          ))}
        </div>

        {/* 戻るボタン */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/comite/note")}
            className="text-white px-6 py-2 rounded-lg font-semibold"
          >
            ← RETOUR À L'ÉVALUATION
          </button>
        </div>
      </div>


      {/* 右サイドバー */}
      {/* PC用 */}
      <aside className="hidden md:block w-64 bg-gray-900 p-6 border-l border-gray-700">
        <h2 className="font-bold mb-4">VOTRE LIST</h2>
        {playlistsWithCounts.map((p) => (
          <button
            key={p.id}
            onClick={() => setFilter(p.status)}
            className={`block w-full text-left px-4 py-2 rounded mb-2 ${filter === p.status ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            {p.name} ({p.filmCount})
          </button>
        ))}
      </aside>

      {/* モバイル用 */}
      {mobileMenuOpen && (
        <aside className="fixed inset-0 bg-black/50 z-40">
          <div className="absolute top-0 left-0 w-64 h-full z-100 bg-gray-900 p-6 shadow-lg">
            <button
              className="mb-4 px-2 py-1 bg-gray-700 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕ Fermer
            </button>
            <h2 className="font-bold mb-4">VOTRE LIST</h2>
            {playlistsWithCounts.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setFilter(p.status);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded mb-2 ${filter === p.status ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                  }`}
              >
                {p.name} ({p.filmCount})
              </button>
            ))}
          </div>
        </aside>
      )}

    </div>
  );
}