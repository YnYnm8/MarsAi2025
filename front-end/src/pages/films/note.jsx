import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilmCard from "./FilmCard";
import ListFilms from "./ListFilms";

export default function Note() {
  const [value, setValue] = useState(1); // スライダーの値
  const { id } = useParams();// URLパラメータから映画IDを取得
  const [films, setFilms] = useState([]);// 映画データの状態
  const [filter, setFilter] = useState("NOT WATCHED"); // 初期フィルター
  const [selectedFilm, setSelectedFilm] = useState(null); // 選択中の映画
  const [comment, setComment] = useState(""); // コメント欄の状態


  // 映画データを取得
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch("http://localhost:3000/films", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch film data");

        const data = await response.json();
        setFilms(data);
        setSelectedFilm(data[0] || null); // 最初の映画を選択
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    };

    fetchFilm();
  }, [id]);

  
  if (!films || !films.length) return <p className="text-center mt-10">Loading...</p>;
    
  // 映画リスト次のページに行くための関数
  const handleNextFilm = () => {
    if (!selectedFilm) return;
    // 現在の映画のインデックス
    const currentIndex = films.findIndex((film) => film.id === selectedFilm.id);
    
    // 次の映画のインデックス（最後なら最初に戻す）
    const nextIndex = (currentIndex + 1) % films.length;
    
    // 選択映画を更新
    setSelectedFilm(films[nextIndex]);
    
    setValue(1); // スライダーを初期値にリセット
    setComment(""); // コメント欄を空にする
  };


  
  // ノートの保管
  const handleSaveNote = async () => {
    if (!selectedFilm) return;

    try {
      const response = await fetch(`http://localhost:3000/comite/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 4, // ← 仮（ログインIDに変更可）
          FilmId: selectedFilm.id,
          score: value,
          comment: comment
        }),
      });

      if (!response.ok) throw new Error("Failed to save note");

      alert("Note saved successfully!");

      // 送信後にコメント欄を空にする
      setComment("");

    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // 映画がACCEOTEDになるための関数
  const handleAccepted = async () => {
    // ここで映画を公式セレクションに追加するAPIを呼び出す
    try {
      if (!selectedFilm) {
        alert("No film selected!");
        return;
      }

      const response = await fetch(`http://localhost:3000/comite/select/${selectedFilm.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 9, // ← 仮（ログインIDに変更可）
        }),
      });

      if (!response.ok) throw new Error("Failed to mark film as ACCEPTED");

      const data = await response.json();
      console.log("Film marked as ACCEPTED:", data);
      alert(`Film "${selectedFilm.title}" marked as ACCEPTED!`);
    } catch (error) {
      alert("Error marking film as ACCEPTED: " + error.message);

    }
  };

  // 映画がREFUSEDになるための関数

  const handleRefused = async () => {
    //   // ここで映画を公式セレクションに追加するAPIを呼び出す
    if (!selectedFilm) {
      alert("No film selected!");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/comite/refused/${selectedFilm.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: 9, // ← 仮（ログインIDに変更可）
        }),
      });

      if (!response.ok) throw new Error("Failed to mark film as REFUSED");

      const data = await response.json();
      console.log("Film marked as REFUSED:", data);
      alert(`Film "${selectedFilm.title}" marked as REFUSED!`);
    } catch (error) {
      alert("Error marking film as REFUSED: " + error.message);
    }
  };
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
          <div className="px-4 pb-4">
            <div className="flex justify-between text-xs font-semibold text-gray-500">
              {["NOT WATCHED", "ACCEPTED", "REFUSED"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex flex-col items-center gap-1 hover:text-blue-600 ${filter === f ? "text-blue-600 font-bold" : ""
                    }`}
                >
                  <span>{f}</span>
                </button>
              ))}
            </div>
          </div>

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
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 md:mt-0">
              <button
              
                className="bg-green-500 text-white rounded-lg px-6 py-2 text-sm font-semibold w-full md:w-auto">
                ACCEPTED
              </button>
              <button
               
                className="bg-red-500 text-white rounded-lg px-6 py-2 text-sm font-semibold w-full md:w-auto">
                REFUSED
              </button>
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 text-sm font-semibold w-full md:w-auto">
                + PLACER DANS UNE LISTE
              </button>

              </div>
            </div>
              {/* アクションボタン */}
              <div
                onClick={handleSaveNote}
                className="flex flex-col md:flex-row justify-between gap-2">
                <button className="rounded-lg bg-blue-600 px-6 py-2 text-white text-sm font-semibold">
                  Valider ma note
                </button>
                <button
                  onClick={handleNextFilm}
                  className="rounded-lg bg-gray-900 px-6 py-2 text-white text-sm font-semibold">
                  Visionner le suivant
                </button>
          </div>

        </main>
      </div>
    </div>
  );
}
