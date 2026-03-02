
 import { useState, useEffect } from "react";

export default function RefusedFilmCard() {
  const [film, setFilm] = useState([]);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/comite/refused",
         
            // credentials: "include"
        );
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error("Failed to fetch film data");
        }


        setFilm(data);
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    };

    fetchFilm();
  }, []); // ← 空配列を忘れない！

  if (!film) {
    return <p className="text-center mt-10">Loading...</p>;
  }


 
  return (
   
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <p className="text-sm text-blue-500 mb-2">← RETOUR ACCUEIL</p>
        <h1 className="text-4xl font-bold text-red-400 ">
          LA GALERIE
          <span className="text-red-500"> PAGE DE FILMS REFUSÉS</span>
        </h1>
      </div>

      {/* Filter Buttons */}
      <div className="max-w-6xl mx-auto flex gap-4 mb-8">
        <button className="px-4 py-2 bg-orange-200 rounded-full shadow text-sm font-semibold text-white">
          SELECTED
        </button>
        <button className="px-4 py-2 bg-orange-200 rounded-full shadow text-sm font-semibold">
          TO DISCUSS
        </button>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {film && film.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={f.Film?.thumbnail || "../src/assets/youtubeimg.webp"}
              alt={f.Film?.title || "Film thumbnail"}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-sm">
                {f.Film?.title || "Titre inconnu"}
              </h2>
              <p className="text-xs text-gray-500">
                {f.Film?.director || "Réalisateur inconnu"}
              </p>
              <p className="text-xs flex items-center gap-1">
                <img src="../src/assets/earth.png" alt="earth" className="w-4 h-4" />
                {f.Film?.country || "Pays inconnu"}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{f.Film?.duration || "0"} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}


