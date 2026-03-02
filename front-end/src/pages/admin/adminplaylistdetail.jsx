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
                const response = await fetch(`http://localhost:3000/admin/playlist/${id}`, { 
                    credentials: 'include'
                });
                const result = await response.json();
                
                // Sécurité pour éviter le crash si result.data est undefined
                if (result.success && result.data) {
                    setPlaylist(result.data);
                    console.log("FILMS REÇUS :", result.data.Films);
                } else {
                    console.error("Erreur API :", result.message || "Données manquantes");
                    setPlaylist({ Films: [] });
                }
            } catch (err) {
                console.error("Erreur de récupération :", err);
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
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <button onClick={() => navigate(-1)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black mb-4 flex items-center gap-2 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                            </svg>
                            Retour
                        </button>
                        <h1 className="text-5xl font-black uppercase tracking-tighter">
                            {playlist?.status || `Playlist #${id}`}
                        </h1>
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Total</span>
                        <span className="text-3xl font-black leading-none">{playlist?.Films?.length || 0}</span>
                    </div>
                </div>

                {/* LISTE DES FILMS */}
                <div className="grid grid-cols-1 gap-4">
                    {playlist?.Films && playlist.Films.length > 0 ? (
                        playlist.Films.map((film) => (
                            <div key={film.id} className="group flex items-center justify-between p-6 bg-white rounded-[2rem] hover:bg-black hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-8">

                                    {/* POSTER */}
                                    <div className="w-20 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-inner relative">
                                        {film.posterUrl ? (
                                            <img
                                                src={film.posterUrl}
                                                alt={film.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/300x450?text=Image+Manquante';
                                                }}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-slate-400 p-2 text-center uppercase">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="font-black uppercase tracking-tight text-xl mb-1">{film.title}</h4>
                                        <p className="text-[10px] opacity-50 font-bold tracking-[0.15em] uppercase">
                                            Par {film.directorName || "Réalisateur inconnu"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => navigate(`/films/${film.id}`)}
                                        className="px-8 py-4 border-2 border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all"
                                    >
                                        Fiche
                                    </button>
                                </div>
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