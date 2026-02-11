import React from "react";
import { useNavigate } from "react-router-dom";

export default function RefusedFilmCard({ film }) {
  const navigate = useNavigate();

  if (!film) return null;

  const handleClick = () => {
    navigate(`/film/${film.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border p-3 rounded mb-2 flex gap-4 hover:bg-gray-50"
    >
      <img
        src={film.poster || "https://via.placeholder.com/150"}
        alt={film.title}
        className="w-24 h-16 object-cover rounded"
      />
      <div>
        <h2 className="font-semibold">{film.title}</h2>
        <p>Meiko{film.lastname}</p>
        <p>from {film.country || "Unknown"}</p>
      </div>
    </div>
  );
}
