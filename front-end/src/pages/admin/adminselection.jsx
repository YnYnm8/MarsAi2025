import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/sidebar.jsx';

const AdminSelection = () => {
    const [selections, setSelections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAcceptedFilms = async () => {
            try {
                // CORRECTION : On pointe sur la nouvelle route filtrée
                const response = await fetch('http://localhost:3000/admin/films/selected', {
                    credentials: 'include'
                });
                const json = await response.json();

                // On récupère json.data car ton contrôleur renvoie { success: true, data: [...] }
                let data = [];
                if (json.success && Array.isArray(json.data)) {
                    data = json.data;
                } else if (Array.isArray(json)) {
                    data = json;
                }

                setSelections(data);
            } catch (err) {
                console.error("Erreur chargement sélection:", err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };
        fetchAcceptedFilms();
    }, []);

    const getStatusStyle = (status) => {
        const s = status ? status.toLowerCase() : "submitted";
        if (s === 'accepted') return 'bg-emerald-100 text-emerald-600 border-emerald-200';
        if (s === 'rejected') return 'bg-rose-100 text-rose-600 border-rose-200';
        return 'bg-amber-100 text-amber-600 border-amber-200';
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/C";
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const Skeleton = ({ className }) => (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
    );

    // Filtrage simplifié car "film" est maintenant l'objet direct
    const filteredFilms = selections.filter(film => {
        const title = film.title || "";
        const director = film.User ? `${film.User.firstName} ${film.User.lastName}` : "";
        return title.toLowerCase().includes(searchTerm.toLowerCase()) || 
               director.toLowerCase().includes(searchTerm.toLowerCase());
    });

    let tableContent;

    if (loading) {
        tableContent = [...Array(5)].map((_, i) => (
            <tr key={i}>
                <td colSpan="7" className="py-4">
                    <Skeleton className="h-12 w-full rounded-xl" />
                </td>
            </tr>
        ));
    } else if (filteredFilms.length === 0) {
        tableContent = (
            <tr>
                <td colSpan="7" className="py-10 text-center text-gray-400 text-sm italic">
                    Aucun film accepté trouvé
                </td>
            </tr>
        );
    } else {
        tableContent = filteredFilms.map((film) => {
            // Ton service renvoie directement le film, plus besoin de mainFilm
            const poster = film.Files?.[0]?.poster_url || "/src/assets/youtube.png";
            
            const directorName = film.User 
                ? `${film.User.firstName} ${film.User.lastName}`.trim() || film.User.email 
                : "NON RENSEIGNÉ";

            return (
                <tr key={film.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 pl-4">
                        <div className="w-14 h-9 overflow-hidden rounded-lg bg-gray-100 shadow-sm border border-gray-50">
                            <img 
                                src={poster} 
                                className="h-full w-full object-cover" 
                                alt="poster" 
                                onError={(e) => { e.target.src = "/src/assets/youtube.png"; }} 
                            />
                        </div>
                    </td>
                    <td className="py-5">
                        <p className="font-black text-[11px] text-black uppercase leading-tight">
                            {film.title || "SANS TITRE"}
                        </p>
                    </td>
                    <td className="py-5 text-[10px] font-bold text-gray-800 uppercase">
                        {directorName}
                    </td>
                    <td className="py-5 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getStatusStyle(film.status)}`}>
                            {film.status}
                        </span>
                    </td>
                    <td className="py-5 text-center text-[10px] font-bold text-gray-400">
                        {formatDate(film.createdAt)}
                    </td>
                    <td className="py-5 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={film.status === 'accepted'} />
                            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:bg-emerald-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                        </label>
                    </td>
                    <td className="py-5 text-right pr-4">
                        <button 
                            onClick={() => navigate(`/films/${film.id}`)} 
                            className="text-gray-300 hover:text-black transition-colors transform hover:scale-110"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-left">
            <Sidebar />
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="mb-12">
                    <h2 className="text-orange-400 font-bold mb-2 tracking-widest text-xs uppercase">ADMIN MANAGEMENT</h2>
                    <h1 className="text-4xl font-black text-black mb-4 tracking-tighter uppercase">SÉLECTION OFFICIELLE</h1>
                </div>

                <div className="mb-8">
                    <input 
                        type="text" 
                        placeholder="Rechercher un film ou un réalisateur..." 
                        className="w-full p-4 rounded-2xl bg-white border-none shadow-sm text-sm outline-none focus:ring-2 focus:ring-orange-200 transition-all" 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                <th className="pb-6 pl-4">Affiche</th>
                                <th className="pb-6">Titre</th>
                                <th className="pb-6">Réalisateur</th>
                                <th className="pb-6 text-center">Statut</th>
                                <th className="pb-6 text-center">Date</th>
                                <th className="pb-6 text-center">En Avant</th>
                                <th className="pb-6 text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminSelection;