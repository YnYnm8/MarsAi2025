import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../../components/sidebar';
import { VITE_API_URL_FRONTEND } from '../../services/config';
const AdminPlaylist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await fetch(`${VITE_API_URL_FRONTEND}/comite/allplaylists`, { credentials: 'include' });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPlaylists(data.filter(pl => ![1, 2, 3, 4].includes(pl.id)));
                }
            } catch (err) { console.error("Erreur chargement playlists:", err); }
            finally { setLoading(false); }
        };
        fetchPlaylists();
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans text-left text-black">
            <Sidebar />
            <main className="flex-1 p-4 pt-4 pb-20 lg:pt-8 lg:pb-0 lg:p-12 overflow-y-auto">
                <div className="mb-8 lg:mb-12">
                    <h2 className="text-orange-500 font-bold mb-2 tracking-widest text-xs uppercase">Admin management</h2>
                    <h1 className="text-2xl lg:text-4xl font-black text-black mb-4 tracking-tighter uppercase">Playlists Personnalisées</h1>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 animate-pulse">
                        {[1, 2, 3].map(n => <div key={n} className="bg-white h-48 lg:h-64 rounded-[2rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                        {playlists.length > 0 ? playlists.map((pl) => (
                            <div key={pl.id} className="bg-white p-6 lg:p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between border border-transparent hover:border-blue-50">
                                <div>
                                    <div className="flex justify-between items-start mb-4 lg:mb-6">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-2xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                                            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase">ID #{pl.id}</span>
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-black text-black mb-1 uppercase tracking-tight truncate">{pl.status || pl.title || "Playlist sans titre"}</h3>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4 lg:mb-8">
                                        Par {pl.User ? `${pl.User.firstName} ${pl.User.lastName}` : "Utilisateur"} • {new Date(pl.createdAt).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                                <button onClick={() => navigate(`/admin/playlist/${pl.id}`)} className="w-full py-3 lg:py-4 bg-[#F2F2F2] hover:bg-black hover:text-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all">
                                    Consulter les films
                                </button>
                            </div>
                        )) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100 uppercase text-[10px] font-bold text-gray-400">
                                Aucune playlist personnalisée trouvée
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPlaylist;