import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListFilms from "./ListFilms";
import { useMemo } from "react";
import { FilmComponent } from "../../components/film";


export default function Note() {
  const { id } = useParams();// URLパラメータから映画IDを取得
  const [films, setFilms] = useState([]);// 映画データの状態
  const [selectedFilm, setSelectedFilm] = useState(null); // 選択中の映画
  const [filter, setFilter] = useState("NOT_WATCHED"); // 初期フィルター
  const [value, setValue] = useState(0) // スライダーの値
  const [comment, setComment] = useState(""); // コメント欄の状態
  const [status, setStatus] = useState(null);
  const [playlist, setPlaylist] = useState([])
  // モーダル用
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");



  // 🔹 データ取得専用 useEffect
  // id が変わった時だけ再取得する
  const fetchFilmAndPlaylists = async () => {
    try {
      // ① 映画を取得
      const filmRes = await fetch("http://localhost:3000/films");
      if (!filmRes.ok) throw new Error("Failed to fetch film data");
      const filmsData = await filmRes.json();

      // ② プレイリストを取得
      const playlistRes = await fetch("http://localhost:3000/comite/allplaylists");
      if (!playlistRes.ok) throw new Error("Failed to fetch playlists");
      const playlistsData = await playlistRes.json();

      // プレイリストに name がない場合はステータスを名前として代入
      const playlistsWithName = playlistsData.map(p => ({
        ...p,
        name: p.name || p.status || "Sans nom", // name がなければ status を使用
        filmCount: 0
      }));
      // ③ 各映画に status を追加
      // （映画がどのPlaylistに属しているかを確認）
      const filmsWithStatus = filmsData.map(film => {
        if (!film.PlaylistFilms || film.PlaylistFilms.length === 0) {
          return {
            ...film,
            status: "NOT_WATCHED",
            playlistName: "なし",
          };
        }

        // 🔥 最新のPlaylistだけを使う
        const latestPlaylistFilm = film.PlaylistFilms[film.PlaylistFilms.length - 1];

        const playlistObj = playlistsData.find(
          p => p.id === latestPlaylistFilm.PlaylistId
        );

        return {
          ...film,
          status: playlistObj?.status || "NOT_WATCHED",
          playlistName: playlistObj?.name || "なし",
        };
      });
      // ④ state に保存（元データのみ保存）
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

    // Trouver le premier film correspondant au filtre actuel
    const firstFilm = films.find(film => film.status === filter);
    if (firstFilm) {
      setSelectedFilm(firstFilm);
    } else {
      setSelectedFilm(films[0]); // fallback
    }
  }, [filter, films]);

  // // 🔹 films または playlist が変わるたびに自動再計算
  const playlistsWithCounts = useMemo(() => {
    if (!playlist.length) return [];

    return playlist.map(p => {
      let count;

      if (p.status === "NOT_WATCHED") {
        // NOT_WATCHEDはステータスで数える
        count = films.filter(film => film.status === "NOT_WATCHED").length;
      } else {
        // その他はプレイリストIDで数える
        count = films.filter(film =>
          film.PlaylistFilms?.some(pf => pf.PlaylistId === p.id)
        ).length;
      }

      return {
        ...p,
        filmCount: count,
      };
    });
  }, [films, playlist]);



  // ノートをつけてSTATUSを変更する。
  // "/review/:FilmId"
  const handleSavereview = async (clickedStatus) => {

    if (!selectedFilm) {
      alert("No film selected!");
      return;
    }

    if (!value || value < 1) {
      alert("Please note your film!");
      return;
    }

    if (!clickedStatus) {
      alert("Please select ACCEPTED , REFUSED or TO_DISCUSS");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/comite/review/${selectedFilm.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserId: 3,          // ← ログインユーザーID
            score: value,       // スライダー値
            comment: comment,   // コメント
            status: clickedStatus,     // "ACCEPTED" or "REFUSED"
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save review");
      }

      const data = await response.json();


      await fetchFilmAndPlaylists();

      setComment("");
      setValue(0);
      setStatus(null);


    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };


  // プレイリストを新しく作成する
  // モーダル表示用
  const handleCreateList = async () => {
    if (!newListName.trim()) {
      alert("Please enter a name for the list");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/comite/create/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newListName,
          UserId: 4, // ログインユーザーID
          FilmId: selectedFilm ? selectedFilm.id : null, // 選択された映画ID（あれば）
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const data = await response.json();
      console.log("Playlist created:", data);



      await fetchFilmAndPlaylists();
      setShowModal(false);
      setNewListName("");
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Error creating playlist");
    }
  };
  // プレイリストに映画を追加して成績を入力する
  const handleAddToPlaylistWithNote = async (playlistId) => {
    if (!selectedFilm) {
      alert("No film selected!");
      return;
    }

    try {
      const playlistResponse = await fetch("http://localhost:3000/comite/film/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 3, // ログインユーザーID
          FilmId: selectedFilm.id,
          targetPlaylistId: playlistId,
        }),
      });

      if (!playlistResponse.ok) {
        const errorData = await playlistResponse.json();
        throw new Error(errorData.message || "Failed to add film to playlist");
      }

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

      if (!noteResponse.ok) {
        const errorData = await noteResponse.json();
        throw new Error(errorData.message || "Fail to add your note to the film");
      }

      await noteResponse.json();



      // 3 UI更新
      const playlistStatus = playlist.find(p => p.id === playlistId)?.status || "TO_DISCUSS";

      const updatedFilms = films.map(film =>
        film.id === selectedFilm.id
          ? {
            ...film,
            status: playlistStatus,
            PlaylistFilms: [{ PlaylistId: playlistId }]
          }  // 映画の status をプレイリストに合わせる
          : film
      );


      await fetchFilmAndPlaylists(); // films が最新状態になる
      setValue(0);
      // その後、filter に合う映画を選ぶ
      const firstFilm = films.find(f => f.status === playlistStatus) || films[0];
      setSelectedFilm(firstFilm);

    } catch (error) {
      console.error("Error adding film to playlist:", error);
      alert("Error adding film to playlist");
    }
  };

  // const hadleDeletePlaylist = async()=>



  return (
    <div className="flex flex-col h-screen bg-black font-sans">

      {/* Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
        <button className="text-sm text-gray-500">← Retour</button>
        <div className="text-sm font-semibold text-blue-600">MARS.AI</div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">PAUL MICHEL</span>
          <img src="https://via.placeholder.com/32" className="rounded-full" />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-black
         border-b md:border-b-0 md:border-r overflow-y-auto">
          <div className="p-4">
            <input
              type="text"
              placeholder="Rechercher un film..."
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>

          {/* フィルター */}
          {playlistsWithCounts.map(p => (
            <button
              key={p.id}
              onClick={() => setFilter(p.status)}
              className={`
      px-3 py-1 rounded-md transition
      ${filter === p.status
                  ? "bg-[#246BAD] text-white"
                  : "bg-gray-800 text-white"}
    `}
            >
              {p.status} ({p.filmCount})
            </button>
          ))}


          {/* 映画リスト */}
          <div className="text-[#FF5845]"></div>
          <ListFilms
            films={films}
            filter={filter}
            setSelectedFilm={setSelectedFilm}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">


          {/* タイトル */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold  text-bg-red-600">
              PRÊT POUR LES <br /> DÉLIBÉRATIONS ?
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sélectionnez un film dans la liste à gauche
            </p>
            <div className="mt-2 flex flex-col md:flex-row justify-center gap-2 md:gap-6 text-sm">
              <span className="font-bold">150</span>
              <span className="text-gray-500">FILM A NOTER</span>
              <span className="text-[#FF5845] font-semibold">15 JUIN 2026</span>
              <span className="text-gray-500">CLUTURE</span>
            </div>
          </div>

          {/* Video Card */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-4 md:p-6 mb-6">
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
              <h2 className="text-lg font-bold text-[#246BAD]">{selectedFilm?.title || "SYNTHETICA : title"}</h2>
              <p className="text-sm text-gray-600">{selectedFilm?.director || "Director · France"}</p>
            </div>
            <div className="text-xl font-bold mt-2 md:mt-0">
              {value}<span className="text-sm">/10</span>
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
          {/* {{コメント欄}} */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-800 mb-1">
              Commentaire (optionnel)
            </label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm text-gray-200 placeholder- bg-gray-800"
              placeholder="Ajouter un commentaire sur le film..."
            ></textarea>
          </div>


          {/* 選択・リストボタン */}
          <div className="bg-gray-800 rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
            {/* 左側タイトル */}
            <span className="flex items-center gap-2 text-white font-semibold">
              <svg
                className="w-6 h-6 text-[#FF5845]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              SÉLECTIONNER OU TRIER
            </span>

            {/* 右側ボタン群 */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {(!value || value < 1) && (
                <span className="text-white text-sm ">
                  PLEASE NOTE BEFORE
                </span>
              )}

              <button
                onClick={() => {

                  handleSavereview("ACCEPTED");
                }}
                disabled={!value || value < 1}
                className={`
                    bg-[#246BAD] text-white rounded-lg px-6 py-2 text-sm font-semibold
                    ${(!value || value < 1) ? 'opacity-50 cursor-not-allowed' : ''}
                   `}
              >
                ACCEPTED
              </button>

              <button
                onClick={() => {
                  handleSavereview("REFUSED");
                }}
                disabled={!value || value < 1}
                className={`bg-[#FF5845] text-white rounded-lg px-6 py-2 text-sm font-semibold 
                  ${(!value || value < 1) ? 'opacity-50 cursor-not-allowed' : ''}
                   `}
              >
                REFUSED
              </button>

              <button
                onClick={() => {

                  handleSavereview("TO_DISCUSS");
                }}
                disabled={!value || value < 1}
                className={`bg-green-300 text-white rounded-lg px-6 py-2 text-sm font-semibold 
                 ${(!value || value < 1) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
              >
                TO_DISCUSS
              </button>

              <button onClick={() => setShowModal(true)} className="bg-gray-900 text-white rounded-lg px-6 py-2 text-sm font-semibold " > + CREAT YOUR PLYLIST</button> </div>
          </div>
          {/* {個人プレイリスト} */}

          <div className="bg-gray-800 rounded-xl shadow p-4 mt-4">
            <span className="flex items-center gap-2 text-white font-semibold mb-2">
              <svg
                className="w-6 h-6 text-[#FF5845]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              YOUR ORIGINAL PLAYLIST
            </span>

            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 justify-end">
              {playlist.slice(4).map(p => (
                <button
                  key={p.id}
                  onClick={() => handleAddToPlaylistWithNote(p.id)}
                  disabled={!value || value < 1}
                  className="bg-[#FF5845] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d44f40] 
                     ${(!value || value < 1) ? 'opacity-50 cursor-not-allowed' : ''} "
                >
                  {p.status}
                </button>
              ))}
            </div>
          </div>


        </main>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Créer une nouvelle liste</h2>
              <input
                type="text"
                placeholder="Nom de la liste"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm text-gray-900 placeholder- bg-gray-200 mb-4"
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
                    setShowModal(false);
                    setNewListName("");
                    handleCreateList();
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
  )
};




