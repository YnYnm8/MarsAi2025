import FilmCard from "./FilmCard";

export default function ListFilms({ films = [], searchTerm = "", filter, selectedFilm, setSelectedFilm }) {
  
  const filteredFilms = films.filter((film) => {
    const matchesFilter = filter ? film.status === filter : true;
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      film.title?.toLowerCase().includes(lowerSearch) ||
      film.id?.toString().includes(lowerSearch);

    return matchesFilter && matchesSearch;
  });

  if (filteredFilms.length === 0) {
    return <p className="text-gray-500 text-sm px-4">Aucun film pour ce filtre.</p>;
  }

  return (
    <ul className="space-y-2 px-4 pb-4">
      {filteredFilms.map((film) => (
        <li
          key={film.id}
          onClick={() => setSelectedFilm(film)}
          className="cursor-pointer"
        >
          <FilmCard film={film} isActive={film.id === selectedFilm?.id} />
        </li>
      ))}
    </ul>
  );
}