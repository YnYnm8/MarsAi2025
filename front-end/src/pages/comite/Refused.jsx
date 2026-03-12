import React, { useState, useEffect } from "react";
import RefusedFilmCard from "./RefusedFilmCard.jsx";
import { VITE_API_URL_FRONTEND } from "../services/config";

export default function Refused() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchRefused() {
      try {
        const res = await fetch(`${VITE_API_URL_FRONTEND}/playlist/status/refused/2`); // APIのURLに合わせて変更
        const data = await res.json();
        setFilms(data);
      } catch (err) {
        console.error("Error fetching refused films:", err);
      }
    }
    fetchRefused();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Liste des films REFUSÉS</h1>

      {films.length === 0 ? (
        <p className="text-gray-500">Aucun film refusé</p>
      ) : (
        films.map((film) => <RefusedFilmCard key={film.id} film={film} />)
      )}
    </div>
  );
}
