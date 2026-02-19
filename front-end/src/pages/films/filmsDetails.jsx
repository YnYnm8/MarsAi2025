import { useEffect, useState } from "react"
import { FilmComponent } from "../../components/film"
import { useParams, useNavigate } from "react-router-dom"
import TopNavbar from "../../components/navbar";

export default function FilmsDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleDeleteFilm = async (filmId, e) => {

        e.stopPropagation(); // Empêche le clic de traverser et d'ouvrir la page du film
        if (!window.confirm("Voulez-vous vraiment supprimer ce film définitivement ?")) return;

        try {
            const res = await fetch(`http://localhost:3000/films/${filmId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                // Mise à jour optimiste : on filtre le film supprimé de la liste locale pour un effet immédiat
                setFilms(prevFilms => prevFilms.filter(film => film.id !== filmId));
            } else {
                alert("Impossible de supprimer ce film.");
            }
        } catch (error) {
            console.error("Erreur suppression", error);
        }
    };

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/films/${id}`);

                if (!response.ok) {
                    throw new Error('Film introuvable');
                }

                const data = await response.json();
                setMovie(data);
                document.title = `Mars AI - ${data.title}`;

                console.log(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchFilmData();
        }
    }, [id])

    if (loading) return <div className="loader">Chargement en cours...</div>;
    if (error) return <div className="error-message">Erreur : {error}</div>;
    if (!movie) return <div className="error-message">Aucun film trouvé.</div>;

    return (
        <div className="bg-black">
            <TopNavbar />

            <div className="max-w-5xl mx-auto mb-6 flex items-center mt-7 justify-between px-4">


                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour
                </button>

                {movie.status !== 'published' && (
                    <div className="flex gap-3">
                        {/* Botón Modificar */}
                        <button
                            onClick={() => navigate(`/edit/${movie.id}`)}
                            className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/50 text-blue-400 hover:text-white px-4 py-2 rounded-xl transition-all text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Modifier
                        </button>

                        {/* Botón Borrar */}
                        <button
                            onClick={() => handleDeleteFilm(movie.id)}
                            className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-400 hover:text-white px-4 py-2 rounded-xl transition-all text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Supprimer
                        </button>
                    </div>
                )}
            </div>
            <FilmComponent data={movie} variant="details" />
        </div>
    )
}