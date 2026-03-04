import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Sidebar from '../../components/sidebar';

const AdminPlaylistDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylistFilms = async () => {
            try {
                const response = await fetch(`http://localhost:3004/admin/playlist/${id}`, { credentials: 'include' });
                const result = await response.json();
                if (result.success && result.data) {
                    setPlaylist(result.data);
                } else {
                    setPlaylist({ Films: [] });
                }
            } catch (err) {
                setPlaylist({ Films: [] });
            } finally {
                setLoading(false);
            }
        };
        fetchPlaylistFilms();
    }, [id]);

    if (loading) return (
        <div className="flex min-h-screen bg-[#F2F2F2]">
            <Sidebar />
            <main className="flex-1 p-12 flex items-center justify-center">
                <div className="font-black uppercase text-xs tracking-[0.3em] animate-pulse">Chargement des films...</div>
            </main>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-left text-black">
            <Sidebar />
            <main className="flex-1 p-4 pt-4 pb-20 lg:pt-8 lg:pb-0 lg:p-12 overflow-y-auto">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-8 lg:mb-12">
                    <div>
                        <button onClick={() => navigate(-1)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black mb-3 lg:mb-4 flex items-center gap-2 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                            </svg>
                            Retour
                        </button>
                        <h1 className="text-2xl lg:text-5xl font-black uppercase tracking-tighter">
                            {playlist?.status || `Playlist #${id}`}
                        </h1>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Total</span>
                        <span className="text-2xl lg:text-3xl font-black leading-none">{playlist?.Films?.length || 0}</span>
                    </div>
                </div>

                {/* LISTE DES FILMS */}
                <div className="grid grid-cols-1 gap-3 lg:gap-4">
                    {playlist?.Films && playlist.Films.length > 0 ? (
                        playlist.Films.map((film) => (
                            <div key={film.id} className="group flex items-center justify-between p-4 lg:p-6 bg-white rounded-2xl lg:rounded-[2rem] hover:bg-black hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-4 lg:gap-8 flex-1 min-w-0">
                                    {/* POSTER */}
                                    <div className="w-12 h-16 lg:w-20 lg:h-24 bg-slate-100 rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200">
                                        {film.posterUrl ? (
                                            <img src={film.posterUrl} alt={film.title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x450'; }} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-slate-400 p-1 text-center uppercase">No Image</div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-black uppercase tracking-tight text-base lg:text-xl mb-1 truncate">{film.title}</h4>
                                        <p className="text-[10px] opacity-50 font-bold tracking-[0.15em] uppercase">
                                            Par {film.directorName || "Réalisateur inconnu"}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => navigate(`/films/${film.id}`)} className="ml-4 px-4 lg:px-8 py-3 lg:py-4 border-2 border-slate-200 rounded-xl lg:rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all flex-shrink-0">
                                    Fiche
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Aucun film dans cette playlist</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPlaylistDetail;