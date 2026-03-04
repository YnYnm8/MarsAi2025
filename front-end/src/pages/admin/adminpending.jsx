import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/sidebar.jsx';
import { getStatusDetails } from '../../services/statusHelper.js';

const AdminPending = () => {
    const [pendingFilms, setSelections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalConfig, setModalConfig] = useState({ isOpen: false, filmId: null, newStatus: null, title: "", message: "", colorClass: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 20;
    const navigate = useNavigate();

    const fetchFilmsToDiscuss = async () => {
        try {
            const response = await fetch('http://localhost:3004/admin/films/pending', { credentials: 'include' });
            const json = await response.json();
            let data = [];
            if (json.success && Array.isArray(json.data)) data = json.data;
            else if (json.data && Array.isArray(json.data)) data = json.data;
            else if (Array.isArray(json)) data = json;
            setSelections(data);
        } catch (err) { console.error("Erreur:", err); }
        finally { setTimeout(() => setLoading(false), 500); }
    };

    useEffect(() => { fetchFilmsToDiscuss(); }, []);
    useEffect(() => { setCurrentPage(1); }, [searchTerm]);

    const openDecisionModal = (filmId, status) => {
        const isAccepting = status === 'selected';
        setModalConfig({
            isOpen: true, filmId, newStatus: status,
            title: isAccepting ? "Sélectionner ce film ?" : "Refuser ce film ?",
            message: isAccepting ? "Le film sera officiellement ajouté à la sélection officiel." : "Le film sera déplacé dans la liste des refusés.",
            colorClass: isAccepting ? "emerald" : "rose"
        });
    };

    const confirmDecision = async () => {
        const { filmId, newStatus } = modalConfig;
        const playlistId = newStatus === 'selected' ? 2 : 3;
        try {
            const response = await fetch(`http://localhost:3004/admin/films/${filmId}/status`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playlistId }), credentials: 'include'
            });
            if (response.ok) {
                setSelections(prev => prev.filter(f => f.id !== filmId));
                setModalConfig({ ...modalConfig, isOpen: false });
            } else alert("Erreur lors de la mise à jour");
        } catch (err) { console.error("Erreur statut:", err); }
    };

    const formatDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR') : "N/C";
    const getPoster = (film) => {
        const raw = film.Files?.[0]?.poster_url || film.poster_url;
        return raw ? (raw.startsWith('http') ? raw : `http://localhost:3004${raw}`) : "/src/assets/youtube.png";
    };

    const filteredFilms = pendingFilms.filter(film => {
        const search = searchTerm.toLowerCase();
        return (film.title?.toLowerCase() || "").includes(search) ||
            (film.User?.firstName?.toLowerCase() || "").includes(search) ||
            (film.User?.lastName?.toLowerCase() || "").includes(search);
    });

    const totalPages = Math.ceil(filteredFilms.length / filmsPerPage);
    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

    const Skeleton = () => (
        <div className="animate-pulse bg-white rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2"><div className="h-3 bg-gray-200 rounded w-3/4" /><div className="h-2 bg-gray-200 rounded w-1/2" /></div>
        </div>
    );

    const PaginationBar = () => (
        <div className="flex items-center justify-between px-2 py-4 border-t border-gray-50">
            <div className="text-[10px] font-bold text-gray-400 uppercase hidden sm:block">{indexOfFirstFilm + 1} - {Math.min(indexOfLastFilm, filteredFilms.length)} SUR {filteredFilms.length}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase sm:hidden">{currentPage}/{totalPages}</div>
            <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 text-[10px] font-black uppercase rounded-xl disabled:text-gray-200">Préc.</button>
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 text-[10px] font-black uppercase rounded-xl disabled:text-gray-200">Suiv.</button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-left relative">
            <Sidebar />
            <main className="flex-1 p-4 pt-4 pb-20 lg:pt-8 lg:pb-0 lg:p-12 overflow-y-auto">
                <div className="mb-8">
                    <h2 className="text-amber-500 font-bold mb-2 tracking-widest text-xs uppercase">Admin management</h2>
                    <h1 className="text-2xl lg:text-4xl font-black text-black mb-4 tracking-tighter uppercase">FILMS À DISCUTER</h1>
                </div>
                <div className="mb-6">
                    <input type="text" placeholder="Rechercher dans les à discuter..."
                        className="w-full p-4 rounded-2xl bg-white text-black shadow-sm text-sm outline-none focus:ring-2 focus:ring-amber-200 transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* TABLE */}
                <div className="hidden lg:block bg-white rounded-[2rem] shadow-sm overflow-hidden p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                <th className="pb-6 pl-4">Affiche</th><th className="pb-6">Titre</th><th className="pb-6">Réalisateur</th>
                                <th className="pb-6 text-center">Statut</th><th className="pb-6 text-center">Date</th>
                                <th className="pb-6 text-center">Décision</th><th className="pb-6 text-right pr-4">Détails</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? [...Array(5)].map((_, i) => (
                                <tr key={i}><td colSpan="7" className="py-4"><div className="animate-pulse bg-gray-200 h-12 w-full rounded-xl" /></td></tr>
                            )) : filteredFilms.length === 0 ? (
                                <tr><td colSpan="7" className="py-10 text-center text-gray-400 text-sm italic">Aucun film en attente de décision</td></tr>
                            ) : currentFilms.map((film) => {
                                const { label, classes } = getStatusDetails(film.status);
                                return (
                                    <tr key={film.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-5 pl-4"><div className="w-14 h-9 overflow-hidden rounded-lg bg-gray-100 border border-gray-50 shadow-sm"><img src={getPoster(film)} className="h-full w-full object-cover" alt="poster" onError={(e) => { e.target.src = "/src/assets/youtube.png"; }} /></div></td>
                                        <td className="py-5"><p className="font-black text-[11px] text-black uppercase">{film.title || "SANS TITRE"}</p></td>
                                        <td className="py-5 text-[10px] font-bold text-gray-800 uppercase">{film.User ? `${film.User.firstName} ${film.User.lastName}` : "N/A"}</td>
                                        <td className="py-5 text-center"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${classes}`}>{label}</span></td>
                                        <td className="py-5 text-center text-[10px] font-bold text-gray-400">{formatDate(film.createdAt)}</td>
                                        <td className="py-5 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => openDecisionModal(film.id, 'selected')} className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                </button>
                                                <button onClick={() => openDecisionModal(film.id, 'rejected')} className="p-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-5 text-right pr-4">
                                            <button onClick={() => navigate(`/films/${film.id}`)} className="text-gray-300 hover:text-black transition-colors">
                                                <svg className="h-5 w-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {!loading && filteredFilms.length > 0 && <PaginationBar />}
                </div>

                {/* CARDS */}
                <div className="lg:hidden space-y-3">
                    {loading ? [...Array(5)].map((_, i) => <Skeleton key={i} />) :
                        filteredFilms.length === 0 ? (
                            <div className="py-10 text-center text-gray-400 text-sm italic bg-white rounded-2xl">Aucun film en attente</div>
                        ) : currentFilms.map((film) => {
                            const { label, classes } = getStatusDetails(film.status);
                            return (
                                <div key={film.id} className="bg-white rounded-2xl p-4 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-10 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                                            <img src={getPoster(film)} className="h-full w-full object-cover" alt="poster" onError={(e) => { e.target.src = "/src/assets/youtube.png"; }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-[11px] text-black uppercase truncate">{film.title || "SANS TITRE"}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{film.User ? `${film.User.firstName} ${film.User.lastName}` : "N/A"}</p>
                                        </div>
                                        <button onClick={() => navigate(`/films/${film.id}`)} className="text-gray-300 hover:text-black flex-shrink-0">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${classes}`}>{label}</span>
                                            <span className="text-[9px] text-gray-400 font-bold">{formatDate(film.createdAt)}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openDecisionModal(film.id, 'selected')} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase hover:bg-emerald-100 transition-colors">
                                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                OUI
                                            </button>
                                            <button onClick={() => openDecisionModal(film.id, 'rejected')} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-[9px] font-black uppercase hover:bg-rose-100 transition-colors">
                                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                                NON
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {!loading && filteredFilms.length > 0 && <PaginationBar />}
                </div>
            </main>

            {modalConfig.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
                    <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center">
                        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${modalConfig.colorClass === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {modalConfig.colorClass === 'emerald'
                                ? <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                : <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            }
                        </div>
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-3">{modalConfig.title}</h3>
                        <p className="text-[13px] text-gray-500 mb-8 font-medium leading-relaxed">{modalConfig.message}</p>
                        <div className="flex gap-4">
                            <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:bg-gray-100 transition-all">Annuler</button>
                            <button onClick={confirmDecision} className={`flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase text-white shadow-xl transition-all ${modalConfig.colorClass === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPending;