import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListFilms from "./ListFilms";
import { useMemo } from "react";




export default function Note() {
  const { id } = useParams();// URLパラメータから映画IDを取得
  const [films, setFilms] = useState([]);// 映画データの状態
  const [selectedFilm, setSelectedFilm] = useState(null); // 選択中の映画
  const [filter, setFilter] = useState("NOT_WATCHED"); // 初期フィルター
  const [value, setValue] = useState(1); // スライダーの値
  const [comment, setComment] = useState(""); // コメント欄の状態
  const [status, setStatus] = useState(null);
  const [playlist, setPlaylist] = useState([])
  // モーダル用
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");



  // 🔹 データ取得専用 useEffect
  // id が変わった時だけ再取得する
  useEffect(() => {
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

        // ③ 各映画に status を追加
        // （映画がどのPlaylistに属しているかを確認）
        const filmsWithStatus = filmsData.map(film => {
          const playlistId = film.PlaylistFilms?.[0]?.PlaylistId;
          const playlistObj = playlistsData.find(p => p.id === playlistId);

          return {
            ...film,
            status: playlistObj?.status || "NOT_WATCHED",
          };
        });

        // ④ state に保存（元データのみ保存）
        setFilms(filmsWithStatus);
        setPlaylist(playlistsData);

        // 最初に選択する映画
        setSelectedFilm(
          filmsWithStatus.find(f => f.status === "NOT_WATCHED") || filmsWithStatus[0]
        );

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFilmAndPlaylists();
  }, [id]);

  // 🔹 films または playlist が変わるたびに自動再計算
  const playlistsWithCounts = useMemo(() => {

    // playlist がまだ空なら何もしない
    if (!playlist.length) return [];

    return playlist.map(p => {

      // この playlist に属している映画の数をカウント
      const count = films.filter(film =>
        film.PlaylistFilms?.some(pf => pf.PlaylistId === p.id)
      ).length;

      return {
        ...p,
        filmCount: count, // ← 動的に追加
      };
    });

  }, [films, playlist]); // ← films が変わると自動更新




  // useEffect(() => {
  //     const fetchFilmAndPlaylists = async () => {
  //       try {
  //         // Fetch films
  //         const filmRes = await fetch("http://localhost:3000/films", {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         if (!filmRes.ok) throw new Error("Failed to fetch film data");
  //         const filmsData = await filmRes.json();

  //         //  Fetch playlists
  //         const playlistRes = await fetch("http://localhost:3000/comite/allplaylists", {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         if (!playlistRes.ok) throw new Error("Failed to fetch playlists");
  //         const playlistsData = await playlistRes.json();

  //         //  Ajouter le status basé sur PlaylistFilms et la vraie playlist
  //         const filmsWithStatus = filmsData.map(film => {
  //           // Récupère l'ID de la playlist associée à ce film
  //           const playlistId = film.PlaylistFilms?.[0]?.PlaylistId;
  //           // Cherche l'objet playlist correspondant
  //           const playlistObj = playlistsData.find(p => p.id === playlistId);

  //           return {
  //             ...film,
  //             // Définit le status à partir de la playlist, sinon "NOT_WATCHED"
  //             status: playlistObj?.status || "NOT_WATCHED",
  //           };
  //         });

  //         // Compter le nombre de films dans chaque playlist
  //         const playlistWithCounts = playlistsData.map(p => {
  //           const count = filmsWithStatus.filter(film =>
  //             film.PlaylistFilms?.some(pf => pf.PlaylistId === p.id)
  //           ).length;

  //           return {
  //             ...p,
  //             filmCount: count // ajoute le nombre de films dans chaque playlist
  //           };
  //         });

  //         //  Mettre à jour le state
  //         setFilms(filmsWithStatus);
  //         setSelectedFilm(
  //           filmsWithStatus.find(f => f.status === "NOT_WATCHED") || filmsWithStatus[0]
  //         );
  //         setPlaylist(playlistWithCounts); // maintenant chaque playlist a filmCount

  //       } catch (error) {
  //         console.error("Error fetching film or playlist data:", error);
  //       }
  //     };

  //     fetchFilmAndPlaylists();
  //   }, [id]);



  console.log("All films:", films);

  if (!films || !films.length) return <p className="text-center mt-10">Loading...</p>;

  // ノートをつけてSTATUSを変更する。
  // "/review/:FilmId"
  const handleSavereview = async (clickedStatus) => {
    if (!selectedFilm) {
      alert("No film selected!");
      return;
    }

    if (!clickedStatus) {
      alert("Please select ACCEPTED or REFUSED");
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
            UserId: 9,          // ← ログインユーザーID
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
      console.log("Review saved:", data);

      alert("Review saved successfully!");

      const updatedFilms = films.map(film => {
        if (film.id === selectedFilm.id) {
          return { ...film, status: clickedStatus };
        }
        return film;
      });
      setFilms(updatedFilms);
      // selectedFilm も更新して即時反映
      setSelectedFilm(prev => ({ ...prev, status: clickedStatus }));

      // リセット
      setComment("");
      setValue(1);
      setStatus(null);

      // 次の映画へ自動移動
      handleNextFilm(updatedFilms);


    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };
  // 次のページで自動で移動する
  const handleNextFilm = (filmsArray) => {
    if (!filmsArray || filmsArray.length === 0) return;
    const nextFilm = filmsArray.find(film => film.status === "NOT WATCHED");
    if (!nextFilm) {
      setSelectedFilm(nextFilm);

    } else {
      alert("No more films to review!");
      setSelectedFilm(null);
    };
  };
  // プレイリストを新しく作成する
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
          UserId: 9, // ログインユーザーID
          FilmId: selectedFilm ? selectedFilm.id : null, // 選択された映画ID（あれば）
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      alert("Playlist created successfully!");

      const data = await response.json();
      console.log("Playlist created:", data);
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
          UserId: 9, // ログインユーザーID
          FilmId: selectedFilm.id,
          targetPlaylistId: playlistId,
        }),
      });

      if (!playlistResponse.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add film to playlist");
      }

      await playlistResponse.json();
    

      const noteResponse = await fetch("http://localhost:3000/comite/note", {
        method: "POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 9,
          FilmId: selectedFilm.id,
          score: value,
          comment: comment,
        }),
      });

      if(!noteResponse.ok){
        const errorData = await response.json();
        throw new Error(errorData.message||"Fail to add your note to the film");
      }

      await noteResponse.json();
    

   
    // 3 UI更新
    const playlistStatus = playlist.find(p => p.id === playlistId)?.status || "TO_DISCUSS";

    const updatedFilms = films.map(film =>
      film.id === selectedFilm.id
        ? { ...film, status: playlistStatus }  // 映画の status をプレイリストに合わせる
        : film
    );

    setFilms(updatedFilms);
    setSelectedFilm(prev => ({ ...prev, status: playlistStatus }));

    alert(`映画を "${playlistStatus}" に追加して成績も入力しました！`);


  } catch (error) {
    console.error("Error adding film to playlist:", error);
    alert("Error adding film to playlist");
  }
};

