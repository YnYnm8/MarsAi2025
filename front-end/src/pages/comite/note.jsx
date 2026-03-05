import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ListFilms from "../comite/ListFilms";
import { FilmComponent } from "../../components/film";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { faTrash ,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [showComment, setShowComment] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  // データ取得
  const fetchFilmAndPlaylists = async () => {
    try {
      const filmRes = await fetch("http://localhost:3004/films");
      if (!filmRes.ok) throw new Error("Failed to fetch film data");
      const filmsData = await filmRes.json();

      const playlistRes = await fetch("http://localhost:3004/comite/allplaylists");
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
    if (!clickedStatus) return alert("Please select selected, rejected or pending");

    try {
      //  レビューを登録
      const reviewResponse = await fetch(
        `http://localhost:3004/comite/review/${selectedFilm.id}`,
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



      // UI更新
      await fetchFilmAndPlaylists();
      setComment("");
      setValue(0);
      setStatus(null);
      setShowComment(false);

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return alert("Please enter a name for the list");

    try {
      const response = await fetch("http://localhost:3004/comite/create/playlist", {
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
      const playlistResponse = await fetch("http://localhost:3004/comite/film/list", {
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

      const noteResponse = await fetch("http://localhost:3004/comite/note", {
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
      setComment("");
      setShowComment(false);

    } catch (error) {
      console.error("Error adding film to playlist:", error);
      // alert("Error adding film to playlist");
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    if (!playlistId) return alert("No playlist selected to delete!");

    try {
      const response = await fetch("http://localhost:3004/comite/deletestatus", {
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
      const response = await fetch(`http://localhost:3004/comite/note`, {
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
      // alert("Commentaire enregistré !");
      setComment("");
      setShowComment(false);
      await fetchFilmAndPlaylists(); // UIを更新

    } catch (error) {
      console.error(error);
      alert("Erreur: " + error.message);
    }
  };

  const videoRef = useRef(null);

  const setSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };


  return (
    <div className="flex flex-col h-screen bg-black font-sans">

      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden text-white px-3 py-1 rounded mb-3 self-start"
      >
       <FontAwesomeIcon icon={faArrowLeft} />
        Accéder aux listes
      </button>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        <aside className={`fixed md:static  overflow-y-scroll z-100  top-0 left-0 h-full w-72 bg-black transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
  `}>
          {/* 上部のアクションボタン */}
          <button
            onClick={() => navigate("/comite/profile")}
            className="flex-row bg-white text-black px-4 py-1 rounded-md font-semibold text-sm hover:bg-gray-100 transition"
          >
            VOIR MES ÉVALUATIONS
          </button>
          {/* モバイルだけ表示する閉じるボタン */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden flex-end text-white bg-[#FF5845] px-2 py-1 rounded hover:bg-gray-700 ml-2"
          >
            ✕
          </button>

          {/* 検索ボックス */}
          <input
            type="text"
            placeholder="Le nom d'un film ou l'id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* フィルター */}
          <div className="flex flex-col gap-2 mt-2">
            {playlistsWithCounts.map((p) => (
              <div key={p.id} className="flex justify-between items-center">
                <button
                  onClick={() => setFilter(p.status)}
                  className={`flex-1 text-left px-3 py-2 rounded-md text-sm font-medium transition 
        ${filter === p.status ? "bg-[#246BAD] text-white" : "bg-gray-800 text-gray-200 hover:bg-gray-700"}`}
                >
                  {p.status} ({p.filmCount})
                </button>

              </div>
            ))}
          </div>

          {/* 映画リスト */}
          <ListFilms
            films={films}
            filter={filter}
            searchTerm={searchTerm}
            selectedFilm={selectedFilm}
            setSelectedFilm={setSelectedFilm}
          />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-white mb-4"
          >
            ✕ Close
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* タイトル */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-bg-red-600 ">
              PRÊT POUR LES <br /> DÉLIBÉRATIONS ?
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Sélectionnez un film dans la liste à gauche
            </p>
            <div className="mt-2 flex flex-col md:flex-row justify-center gap-2 md:gap-6 text-sm">
              <span className="font-bold">{films.filter(f => f.status === "NOT_WATCHED").length}</span>
              <span className="text-gray-500 font-semibold">FILM A NOTER</span>
              <span className="text-[#FF5845] font-semibold">15 JUIN 2026</span>
              <span className="text-gray-500 font-semibold">CLUTURE</span>
            </div>
          </div>

          {/* Video Card */}
          <div className="max-w-5xl mx-auto p-4 md:p-6 mb-6">
            {selectedFilm?.Files?.[0]?.film_url ? (
              <>
                {/* YOUTUBE O LOCAL */}
                {selectedFilm.Files[0].film_url.includes("youtube.com") || selectedFilm.Files[0].film_url.includes("youtu.be") ? (
                  <div className="aspect-video w-full">
                    <iframe
                      src={selectedFilm.Files[0].film_url.replace("watch?v=", "embed/")}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      key={selectedFilm.Files[0].film_url}
                      src={selectedFilm.Files[0].film_url.startsWith('http') ? selectedFilm.Files[0].film_url : `http://localhost:3004${selectedFilm.Files[0].film_url}`}
                      poster={selectedFilm.Files[0].poster_url?.startsWith('http') ? selectedFilm.Files[0].poster_url : `http://localhost:3004${selectedFilm.Files[0].poster_url}`}
                      controls
                      className="w-full rounded-lg"
                    />

                    <div className="mt-3 flex gap-3 left-3 up-10">
                      <button
                        onClick={() => setSpeed(1)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        1x
                      </button>
                      <button
                        onClick={() => setSpeed(1.5)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        1.5x
                      </button>
                      <button
                        onClick={() => setSpeed(2)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                      >
                        2x
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <img
                src={selectedFilm?.Files?.[0]?.poster_url?.startsWith('http')
                  ? selectedFilm.Files[0].poster_url
                  : `http://localhost:3004${selectedFilm?.Files?.[0]?.poster_url || "/uploads/youtubeimg.webp"}`}
                alt={selectedFilm?.title || "Film Poster"}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
          </div>

          {/* タイトル・監督 */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#246BAD]">
                Le Nom de Film : {selectedFilm?.title || "SYNTHETICA : title"}
              </h2>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                <span className="font-semibold">
                  Directeur :{selectedFilm?.User?.firstName || "Director "} {selectedFilm?.User?.lastName || ""}
                </span>
              </div>
              <p className="text-sm text-gray-600 font-semibold">
                Origin :{selectedFilm?.User?.country || "Country "}
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
          <div className="mb-6">
            <button
              onClick={() => setShowComment(!showComment)}
              className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
            >
              Ajouter un commentaire
            </button>
            {showComment && (
              <div className="relative">
                <textarea
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-xl bg-[#0f172a] border border-gray-600 px-4 py-3 pr-32 text-sm focus:outline-none focus:ring-2 focus:ring-[#246BAD] transition"
                  placeholder="Ajouter un commentaire sur le film..."
                />

                <button
                  onClick={handleSaveComment}
                  className="absolute bottom-15 right-10 bg-[#246BAD] hover:bg-[#FF5845] text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition"
                >
                  Enregistrer
                </button>
                <span className="text-xm text-[#FF5845] ">
                  "Enregistrer" → commentaire seulement. Pour valider le Film  utilisez  les boutons de SÉLECTIONNER.
                </span>
              </div>
            )}
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

            <div className="flex flex-col items-center gap-4 w-full">
              {/* 注意文 */}
              {(!value || value < 1) && (
                <span className="text-center text-white text-sm font-medium">
                  PLEASE NOTE BEFORE
                </span>
              )}

              {/* 横並びのボタン */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleSavereview("selected")}
                  disabled={!value || value < 1}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${!value || value < 1
                    ? "bg-blue-800/50 cursor-not-allowed"
                    : "bg-blue-800 hover:bg-blue-700"
                    }`}
                >
                  SELECTED
                </button>

                <button
                  onClick={() => handleSavereview("rejected")}
                  disabled={!value || value < 1}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${!value || value < 1
                    ? "bg-blue-600/50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                    }`}
                >
                  REJECTED
                </button>

                <button
                  onClick={() => handleSavereview("pending")}
                  disabled={!value || value < 1}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors ${!value || value < 1
                    ? "bg-blue-400/50 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-300"
                    }`}
                >
                  PENDING
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gray-900 text-white rounded-lg px-6 py-2 text-sm font-semibold"
                >
                  + CREATE YOUR PLAYLIST
                </button>

                {/* 自作プレイリスト */}


                <div className="flex flex-col md:flex">
                  {playlist.slice(4).map((p) => (
                    <div key={p.id} className="flex gap-2 items-center">
                      <button
                        onClick={() => handleAddToPlaylistWithNote(p.id)}
                        disabled={!value || value < 1}
                        className={`bg-[#246BAD] text-white px-4 py-2 rounded-lg text-sm font-semibold ${!value || value < 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                      >
                        {p.status}
                      </button>

                      <button
                        onClick={() => handleDeletePlaylist(p.id)}
                        className="flex-1 px-4 bg-gray-600 text-shadow-red-600 py-2 rounded-lg text-xs hover:bg-gray-800"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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