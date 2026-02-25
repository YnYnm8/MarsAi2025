import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/sidebar.jsx';
import { getStatusDetails } from '../../../../back-end/services/statutHelper.mjs';

const Adminrejected = () => {
    const [rejectedFilms, setrejectedFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilmId, setSelectedFilmId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 20;

    // recupere les films refuser
    const fetchrejected = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/films/rejected', {
                credentials: 'include'
            });
            
            const json = await response.json();
            console.log(json);

            let data = Array.isArray(json) ? json : (json.data || []);
            
            setrejectedFilms(data);
        } catch (err) {
            console.error("❌ Erreur lors du fetch :", err);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        fetchrejected();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const openModal = (id) => {
        setSelectedFilmId(id);
        setIsModalOpen(true);
    };

    const confirmRestore = async () => {
        try {
            const response = await fetch(`http://localhost:3000/admin/films/${selectedFilmId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'pending' }),
                credentials: 'include'
            });
            if (response.ok) {
                setrejectedFilms(prev => prev.filter(f => f.id !== selectedFilmId));
                setIsModalOpen(false);
                setSelectedFilmId(null);
            }
        } catch (err) {
            console.error("Erreur restauration:", err);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/C";
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const Skeleton = ({ className }) => (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
    );

    const filteredFilms = rejectedFilms.filter(film => {
        const search = searchTerm.toLowerCase();
        const title = film.title?.toLowerCase() || "";
        const firstName = film.User?.firstName?.toLowerCase() || "";
        const lastName = film.User?.lastName?.toLowerCase() || "";
        return title.includes(search) || firstName.includes(search) || lastName.includes(search);
    });

    const totalPages = Math.ceil(filteredFilms.length / filmsPerPage);
    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-left">
            <Sidebar />
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="mb-12">
                    <h2 className="text-amber-500 font-bold mb-2 tracking-widest text-xs uppercase">ADMIN MANAGEMENT</h2>
                    <h1 className="text-4xl font-black text-black mb-4 tracking-tighter uppercase">FILMS REFUSÉS</h1>
                </div>

                <div className="mb-8">
                    <input 
                        type="text" 
                        placeholder="Rechercher dans les refusés..." 
                        className="w-full p-4 rounded-2xl bg-white text-black border-none shadow-sm text-sm outline-none focus:ring-2 focus:ring-orange-200 transition-all" 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50 text-left">
                                <th className="pb-6 pl-4">Affiche</th>
                                <th className="pb-6">Titre</th>
                                <th className="pb-6">Réalisateur</th>
                                <th className="pb-6 text-center">Statut</th>
                                <th className="pb-6 text-center">Date</th>
                                <th className="pb-6 text-center">Restaurer</th>
                                <th className="pb-6 text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan="7" className="py-4"><Skeleton className="h-12 w-full rounded-xl" /></td></tr>
                                ))
                            ) : filteredFilms.length === 0 ? (
                                <tr><td colSpan="7" className="py-10 text-center text-gray-400 text-sm italic">Aucun film trouvé</td></tr>
                            ) : (
                                currentFilms.map((film) => {
                                    const poster = film.Files?.[0]?.poster_url || film.poster_url || "/src/assets/youtube.png";
                                    const { label, classes } = getStatusDetails(film.status);
                                    
                                    return (
                                        <tr key={film.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="py-5 pl-4">
                                                <div className="w-14 h-9 overflow-hidden rounded-lg bg-gray-100 shadow-sm border border-gray-50">
                                                    <img 
                                                        src={poster} 
                                                        className="h-full w-full object-cover" 
                                                        alt="poster" 
                                                        onError={(e) => { 
                                                            console.log(`❌ Image non trouvée pour : ${film.title}`);
                                                            e.target.src = "/src/assets/youtube.png"; 
                                                        }} 
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-5 text-left uppercase font-black text-[11px] leading-tight text-black">{film.title || "SANS TITRE"}</td>
                                            <td className="py-5 text-left text-[10px] font-bold text-gray-800 uppercase">{film.User ? `${film.User.firstName} ${film.User.lastName}` : "N/A"}</td>
                                            <td className="py-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${classes}`}>{label}</span>
                                            </td>
                                            <td className="py-5 text-center text-[10px] font-bold text-gray-400">{formatDate(film.createdAt)}</td>
                                            <td className="py-5 text-center">
                                                <button onClick={() => openModal(film.id)} className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors mx-auto flex items-center justify-center">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td className="py-5 text-right pr-4">
                                                <button onClick={() => navigate(`/films/${film.id}`)} className="text-gray-300 hover:text-black transition-colors transform hover:scale-110">
                                                    <svg className="h-5 w-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>

                    {/* PAGINATION */}
                    {!loading && (
                        <div className="mt-8 flex items-center justify-between px-4 py-4 border-t border-gray-50">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left">
                                {filteredFilms.length > 0 ? indexOfFirstFilm + 1 : 0} - {Math.min(indexOfLastFilm, filteredFilms.length)} SUR {filteredFilms.length}
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                    disabled={currentPage === 1} 
                                    className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${currentPage === 1 ? 'text-gray-200' : 'text-black hover:bg-gray-100'}`}
                                >
                                    Précédent
                                </button>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                    disabled={currentPage === totalPages || totalPages === 0} 
                                    className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${(currentPage === totalPages || totalPages === 0) ? 'text-gray-200' : 'text-black hover:bg-gray-100'}`}
                                >
                                    Suivant
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* MODALE DE CONFIRMATION */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center border border-white/20">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
                            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-3">Restaurer ?</h3>
                        <p className="text-[13px] text-gray-500 mb-10 font-medium leading-relaxed">
                            Voulez-vous remettre ce film en <span className="text-amber-600 font-bold uppercase ">Discussion</span> ?
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:bg-gray-100 transition-all">Annuler</button>
                            <button onClick={confirmRestore} className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase bg-black text-white hover:bg-gray-900 shadow-xl shadow-gray-200 transition-all">Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Adminrejected;