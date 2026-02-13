import FilmCard from "./FilmCard";

export default function ListFilms({ films = [], filter, setSelectedFilm }) {
  const playlistMap = {
    "NOT WATCHED": 1,
    "ACCEPTED": 2,
    "REFUSED": 3,
  };

  const filteredFilms = films.filter((film) =>
    film.PlaylistFilms?.some((pf) => pf.PlaylistId === playlistMap[filter])
  );

  return (
    <ul className="space-y-2 px-4 pb-4">
      {filteredFilms.map((film, index) => (
        <li key={film.id} onClick={() => setSelectedFilm(film)}>
          <FilmCard film={film} isActive={index === 0} />
        </li>
      ))}
    </ul>
  );
}