// const handleAddToPlaylist = async (playlistId) => {
//   if (!selectedFilm) {
//     alert("No film selected!");
//     return;
//   }
//   try {
//     const response = await fetch("http://localhost:3000/comite/film/list", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         FilmId: selectedFilm.id,
//         targetPlaylistId: playlistId,
//       }),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to add film to playlist");
//     }

//     alert("Film added to playlist successfully!");

//     const data = await response.json();
//     console.log("Film added to playlist:", data);

//     // 追加後、映画の status を更新して即時反映
//     const updatedFilms = films.map(film => {
//       if (film.id === selectedFilm.id) {
//         return { ...film, status: playlist.find(p => p.id === playlistId)?.status || film.status };
//       }
//       return film;
//     });
//     setFilms(updatedFilms);
//     setSelectedFilm(prev => ({ ...prev, status: playlist.find(p => p.id === playlistId)?.status || prev.status }));
//   } catch (error) {
//     console.error("Error adding film to playlist:", error);
//     alert("Error adding film to playlist");
//   }
// }


return (
  <div className="flex flex-col h-screen bg-gray-100 font-sans">

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
      <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r overflow-y-auto">
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
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"}
    `}
          >
            {p.status} ({p.filmCount})
          </button>
        ))}


        {/* 映画リスト */}
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
          <h1 className="text-xl md:text-2xl font-bold">
            PRÊT POUR LES <br /> DÉLIBÉRATIONS ?
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sélectionnez un film dans la liste à gauche
          </p>
          <div className="mt-2 flex flex-col md:flex-row justify-center gap-2 md:gap-6 text-sm">
            <span className="font-bold">150</span>
            <span className="text-gray-500">FILM A NOTER</span>
            <span className="text-red-500 font-semibold">15 JUIN 2026</span>
            <span className="text-gray-500">CLUTURE</span>
          </div>
        </div>

        {/* Video Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-4 md:p-6 mb-6">

          {/* 映画ポスター */}
          <img
            src={selectedFilm?.Files?.[0]?.poster_url || "/youtubeimg.webp"}
            alt={selectedFilm?.title || "Film Poster"}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          {/* タイトル・監督 */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{selectedFilm?.title || "SYNTHETICA : title"}</h2>
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
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Commentaire (optionnel)
            </label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm text-gray-900 placeholder- bg-gray-200"
              placeholder="Ajouter un commentaire sur le film..."
            ></textarea>
          </div>

        </div>
        {/* 選択・リストボタン */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
          {/* 左側タイトル */}
          <span className="flex items-center gap-2 text-gray-700 font-semibold">
            <svg
              className="w-6 h-6 text-purple-400"
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
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 md:mt-0">
            <button
              onClick={() => {
                setStatus("ACCEPTED");
                handleSavereview("ACCEPTED");
              }}
              className={`bg-green-500 text-white rounded-lg px-6 py-2 text-sm font-semibold ${status === "ACCEPTED" ? "ring-4 ring-green-300" : ""
                }`}
            >
              ACCEPTED
            </button>

            <button
              onClick={() => {
                setStatus("REFUSED");
                handleSavereview("REFUSED");
              }}
              className={`bg-red-500 text-white rounded-lg px-6 py-2 text-sm font-semibold ${status === "REFUSED" ? "ring-4 ring-red-300" : ""
                }`}
            >
              REFUSED
            </button>

            <button
              onClick={() => {
                setStatus("TO_DISCUS");
                handleSavereview("TO_DISCUSS");
              }}
              className={`bg-yellow-500 text-white rounded-lg px-6 py-2 text-sm font-semibold ${status === "TO_DISCUS" ? "ring-4 ring-yellow-300" : ""
                }`}
            >
              TO_DISCUS
            </button>
            <button onClick={() => setShowModal(true)} className="bg-gray-900 text-white rounded-lg px-6 py-2 text-sm font-semibold w-full md:w-auto" > + PLACER DANS UNE LISTE </button> </div>
        </div>
        {/* {個人プレイリスト} */} 
        <div className="flex flex-wrap gap-2 mt-3"> {playlist.slice(4).map(p => (<button key={p.id} onClick={() => handleAddToPlaylistWithNote(p.id)} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition" > {p.status} </button>))} </div>
      </main>
    </div>

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
    )
    }
  </div >
);
}
