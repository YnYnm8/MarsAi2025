import FilmCard from "./FilmCard";

export default function ListFilms({ films = [], searchTerm = "", filter, setSelectedFilm }) {
  // フィルター＋検索
  const filteredFilms = films.filter((film) => {
    // 1️⃣ ステータスでフィルター
    const matchesFilter = filter ? film.status === filter : true;

    // 2️⃣ 検索ワードでIDまたはタイトルを検索
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      film.title?.toLowerCase().includes(lowerSearch) ||
      film.id?.toString().includes(lowerSearch);

    return matchesFilter && matchesSearch;
  });

  // 該当映画がない場合
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