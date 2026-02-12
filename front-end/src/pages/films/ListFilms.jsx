import FilmCard from "./FilmCard";

export default function ListFilms({ films = [], filter }) {
  // Mapping filtre → PlaylistId
  const playlistMap = {
    "NOT WATCHED": 1, // Id de la playlist "Not Watched"
    "ACCEPTED": 2,    // Id de la playlist "Accepted"
    "REFUSED": 3,     // Id de la playlist "Refused"
  };

  const filteredFilms = films.filter((film) => {
    const playlistId = playlistMap[filter];
    return film.PlaylistFilms?.some((pf) => pf.PlaylistId === playlistId);
  });

  return (
    <ul className="space-y-2 px-4 pb-4">
      {filteredFilms.map((film, index) => (
        <FilmCard key={film.id} film={film} isActive={index === 0} />
      ))}
    </ul>
  );
}
