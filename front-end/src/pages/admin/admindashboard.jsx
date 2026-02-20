import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Sidebar from '../../components/sidebar';

import filmIcon from "/src/assets/film.png";
import juryIcon from "/src/assets/jury.png";
import statistiqueIcon from "/src/assets/statistique.png";
import calendarIcon from "/src/assets/calendar.png";
import iconFilm from "/src/assets/icon-film.png";
import earthIcon from "/src/assets/earth.png"

const AdminDash = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFilms: 0,
        totalSelected: 0,
        filmsByCountry: [],
        newUsersToday: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/stats', {
                    credentials: 'include'
                });
                const json = await response.json();
                if (json.success) {
                    setStats(json.data);
                }
            } catch (err) {
                console.error("Erreur chargement stats:", err);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };
        fetchData();
    }, []);

    const filmProgress = Math.min(Math.round(((stats.totalSelected || 0) / 600) * 100), 100);

    const Skeleton = ({ className }) => (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
    );

    const calculateBestZone = () => {
        if (!stats.filmsByCountry || stats.filmsByCountry.length === 0) return "N/A";

        // On trouve l'entrée qui a le "count" le plus élevé
        const topEntry = stats.filmsByCountry.reduce((prev, current) => {
            return (parseInt(current.count) > parseInt(prev.count)) ? current : prev;
        }, stats.filmsByCountry[0]);

        return topEntry.country || "Inconnu";
    };

    const bestZone = calculateBestZone();

    return (
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans">
            <Sidebar />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-gray-400 tracking-widest font-bold text-xs uppercase">
                        Back-office Officiel
                    </h2>
                </div>

                {/* OVERVIEW SECTION */}
                <div className="mb-12">
                    <h2 className="text-orange-400 font-bold mb-2 tracking-widest text-xs">
                        ADMIN MANAGEMENT
                    </h2>
                    <h1 className="text-4xl font-black text-black mb-4 tracking-tighter">
                        VUE D'ENSEMBLE
                    </h1>
                    <p className="text-gray-500 max-w-xl text-sm font-medium">
                        Analyse détaillée de la progression du festival et des indicateurs de performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* CARD FILMS */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 group cursor-default transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-center">
                            {loading ? <Skeleton className="w-8 h-8" /> :
                                <img src={filmIcon} alt="" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" />
                            }
                            <p className="text-blue-800 font-bold text-[10px] tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
                                Objectif 600
                            </p>
                        </div>
                        <div>
                            {loading ? <Skeleton className="h-10 w-20 mb-2" /> : <p className="text-4xl font-black text-black">{stats.totalSelected || 0}</p>}
                            <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">
                                Films évalués par le comité
                            </p>
                        </div>
                        {/* BARRE DE PROGRESSION AVEC POURCENTAGE */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-blue-900 h-2 rounded-full transition-all duration-1000" style={{ width: `${filmProgress}%` }} />
                            </div>
                            <span className="text-[10px] font-bold w-8 text-right text-gray-400">{filmProgress}%</span>
                        </div>
                    </div>

                    {/* CARD COMITE */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 group cursor-default transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-center">
                            {loading ? <Skeleton className="w-8 h-8" /> :
                                <img src={juryIcon} alt="" className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" />
                            }
                            <p className="text-orange-500 font-bold text-[10px] tracking-widest uppercase bg-orange-50 px-3 py-1 rounded-full">
                                Quota 100/Juré
                            </p>
                        </div>
                        <div>
                            {loading ? <Skeleton className="h-10 w-28 mb-2" /> :
                                <p className="text-4xl font-black text-black">
                                    {String(stats.finishedJuries || 0).padStart(2, '0')}/{String(stats.totalJuries || 12).padStart(2, '0')}
                                </p>
                            }
                            <p className="text-gray-400 text-[10px] font-bold uppercase mt-1">
                                Comité ayant finalisé leur lot
                            </p>
                        </div>
                        {/* BARRE DE PROGRESSION AVEC POURCENTAGE CALCULÉ */}
                        <div className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-orange-400 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${((stats.finishedJuries || 0) / (stats.totalJuries || 12)) * 100}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-bold w-8 text-right text-gray-400">
                                {Math.round(((stats.finishedJuries || 0) / (stats.totalJuries || 12)) * 100)}%
                            </span>
                        </div>
                    </div>

                    {/* CARD PAYS */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm group cursor-default transition-all duration-300 hover:shadow-md flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    {loading ? <Skeleton className="w-6 h-6" /> :
                                        <img src={earthIcon} alt="" className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110" />
                                    }
                                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">Pays représentés</p>
                                </div>

                                {/* LE BADGE DYNAMIQUE */}
                                {!loading && stats.filmsByCountry?.length > 0 && (
                                    <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase tracking-tighter border border-emerald-100">
                                        Top : {bestZone}
                                    </span>
                                )}
                            </div>

                            <div>
                                {loading ? (
                                    <Skeleton className="h-10 w-16" />
                                ) : (
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl font-black text-black">{stats.filmsByCountry?.length || 0}</p>
                                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Nations</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Barre verte */}
                        <div className="w-full bg-gray-50 h-1 rounded-full mt-4 overflow-hidden">
                            <div className="bg-emerald-400 h-full w-1/2 rounded-full opacity-50" />
                        </div>
                    </div>

                    {/* CARD STATS PLAYLIST */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 group cursor-default transition-all duration-300 hover:shadow-md">
                        <div className="flex justify-between items-center">
                            {loading ? <Skeleton className="w-6 h-6" /> :
                                <img src={statistiqueIcon} alt="" className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110" />
                            }
                            <p className="text-blue-800 font-bold text-[10px] tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
                                Détails des votes
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "OUI", percent: filmProgress, color: "green", link: "/admin/films/selected" },
                                { label: "NON", percent: 25, color: "red", link: "/admin/films/rejected" },
                                { label: "À DISCUTER", percent: 15, color: "orange", link: "/admin/films/pending" }
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.link}
                                    className={`flex items-center gap-4 hover:bg-gray-50 p-2 -m-2 rounded-xl transition-all duration-200 hover:scale-[1.05] hover:shadow-sm`}
                                >
                                    <div className={`flex items-center gap-2 w-24 text-${item.color}-600`}>
                                        <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                                        <span className="text-[10px] font-black uppercase">{item.label}</span>
                                    </div>
                                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: `${item.percent}%` }} />
                                    </div>
                                    <span className="text-[10px] font-bold w-8 text-right text-gray-400">{item.percent}%</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CARD WORKSHOP */}
                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg space-y-6 group relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-blue-400 font-bold text-[10px] tracking-widest uppercase">
                                    Taux d'occupation Workshop
                                </p>
                                {loading ? <Skeleton className="w-6 h-6 bg-slate-700" /> :
                                    <img src={calendarIcon} alt="" className="w-6 h-6 object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-110" />
                                }
                            </div>
                            {loading ? <Skeleton className="h-10 w-24 mb-3 bg-slate-700" /> : <p className="text-4xl font-black mb-3">{stats.workshopOccupation || 0}%</p>}
                            <div className="w-full bg-slate-700 rounded-full h-1 mb-6">
                                <div className="bg-blue-400 h-1 rounded-full" style={{ width: `${stats.workshopOccupation || 0}%` }} />
                            </div>
                            <Link to="/workshop">
                                <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-3 rounded-xl w-full text-m uppercase tracking-widest active:scale-95">
                                    Voir tous les workshops
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* CARD Director */}
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
                            <p className="text-gray-400 text-[10px] font-bold uppercase">Aujourd'hui</p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default AdminDash;