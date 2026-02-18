import FilmCard from "./FilmCard";

export default function ListFilms({ films = [], filter, setSelectedFilm }) {
  // Filtrer les films selon le statut choisi
  const filteredFilms = films.filter(film => film.status === filter);

  // Si aucun film correspond, on peut retourner un message (optionnel)
  if (filteredFilms.length === 0) {
    return <p className="text-gray-500 text-sm px-4">Aucun film pour ce filtre.</p>;
  }

  return (
    <ul className="space-y-2 px-4 pb-4">
      {filteredFilms.map((film, index) => (
        <li
          key={film.id}
          onClick={() => setSelectedFilm(film)}
          className="cursor-pointer"
        >
          <FilmCard film={film} isActive={index === 0} />
        </li>
      ))}
    </ul>
  );
}
