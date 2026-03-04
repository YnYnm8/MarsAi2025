import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';

const AdminDetailsFilms = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const filmsPerPage = 20;

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const res = await fetch('http://localhost:3000/admin/films', { credentials: 'include' });
                const json = await res.json();
                if (json.success) setFilms(json.data);
            } catch (err) { console.error("Erreur films:", err); }
            finally { setLoading(false); }
        };
        fetchFilms();
    }, []);

    const totalPages = Math.ceil(films.length / filmsPerPage);
    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

    if (loading) return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-slate-500 font-medium tracking-tight animate-pulse">CHARGEMENT DE LA FILMOGRAPHIE..</div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 p-4 pt-4 pb-20 lg:pt-6 lg:pb-0 lg:p-10 font-sans overflow-y-auto">
                <header className="max-w-7xl mx-auto mb-6 lg:mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                        Details des <span className="text-blue-600">Films</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Traçabilité technique et monitoring des œuvres</p>
                </header>

                {/* TABLE */}
                <div className="hidden lg:block max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-[10px] text-slate-500 uppercase font-black tracking-widest border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Film ID</th>
                                <th className="px-6 py-4 border-l border-slate-100">User ID</th>
                                <th className="px-6 py-4">Titre</th>
                                <th className="px-6 py-4">Realisateur</th>
                                <th className="px-6 py-4">Pays</th>
                                <th className="px-6 py-4">IA</th>
                                <th className="px-6 py-4 text-right">Vues</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentFilms.map((film) => (
                                <tr key={film.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4 font-mono text-[10px] text-red-600 bg-slate-50/30">#{film.id.toString().slice(0, 8)}</td>
                                    <td className="px-6 py-4 font-mono text-[10px] text-green-700 bg-blue-50/10 border-l border-slate-100">{film.User?.id || film.userId || 'N/A'}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800 italic uppercase text-xs tracking-tight">{film.title}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-slate-700">{film.User ? `${film.User.firstName} ${film.User.lastName}` : "Anonyme"}</div>
                                        <div className="text-[10px] text-slate-400 mt-1 uppercase">{film.User?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{film.User?.country || "N/R"}</td>
                                    <td className="px-6 py-4"><span className="text-[9px] px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-600 font-black uppercase">{film.generateAi}</span></td>
                                    <td className="px-6 py-4 text-right font-mono text-xs text-blue-600 font-bold">{(film.views || 0).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {films.length === 0 && <div className="p-12 text-center text-slate-400 text-sm italic">Aucune donnée disponible.</div>}
                    {films.length > 0 && (
                        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{indexOfFirstFilm + 1} - {Math.min(indexOfLastFilm, films.length)} SUR {films.length}</div>
                            <div className="flex gap-2">
                                <button onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo(0, 0); }} disabled={currentPage === 1} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${currentPage === 1 ? 'text-slate-200' : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200'}`}>Précédent</button>
                                <button onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo(0, 0); }} disabled={currentPage === totalPages || totalPages === 0} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl transition-all ${(currentPage === totalPages || totalPages === 0) ? 'text-slate-200' : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200'}`}>Suivant</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* CARDS */}
                <div className="lg:hidden max-w-7xl mx-auto space-y-3">
                    {currentFilms.map((film) => (
                        <div key={film.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-800 italic uppercase text-xs truncate">{film.title}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">{film.User ? `${film.User.firstName} ${film.User.lastName}` : "Anonyme"}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">{film.User?.email}</p>
                                </div>
                                <span className="text-[9px] px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-600 font-black uppercase ml-2 flex-shrink-0">{film.generateAi}</span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div className="flex gap-3">
                                    <span className="text-[9px] font-mono text-red-600">#{film.id.toString().slice(0, 6)}</span>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">{film.User?.country || "N/R"}</span>
                                </div>
                                <span className="text-[9px] font-mono text-blue-600 font-bold">{(film.views || 0).toLocaleString()} vues</span>
                            </div>
                        </div>
                    ))}
                    {films.length === 0 && <div className="p-12 text-center text-slate-400 text-sm italic bg-white rounded-2xl">Aucune donnée disponible.</div>}
                    {films.length > 0 && (
                        <div className="flex items-center justify-between py-4">
                            <div className="text-[10px] font-black text-slate-400 uppercase">{currentPage}/{totalPages}</div>
                            <div className="flex gap-2">
                                <button onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo(0, 0); }} disabled={currentPage === 1} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl ${currentPage === 1 ? 'text-slate-200' : 'text-slate-600 hover:bg-white'}`}>Préc.</button>
                                <button onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo(0, 0); }} disabled={currentPage === totalPages || totalPages === 0} className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl ${(currentPage === totalPages || totalPages === 0) ? 'text-slate-200' : 'text-slate-600 hover:bg-white'}`}>Suiv.</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDetailsFilms;