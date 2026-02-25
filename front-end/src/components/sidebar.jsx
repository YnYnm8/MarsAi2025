import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import dashboardd from "/src/assets/dashboardd.png"
import film from "/src/assets/film.png"
import jury from "/src/assets/jury.png"
import classement from "/src/assets/classement.png"
import calendar from "/src/assets/calendar.png"
import setting from "/src/assets/setting.png"
import statistique from "/src/assets/statistique.png"


const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // État pour gérer l'ouverture du sous-menu "Gestion Films"
    const [isFilmsOpen, setIsFilmsOpen] = useState(location.pathname.startsWith('/admin/films'));

    const menuItems = [
        {
            name: 'DASHBOARD',
            path: '/admin/dashboard',
            icon: <img src={dashboardd} alt="dashboardicon" className="w-8 h-8 object-contain" />
        },

        {
            name: 'STATISTIQUE',
            path: '/admin/statistique',
            icon: <img src={statistique} alt="statistiqueicon" className="w-8 h-8 object-contain" />
        },
        {
            name: 'GESTION FILMS',
            path: '/admin/films',
            isDropdown: true,
            icon: <img src={film} alt="" className="w-8 h-8 object-contain" />,
            subItems: [
                { name: 'SÉLECTION OFFICIELLE', path: '/admin/films/selected' },
                { name: 'REFUSÉ', path: '/admin/films/rejected' },
                { name: 'A DISCUTER', path: '/admin/films/pending' },
            ],
        },

        {
            name: 'JURY',
            path: '/admin/jury',
            icon: <img src={jury} alt="Juryicon" className="w-8 h-8 object-contain" />
        },
        {
            name: 'RÉSULTATS & CLASSEMENT',
            path: '/admin/results',
            icon: <img src={classement} alt="resulticon" className="w-8 h-8 object-contain" />
        },
        {
            name: 'ÉVÈNEMENTS',
            path: '/admin/workshop',
            icon: <img src={calendar} alt="calendaricon" className="w-8 h-8 object-contain" />
        },
        {
            name: 'CONFIGURATION',
            path: '/admin/setting',
            icon: <img src={setting} alt="settingicon" className="w-8 h-8 object-contain" />
        },
    ];

    const handleNavClick = (item) => {
        if (item.isDropdown) {
            setIsFilmsOpen(!isFilmsOpen);
            navigate(item.path);
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className="w-72 min-h-screen bg-[#1A1C1E] text-slate-400 p-6 flex flex-col border-r border-slate-800">
            <div className="mb-12 px-2">
                <Link
                    to="/"
                    className="bg-blue-600 text-white font-black py-1 px-3 rounded text-[12px] w-fit tracking-tighter uppercase hover:bg-blue-700 transition-colors cursor-pointer block"
                >
                    MARS.A.I
                </Link>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.subItems && location.pathname.startsWith(item.path));

                    return (
                        <div key={item.name} className="flex flex-col">
                            <button
                                onClick={() => handleNavClick(item)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[10px] font-bold transition-all duration-200 group
                  ${isActive && !item.isDropdown
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : (isActive && isFilmsOpen) ? 'bg-blue-500/90 text-white' : 'hover:bg-slate-800/50 hover:text-slate-200'}`}
                            >
                                <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
                                    {item.icon}
                                </span>
                                <span className="tracking-[0.1em] uppercase font-bold">{item.name}</span>
                            </button>

                            {/* SOUS-MENU (Affiche les listes si ouvert) */}
                            {item.isDropdown && isFilmsOpen && (
                                <div className="mt-2 ml-4 flex flex-col space-y-1">
                                    {item.subItems.map((sub) => {
                                        const isSubActive = location.pathname === sub.path;
                                        return (
                                            <button
                                                key={sub.name}
                                                onClick={() => navigate(sub.path)}
                                                className={`flex items-center gap-4 px-8 py-2 text-[9px] font-bold tracking-widest transition-all
                          ${isSubActive ? 'text-white' : 'text-slate-500 hover:text-blue-300'}`}
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                                                {sub.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-800/50">
                <div className="text-[9px] text-slate-600 uppercase font-black tracking-widest">
                    MARS.AI.FESTIVAL
                </div>
            </div>
        </div>
    );
};

export default Sidebar;