import React, { useState, useEffect, } from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../../components/sidebar';

// Assets
import filmIcon from "/src/assets/film.png";
import juryIcon from "/src/assets/jury.png";
import statistiqueIcon from "/src/assets/statistique.png";
import calendarIcon from "/src/assets/calendar.png";
import iconFilm from "/src/assets/icon-film.png";
import earthIcon from "/src/assets/earth.png";

const AdminDash = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFilms: 0,
        totalSelected: 0,
        totalRejected: 0,
        totalPending: 0,
        totalSubmitted: 0,
        filmsByCountry: [],
        newUsersToday: 0,
        finishedJuries: 0,
        totalJuries: 12,
        workshopOccupation: 0,
        admin: { name: "Admin user", role: "Admin" }
    });
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/stats', {
                    credentials: 'include'
                });
                const json = await response.json();
                
                console.log("Données reçues:", json.data); 

                if (json.success) {
                    setStats(prev => ({ ...prev, ...json.data }));
                }
            } catch (err) {
                console.error("Erreur chargement stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

  

    const selected = Number(stats.totalSelected || 0);
    const rejected = Number(stats.totalRejected || 0);
    const pending = Number(stats.totalPending || 0);
    const submitted = Number(stats.totalSubmitted || 0);
    
    const totalVotes = selected + rejected + pending;
    
    // Barre de progression (Objectif 600) basée sur les votes + soumis
    const filmProgress = Math.min(Math.round(((totalVotes + submitted) / 600) * 100), 100);

    const getPercent = (value) => totalVotes > 0 ? Math.round((Number(value) / totalVotes) * 100) : 0;

    const calculateBestZone = () => {
        if (!stats.filmsByCountry || stats.filmsByCountry.length === 0) return "N/A";
        const topEntry = stats.filmsByCountry.reduce((prev, current) => {
            return (parseInt(current.count) > parseInt(prev.count)) ? current : prev;
        }, stats.filmsByCountry[0]);
        return topEntry.country || "Inconnu";
    };

    const Skeleton = ({ className }) => (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
    );

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">

                

                <div className="mb-12">
                    <h2 className="text-amber-500 font-bold mb-2 tracking-widest text-xs uppercase">ADMIN MANAGEMENT</h2>
                    <h1 className="text-4xl font-black text-black mb-4 tracking-tighter">VUE D'ENSEMBLE</h1>
                    <p className="text-gray-500 max-w-xl text-sm font-medium">Analyse détaillée de la progression du festival.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* CARD FILMS */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 group transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-center">
                            {loading ? <Skeleton className="w-8 h-8" /> : <img src={filmIcon} alt="" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />}
                            <p className="text-blue-800 font-bold text-[10px] tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">Objectif 600</p>
                        </div>
                        <div>
                            {loading ? <Skeleton className="h-10 w-20 mb-2" /> : <p className="text-4xl font-black text-black">{totalVotes}</p>}
                            <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">Films évalués par le comité</p>
                            
                            {!loading && submitted > 0 && (
                                <p className="text-orange-500 text-[9px] font-black uppercase mt-2 italic animate-pulse">
                                     {submitted} nouveaux films en submitted
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-blue-900 h-2 rounded-full transition-all duration-1000" style={{ width: `${filmProgress}%` }} />
                            </div>
                            <span className="text-[10px] font-bold w-8 text-right text-gray-400">{filmProgress}%</span>
                        </div>
                    </div>

                    {/* CARD COMITE */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 group transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-center">
                            <img src={juryIcon} alt="" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
                            <p className="text-orange-500 font-bold text-[10px] uppercase bg-orange-50 px-3 py-1 rounded-full">Quota 100/Jury</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-black">
                                {String(stats.finishedJuries || 0).padStart(2, '0')}/{String(stats.totalJuries || 12).padStart(2, '0')}
                            </p>
                            <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">Comité ayant finalisé leur lot</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div className="bg-orange-400 h-2 rounded-full transition-all" style={{ width: `${((stats.finishedJuries || 0) / (stats.totalJuries || 12)) * 100}%` }} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">{Math.round(((stats.finishedJuries || 0) / (stats.totalJuries || 12)) * 100)}%</span>
                        </div>
                    </div>

                    {/* CARD PAYS */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm group transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <img src={earthIcon} alt="" className="w-6 h-6 object-contain" />
                                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Pays représentés</p>
                            </div>
                            <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase border border-emerald-100">
                                Top : {calculateBestZone()}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-black text-black">{stats.filmsByCountry?.length || 0}</p>
                            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Nations</span>
                        </div>
                    </div>

                    {/* CARD DETAILS VOTES */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 group transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-center">
                            <img src={statistiqueIcon} alt="" className="w-6 h-6 object-contain" />
                            <p className="text-blue-800 font-bold text-[10px] uppercase bg-blue-50 px-3 py-1 rounded-full">Détails des votes</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "OUI", count: selected, color: "emerald", link: "/admin/films/selected" },
                                { label: "NON", count: rejected, color: "red", link: "/admin/films/rejected" },
                                { label: "À DISCUTER", count: pending, color: "orange", link: "/admin/films/pending" }
                            ].map((item, index) => {
                                const percentage = getPercent(item.count);
                                return (
                                    <Link key={index} to={item.link} className="flex items-center gap-4 hover:bg-gray-50 p-2 -m-2 rounded-xl transition-all">
                                        <div className={`flex items-center gap-2 w-24 text-${item.color}-600`}>
                                            <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                                            <span className="text-[10px] font-black uppercase">{item.label}</span>
                                        </div>
                                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: `${percentage}%` }} />
                                        </div>
                                        <span className="text-[10px] font-bold w-8 text-right text-gray-400">{percentage}%</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* CARD WORKSHOP */}
                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg space-y-6 group transition-all duration-300 hover:scale-[1.01]">
                        <div className="flex justify-between items-start">
                            <p className="text-blue-400 font-bold text-[10px] tracking-widest uppercase">Taux d'occupation Workshop</p>
                            <img src={calendarIcon} alt="" className="w-6 h-6 brightness-0 invert" />
                        </div>
                        <p className="text-4xl font-black">{stats.workshopOccupation || 0}%</p>
                        <div className="w-full bg-slate-700 rounded-full h-1">
                            <div className="bg-blue-400 h-1 rounded-full transition-all duration-1000" style={{ width: `${stats.workshopOccupation || 0}%` }} />
                        </div>
                        <Link to="/workshop" className="block w-full">
                            <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-3 rounded-xl w-full text-sm uppercase tracking-widest">
                                Voir tous les workshops
                            </button>
                        </Link>
                    </div>

                    {/* CARD USERS INSCRITS */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm col-span-1 md:col-span-2 flex justify-between items-center group border border-transparent transition-all duration-300 hover:shadow-md hover:border-gray-100 cursor-default">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-gray-50 rounded-xl transition-colors duration-300 group-hover:bg-blue-50">
                                {loading ? <Skeleton className="w-8 h-8" /> :
                                    <img src={iconFilm} alt="" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" />
                                }
                            </div>
                            <div>
                                {loading ? <Skeleton className="h-10 w-32 mb-2" /> : <p className="text-4xl font-black text-black">{stats.totalUsers || 0}</p>}
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Comptes utilisateurs actifs</p>
                            </div>
                        </div>
                        <div className="text-right">
                            {loading ? <Skeleton className="h-8 w-16 mb-2 ml-auto" /> : <p className="text-blue-600 text-3xl font-black">+{stats.newUsersToday || 0}</p>}
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Aujourd'hui</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDash;