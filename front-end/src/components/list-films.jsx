import { useEffect, useState } from "react";
import { FilmComponent } from "./film";
import { useNavigate } from "react-router-dom";

export function FilmList() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch("http://localhost:3000/films");
                const data = await response.json();
                setFilms(data);
            } catch (error) {
                console.error("Erreur lors du chargement des films:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFilms();
    }, []);

    if (loading) return <div className="text-white text-center py-10">Chargement de la galerie...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-white mb-8">Galerie de Films AI</h1>

            {/* Contenedor Grid para las Cards */}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {films.length > 0 ? (
                    films.map((film) => (
                        <div
                            key={film.id}
                            onClick={() => navigate(`/film/${film.id}`)}
                        >
                            <FilmComponent data={film} variant="card" />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aucun film trouvé.</p>
                )}
            </div>
        </div>
    );
}