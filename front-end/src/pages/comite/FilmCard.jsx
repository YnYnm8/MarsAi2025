export default function FilmCard({ film, isActive }) {
  const BACKEND_URL = `${API_URL_FRONTEND}`;

  const getPosterUrl = () => {
    const file = film.Files?.[0];

    if (!file?.poster_url) return `${BACKEND_URL}/uploads/youtubeimg.webp`;

    if (file.poster_url.startsWith('http')) return file.poster_url;

    const cleanPath = file.poster_url.startsWith('/') ? file.poster_url : `/${file.poster_url}`;
    return `${BACKEND_URL}${cleanPath}`;
  };

  const posterUrl = getPosterUrl();
  return (
    <div   // ← ここを div に変更
      className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer ${isActive ? "bg-black" : "hover:bg-gray-400"
        }`}
    >
      <img
        src={posterUrl}
        alt={film.title}
        className="w-16 h-16 md:w-12 md:h-12 object-cover rounded"
      />

      <div>
        <p className="text-[#246BAD]">{film.id}</p>
        <p className="text-sm font-semibold text-[#FF5845]">{film.title}</p>
        <p className="text-sm font-semibold text-[#FF5845]"> SCORE :  {film.NotesDirect?.[0]?.score || "Non evalué"}</p>
        <p className="text-xs text-gray-5OO">{film.duration} sec.</p>
        <p className="text-xs text-gray-500">
          {film.User?.lastName} –  ORIGIN  {film.User?.country}
        </p>
      </div>
    </div>
  );
}
