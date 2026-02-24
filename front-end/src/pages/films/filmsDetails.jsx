import { useEffect, useState } from "react"
import { FilmComponent } from "../../components/film"
import { useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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


            <div className="max-w-5xl mx-auto mb-6 flex items-center mt-7 justify-between px-4">


                <button
                    onClick={() => navigate(-1)}
                    className="flex cursor-pointer items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Retour
                </button>

                {movie.status !== 'published' && (
                    <div className="flex gap-3">
                        {/* Botón Modificar */}
                        <button
                            onClick={() => navigate(`/edit/${movie.id}`)}
                            className="flex items-center cursor-pointer gap-2 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/50 text-blue-400 hover:text-white px-4 py-2 rounded-xl transition-all text-sm font-medium"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            Modifier
                        </button>

                        {/* Botón Borrar */}
                        <button
                            onClick={() => handleDeleteFilm(movie.id)}
                            className="flex items-center gap-2 cursor-pointer bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-400 hover:text-white px-4 py-2 rounded-xl transition-all text-sm font-medium"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                            Supprimer
                        </button>
                    </div>
                )}
            </div>
            <FilmComponent data={movie} variant="details" />
        </div>
    )
}