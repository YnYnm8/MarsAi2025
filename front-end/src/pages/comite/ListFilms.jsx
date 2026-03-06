import FilmCard from "./FilmCard";

export default function ListFilms({ films = [], searchTerm = "", filter, selectedFilm, setSelectedFilm }) {

  const filteredBySearch = films.filter((film) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      !searchTerm ||
      film.title?.toLowerCase().includes(lowerSearch) ||
      film.id?.toString().includes(lowerSearch)
    );
  });
  if (filteredBySearch.length === 0) {
    return <p className="text-gray-500 text-sm px-4">Aucun film trouvé.</p>;
  }
  return (
    <ul className="space-y-2 px-4 pb-4">
      {filteredBySearch.map((film) => (
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