import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ListFilms from "./ListFilms";
import { FilmComponent } from "../../components/film";
import { useNavigate } from "react-router-dom";


export default function Note() {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filter, setFilter] = useState("NOT_WATCHED");
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // const [selectedPlaylist, setSelectedPlaylist] = useState("");

  // データ取得
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

  useEffect(() => {
    fetchFilmAndPlaylists();
  }, [id]);

  useEffect(() => {
    if (!films.length) return;
    const firstFilm = films.find(film => film.status === filter);
    setSelectedFilm(firstFilm || films[0]);
  }, [filter, films]);

  const playlistsWithCounts = useMemo(() => {
    if (!playlist.length) return [];
    return playlist.map(p => {
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
  }, [films, playlist]);

  const handleSavereview = async (clickedStatus) => {
    if (!selectedFilm) return alert("No film selected!");
    if (!value || value < 1) return alert("Please note your film!");
    if (!clickedStatus) return alert("Please select ACCEPTED, REFUSED or TO_DISCUSS");

    try {
      //  レビューを登録
      const reviewResponse = await fetch(
        `http://localhost:3000/comite/review/${selectedFilm.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserId: 3,
            score: value,
            comment: comment,
            status: clickedStatus,
          }),
        }
      );

      if (!reviewResponse.ok) {
        const errorData = await reviewResponse.json();
        throw new Error(errorData.message || "Failed to save review");
      }

      await reviewResponse.json();

      // // ACCEPTEDなら公式セレクションに登録
      // if (clickedStatus === "ACCEPTED") {
      //   const selectionResponse = await fetch("http://localhost:3000/comite/select", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ UserId: 3 }), // 必要に応じてログインユーザーID
      //   });

      //   if (!selectionResponse.ok) {
      //     const errorData = await selectionResponse.json();
      //     throw new Error(errorData.message || "公式セレクションの登録に失敗しました");
      //   }

      //   const selectionData = await selectionResponse.json();
      //   console.log("公式セレクション登録成功:", selectionData);
      //   alert("公式セレクションに登録しました！");
      // }

      // UI更新
      await fetchFilmAndPlaylists();
      setComment("");
      setValue(0);
      setStatus(null);

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return alert("Please enter a name for the list");

    try {
      const response = await fetch("http://localhost:3000/comite/create/playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newListName,
          UserId: 4,
          FilmId: selectedFilm ? selectedFilm.id : null,
        }),
      });
      if (!response.ok) throw new Error("Failed to create playlist");

      await response.json();
      await fetchFilmAndPlaylists();
      setShowModal(false);
      setNewListName("");

    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Error creating playlist");
    }
  };

  const handleAddToPlaylistWithNote = async (playlistId) => {
    if (!selectedFilm) return alert("No film selected!");

    try {
      const playlistResponse = await fetch("http://localhost:3000/comite/film/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 3,
          FilmId: selectedFilm.id,
          targetPlaylistId: playlistId,
        }),
      });
      if (!playlistResponse.ok) throw new Error("Failed to add film to playlist");
      await playlistResponse.json();

      const noteResponse = await fetch("http://localhost:3000/comite/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 3,
          FilmId: selectedFilm.id,
          score: value,
          comment: comment,
        }),
      });
      if (!noteResponse.ok) throw new Error("Fail to add your note to the film");
      await noteResponse.json();

      await fetchFilmAndPlaylists();
      setValue(0);

    } catch (error) {
      console.error("Error adding film to playlist:", error);
      alert("Error adding film to playlist");
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    if (!playlistId) return alert("No playlist selected to delete!");

    try {
      const response = await fetch("http://localhost:3000/comite/deletestatus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 3,               // ログインユーザーID
          targetPlaylistId: playlistId, // 修正済み
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete playlist");
      }

      await response.json();
      await fetchFilmAndPlaylists();
      alert("Playlist deleted successfully!");

    } catch (error) {
      console.error("Error deleting playlist", error);
      alert("Error deleting playlist: " + error.message);
    }
  };
  const filteredFilms = useMemo(() => {
    if (!searchTerm.trim()) return films;

    const lowerSearch = searchTerm.toLowerCase();

    return films.filter((film) => {
      const matchTitle = film.title?.toLowerCase().includes(lowerSearch);
      const matchId = film.id?.toString().includes(lowerSearch);
      return matchTitle || matchId;
    });
  }, [films, searchTerm]);
  const handleSaveComment = async () => {
  if (!selectedFilm) return alert("Aucun film sélectionné !");
  if (!comment.trim()) return alert("Veuillez entrer un commentaire.");

  try {
    const response = await fetch(`http://localhost:3000/comite/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserId: 3,             // ログインユーザーID
        FilmId: selectedFilm.id,
        score: value || null,  // スコアは空でもOKにする
        comment: comment,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'enregistrement du commentaire");
    }

    await response.json();
    alert("Commentaire enregistré !");
    setComment("");  // 入力欄をクリア
    await fetchFilmAndPlaylists(); // UIを更新

  } catch (error) {
    console.error(error);
    alert("Erreur: " + error.message);
  }
};


  return (
    <div className="flex flex-col h-screen bg-black font-sans">
      <button
        onClick={() => navigate("/comiteprofile")}
        className="bg-purple-600 px-6 py-2 rounded-lg font-semibold"
      >
        VOIR MES ÉVALUATIONS
      </button>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-black border-b md:border-b-0 md:border-r overflow-y-auto">
          <div className="p-4">
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>

          {/* フィルター */}
          {playlistsWithCounts.map((p) => (
            <button
              key={p.id}
              onClick={() => setFilter(p.status)}
              className={`px-3 py-1 rounded-md transition ${filter === p.status ? "bg-[#246BAD] text-white" : "bg-gray-800 text-white"
                }`}
            >
              {p.status} ({p.filmCount})
            </button>
          ))}

          {/* 映画リスト */}
          <ListFilms
            films={films}
            filter={filter}
            searchTerm={searchTerm}
            setSelectedFilm={setSelectedFilm} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* タイトル */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-bg-red-600">
              PRÊT POUR LES <br /> DÉLIBÉRATIONS ?
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sélectionnez un film dans la liste à gauche
            </p>
            <div className="mt-2 flex flex-col md:flex-row justify-center gap-2 md:gap-6 text-sm">
              <span className="font-bold">{films.filter(f => f.status === "NOT_WATCHED").length}</span>
              <span className="text-gray-500">FILM A NOTER</span>
              <span className="text-[#FF5845] font-semibold">15 JUIN 2026</span>
              <span className="text-gray-500">CLUTURE</span>
            </div>
          </div>

          {/* Video Card */}
          <div className="max-w-3xl mx-auto p-4 md:p-6 mb-6">
            {selectedFilm?.Files?.[0]?.film_url ? (
              <video
                src={selectedFilm.Files[0].film_url}
                controls
                className="w-full rounded-lg"
              />
            ) : (
              <img
                src={selectedFilm?.Files?.[0]?.poster_url || "/youtubeimg.webp"}
                alt={selectedFilm?.title || "Film Poster"}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
          </div>

          {/* タイトル・監督 */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#246BAD]">
                {selectedFilm?.title || "SYNTHETICA : title"}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedFilm?.director || "Director · France"}
              </p>
            </div>
            <div className="text-xl font-bold mt-2 md:mt-0">
              {value}
              <span className="text-sm">/10</span>
            </div>
          </div>

          {/* スライダー */}
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-blue-600 mb-4"
          />

          {/* スライダー下の数字 */}
          <div className="flex justify-between text-sm font-medium mb-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <span
                key={num}
                className={`${num === value ? "text-blue-600 font-bold" : "text-gray-400"}`}
              >
                {num}
              </span>
            ))}
          </div>

          {/* コメント欄 */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-[#246BAD] mb-4">
              Commentaire (optionnel)
            </label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm text-gray-200 bg-gray-800 placeholder-gray-400"
              placeholder="Ajouter un commentaire sur le film..."
            />
            <button
              onClick={handleSaveComment}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mt-2"
            >
              Enregistrer le commentaire
            </button>

          </div>

          {/* 選択・リストボタン */}
          <div className="bg-gray-800 rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
            <span className="flex items-center gap-2 text-white font-semibold">
              <svg
                className="w-6 h-6 text-[#FF5845]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              SÉLECTIONNER OU TRIER
            </span>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              {(!value || value < 1) && <span className="text-white text-sm">PLEASE NOTE BEFORE</span>}

              <button
                onClick={() => handleSavereview("ACCEPTED")}
                disabled={!value || value < 1}
                className={`bg-[#246BAD] text-white rounded-lg px-6 py-2 text-sm font-semibold ${!value || value < 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                ACCEPTED
              </button>

              <button
                onClick={() => handleSavereview("REFUSED")}
                disabled={!value || value < 1}
                className={`bg-[#FF5845] text-white rounded-lg px-6 py-2 text-sm font-semibold ${!value || value < 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                REFUSED
              </button>

              <button
                onClick={() => handleSavereview("TO_DISCUSS")}
                disabled={!value || value < 1}
                className={`bg-green-300 text-white rounded-lg px-6 py-2 text-sm font-semibold ${!value || value < 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                TO_DISCUSS
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="bg-gray-900 text-white rounded-lg px-6 py-2 text-sm font-semibold"
              >
                + CREATE YOUR PLAYLIST
              </button>
            </div>
          </div>

          {/* 自作プレイリスト */}
          <div className="bg-gray-800 rounded-xl shadow p-4 mt-4">
            <span className="flex items-center gap-2 text-white font-semibold mb-2">
              <svg
                className="w-6 h-6 text-[#FF5845]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              YOUR ORIGINAL PLAYLIST
            </span>

            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 justify-end">
              {playlist.slice(4).map((p) => (
                <div key={p.id} className="flex gap-2 items-center">
                  <button
                    onClick={() => handleAddToPlaylistWithNote(p.id)}
                    disabled={!value || value < 1}
                    className={`bg-[#FF5845] text-white px-4 py-2 rounded-lg text-sm font-semibold ${!value || value < 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {p.status}
                  </button>

                  <button
                    onClick={() => handleDeletePlaylist(p.id)}
                    className="bg-gray-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-gray-800"
                  >
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* モーダル */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Créer une nouvelle liste</h2>
              <input
                type="text"
                placeholder="Nom de la liste"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm font-semibold"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    handleCreateList();
                    setShowModal(false);
                    setNewListName("");
                  }}
                  className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}