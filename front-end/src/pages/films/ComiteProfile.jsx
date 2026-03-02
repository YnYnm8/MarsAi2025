import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComiteProfile() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [filter, setFilter] = useState("NOT_WATCHED");

  const user = {
    name: "PAUL MICHEL",
    avatar: "https://via.placeholder.com/40"
  };

  // useEffect(() => {
  //   fetchUserFilms();
  // }, []);

  // const fetchUserFilms = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/comite/user/3");
  //     const data = await res.json();
  //     setFilms(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const filteredFilms = films.filter(film => film.status === filter);

  return (
   <div className="flex min-h-screen bg-black text-white">

      {/* 左側：ユーザー情報 */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img src={user.avatar} className="rounded-full w-10 h-10" />
        <span className="font-semibold">{user.name}</span>
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
                src={film.poster_url}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 font-bold">{film.title}</h2>
              <p className="text-sm text-gray-400">
                Score : {film.score}/10
              </p>
              <p className="text-sm mt-1">{film.comment}</p>
            </div>
          ))}
        </div>

        {/* 戻るボタン */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/note")}
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
            className={`block w-full text-left px-4 py-2 rounded mb-2 ${
              filter === status
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