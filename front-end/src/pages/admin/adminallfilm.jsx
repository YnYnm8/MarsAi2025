import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/sidebar.jsx';
import { getStatusDetails } from '../../../../back-end/services/statutHelper.mjs';

const AdminAllFilms = () => {
    const [allFilms, setAllFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Etats pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 20;

    const fetchAllFilms = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/films', {
                credentials: 'include'
            });
            const json = await response.json();
            let data = Array.isArray(json) ? json : (json.data || []);
            setAllFilms(data);
        } catch (err) {
            console.error("Erreur chargement films:", err);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        fetchAllFilms();
    }, []);

    // Reset à la page 1 quand on recherche
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredFilms = allFilms.filter(film => {
        const title = film.title || "";
        const director = film.User ? `${film.User.firstName} ${film.User.lastName}` : "";
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            director.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const totalPages = Math.ceil(filteredFilms.length / filmsPerPage);
    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-left relative">
            <Sidebar />
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="mb-12">
                    <h2 className="text-orange-400 font-bold mb-2 tracking-widest text-xs uppercase">ADMIN MANAGEMENT</h2>
                    <h1 className="text-4xl font-black text-black mb-4 tracking-tighter uppercase">TOUS LES FILMS</h1>
                </div>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Rechercher par titre ou réalisateur..."
                        className="w-full p-4 rounded-2xl bg-white text-black border-none shadow-sm text-sm outline-none focus:ring-2 focus:ring-orange-200 transition-all"
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
                                <th className="pb-6 text-right pr-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan="6" className="py-4"><div className="animate-pulse bg-gray-200 h-12 w-full rounded-xl"></div></td></tr>
                                ))
                            ) : currentFilms.length === 0 ? (
                                <tr><td colSpan="6" className="py-10 text-center text-gray-400 text-sm italic">Aucun film trouvé</td></tr>
                            ) : (
                                currentFilms.map((film) => {
                                    const rawPoster = film.Files?.[0]?.poster_url;
                                    const poster = rawPoster
                                        ? (rawPoster.startsWith('http') ? rawPoster : `http://localhost:3000${rawPoster}`)
                                        : "/src/assets/youtube.png";
                                    const { label, classes } = getStatusDetails(film.status);
                                    return (
                                        <tr key={film.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="py-5 pl-4">
                                                <div className="w-14 h-9 overflow-hidden rounded-lg bg-gray-100 border border-gray-50 shadow-sm">
                                                    <img src={poster} className="h-full w-full object-cover" alt="poster" onError={(e) => { e.target.src = "/src/assets/youtube.png"; }} />
                                                </div>
                                            </td>
                                            <td className="py-5 text-[11px] font-black uppercase text-black">{film.title || "SANS TITRE"}</td>
                                            <td className="py-5 text-[10px] font-bold text-gray-800 uppercase">
                                                {film.User ? `${film.User.firstName} ${film.User.lastName}` : "N/A"}
                                            </td>
                                            <td className="py-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${classes}`}>{label}</span>
                                            </td>
                                            <td className="py-5 text-center text-[10px] font-bold text-gray-400">
                                                {new Date(film.createdAt).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="py-5 text-right pr-4">
                                                <div className="flex items-center justify-end">
                                                    <button
                                                        onClick={() => navigate(`/films/${film.id}`)}
                                                        className="p-2 rounded-xl text-gray-300 hover:bg-gray-100 hover:text-black transition-all"
                                                        title="Détails"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>

                    {/* BLOC PAGINATION */}
                    {!loading && totalPages > 1 && (
                        <div className="flex items-center justify-between mt-8 px-4 pb-4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Page {currentPage} sur {totalPages} ({filteredFilms.length} films)
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-xl transition-all ${currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'text-black hover:bg-gray-100'}`}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-xl transition-all ${currentPage === totalPages ? 'opacity-20 cursor-not-allowed' : 'text-black hover:bg-gray-100'}`}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminAllFilms;