import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComiteProfile() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [filter, setFilter] = useState("NOT_WATCHED");
  const [playlists, setPlaylist] = useState([]);

  const user = {
    name: "PAUL MICHEL",
    avatar: "https://via.placeholder.com/40"
  };

  useEffect(() => {
    fetchFilmAndPlaylists();
  }, []);

  const fetchFilmAndPlaylists = async () => {
    try {
      const filmRes = await fetch("http://localhost:3000/films");
      if (!filmRes.ok) throw new Error("Failed to fetch film data");
      const filmsData = await filmRes.json();
      
      const playlistRes = await fetch("http://localhost:3000/comite/allplaylists");
      if (!playlistRes.ok) throw new Error("Failed to fetch playlists");
      const playlistsData = await playlistRes.json();
   
      const playlistsWithName = playlistsData.map(p => ({
        ...p,
        name: p.name || p.status || "Sans nom",
        filmCount: 0
      }));
      
      const filmsWithStatus = filmsData.map(film => {
        if (!film.PlaylistFilms || film.PlaylistFilms.length === 0) {
          return { ...film, status: "NOT_WATCHED", playlistName: "なし" };
        }
        
        const latestPlaylistFilm = film.PlaylistFilms[film.PlaylistFilms.length - 1];
        const playlistObj = playlistsData.find(p => p.id === latestPlaylistFilm.PlaylistId);
       
        
        return {
          ...film,
          status: playlistObj?.status || "NOT_WATCHED",
          playlistName: playlistObj?.name || "なし",
        };
      });

      setFilms(filmsWithStatus);
      setPlaylist(playlistsWithName);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredFilms = films.filter(film => film.status === filter);

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* 左側：ユーザー情報 */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        {/* <img src={user.avatar} className="rounded-full w-10 h-10" /> */}
        <span className="font-semibold">{films[0]?.User?.firstName}</span>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-10 overflow-y-auto">

        <h1 className="text-2xl font-bold mb-6">
          COMITE - MES ÉVALUATIONS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFilms.map(film => (
            <div
              key={film.id}
              className="bg-gray-800 rounded-xl p-4 shadow"
            >
              <img
                src={film.Files[0]?.poster_url}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-bold">{film.title}</h2>
              <p className="text-sm text-gray-400">
                Score : {film.NoteDirect?.[0]?.score ?? 0}/10
              </p>
              <p className="text-sm mt-1">{film.NoteDirect?.[0]?.comment ??"Nocomment"}</p>
            </div>
          ))}
        </div>

        {/* 戻るボタン */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/comite/note")}
            className="bg-blue-600 px-6 py-2 rounded-lg font-semibold"
          >
            ← RETOUR À L'ÉVALUATION
          </button>
        </div>
      </div>

      {/* 右サイドバー */}
      <aside className="w-64 bg-gray-900 p-6 border-l border-gray-700">
        <h2 className="font-bold mb-4">FILTER</h2>

        {["NOT_WATCHED", "ACCEPTED", "REFUSED", "TO_DISCUSS"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`block w-full text-left px-4 py-2 rounded mb-2 ${filter === status
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            {status}
          </button>
        ))}
      </aside>

    </div>
  );
}