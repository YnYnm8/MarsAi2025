import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VITE_API_URL_FRONTEND } from "../services/config";

export default function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(
          `${VITE_API_URL_FRONTEND}/films/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch film data");
        }

        const data = await response.json();
        console.log(data);

        setFilm(data); // ← 正しくここでセット
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    };

    fetchFilm();
  }, [id]);

  if (!film) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
  <div className="w-full max-w-4xl space-y-6">

    <p className="text-sm text-blue-500 cursor-pointer">
      ← RETOUR GALERIE
    </p>

    <div className="rounded-xl overflow-hidden shadow">
      <img
        src={film.thumbnail || "../src/assets/youtubeimg.webp"} // サムネイルがない場合のデフォルト画像
        alt={film.title}
        className="w-full h-64 object-cover"
      />
    </div>

    <div className="flex items-start gap-8">

      <div className="flex items-start gap-2">
        <div className="bg-orange-500 rounded-full w-10 h-10 shrink-0"></div>
        <div className="flex flex-col">
          <h2>FilmId: {film.id}</h2>
          <p className="text-sm text-gray-500">REALISATEUR</p>
          <h2 className="font-semibold">
            {film.last_name || "Unknown"} {/* 監督の名前 */}
          </h2>
          <p className="text-sm text-gray-500">{film.bio}</p> {/* 監督の簡単な紹介 */}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">ORIGINE</p>
          <h2 className="font-semibold">
            {film.country || "Unknown"}
          </h2>
          <p className="text-sm text-gray-500">{film.school}</p> {/* 出身学校 */}
        </div>
      </div>

    </div>

    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-bold">
        {film.title} {/* 映画タイトル */}
      </h2>
      <p className="text-gray-700">
        Durée: {film.duration} min {/* 上映時間 */}
      </p>
      <p className="text-gray-700">
        Catégorie: {film.category} {/* カテゴリ */}
      </p>
      <p className="text-gray-700">
        Collaborateur: {film.collaborateur} {/* Collaborateur フラグ */}
      </p>
    </div>

    <div className="bg-neutral-800 text-white rounded-xl p-6 space-y-3">
      <i className="fa-solid fa-book-open"></i>
      <h3 className="font-semibold text-orange-500">SYNOPSIS</h3>
      <p>{film.description}</p> {/* synopsis */}

      <i className="fa-solid fa-microchip"></i>
      <h3 className="font-semibold text-blue-400">
        TECH STACK & IA
      </h3>
      <p>{film.generate_Ai}</p> {/* AI生成情報 */}
    </div>

  </div>
</div>

  );
}
