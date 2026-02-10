import React, { useState, useEffect } from 'react';
// 1. Rappel de ton composant Sidebar
import Sidebar from '../../components/sidebar';

const AdminDetailsFilms = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const res = await fetch('http://localhost:3000/admin/films', { credentials: 'include' });
                const json = await res.json();
                if (json.success) setFilms(json.data);
            } catch (err) {
                console.error("Erreur films:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFilms();
    }, []);

    if (loading) return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-slate-500 font-medium tracking-tight animate-pulse">
                    CHARGEMENT DE LA FILMOGRAPHIE..
                </div>
            </div>
        </div>
    );

    return (
        // 2. Structure en Flex pour intégrer la sidebar
        <div className="flex min-h-screen bg-slate-50">

            {/* Rappel de la Sidebar */}
            <Sidebar />

            {/* Contenu principal */}
            <div className="flex-1 p-6 md:p-10 font-sans overflow-y-auto">
                <header className="max-w-7xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Details des <span className="text-blue-600">Films</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Traçabilité technique et monitoring des œuvres</p>
                </header>

                <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-[10px] text-slate-500 uppercase font-black tracking-widest border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Film ID</th>
                                <th className="px-6 py-4 border-l border-slate-100">User ID</th>
                                <th className="px-6 py-4">Titre</th>
                                <th className="px-6 py-4">Réalisateur</th>
                                <th className="px-6 py-4">Pays</th>
                                <th className="px-6 py-4">IA</th>
                                <th className="px-6 py-4 text-right">Vues</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {films.map((film) => (
                                <tr key={film.id} className="hover:bg-slate-50/80 transition-colors">
                                    {/* FILM ID */}
                                    <td className="px-6 py-4 font-mono text-[10px] text-red-600 bg-slate-50/30">
                                        #{film.id.toString().slice(0, 8)}
                                    </td>

                                    {/* USER ID */}
                                    <td className="px-6 py-4 font-mono text-[10px] text-green-700 bg-blue-50/10 border-l border-slate-100">
                                        {film.user_id || 'N/A'}
                                    </td>

                                    <td className="px-6 py-4 font-bold text-slate-800 italic uppercase text-xs tracking-tight">
                                        {film.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-slate-700 leading-none">
                                            {film.User ? `${film.User.firstName} ${film.User.lastName}` : "Anonyme"}
                                        </div>
                                        <div className="text-[10px] text-slate-400 mt-1 uppercase">
                                            {film.User?.email}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500">
                                        {film.country}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="text-[9px] px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-600 font-black uppercase">
                                            {film.generate_Ai}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right font-mono text-xs text-blue-600 font-bold">
                                        {(film.views || 0).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {films.length === 0 && (
                        <div className="p-12 text-center text-slate-400 text-sm italic font-medium">
                            Aucune donnée disponible dans la filmographie.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDetailsFilms;