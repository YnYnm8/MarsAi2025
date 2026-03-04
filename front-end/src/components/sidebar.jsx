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
    const [isFilmsOpen, setIsFilmsOpen] = useState(
        location.pathname.startsWith('/admin/films') || location.pathname.startsWith('/admin/playlists')
    );
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isFilmsSlideOpen, setIsFilmsSlideOpen] = useState(false);

    const menuItems = [
        {
            name: 'DASHBOARD',
            path: '/admin/dashboard',
            icon: <img src={dashboardd} alt="dashboardicon" className="w-6 h-6 object-contain" />
        },
        {
            name: 'STATISTIQUE',
            path: '/admin/statistique',
            icon: <img src={statistique} alt="statistiqueicon" className="w-6 h-6 object-contain" />
        },
        {
            name: 'GESTION FILMS',
            path: '/admin/films',
            isDropdown: true,
            icon: <img src={film} alt="" className="w-6 h-6 object-contain" />,
            subItems: [
                { name: 'TOUS LES FILMS', path: '/admin/films' },
                { name: 'SÉLECTION OFFICIELLE', path: '/admin/films/selected' },
                { name: 'REFUSÉ', path: '/admin/films/rejected' },
                { name: 'A DISCUTER', path: '/admin/films/pending' },
                { name: 'PLAYLISTS', path: '/admin/playlists' },
            ],
        },
        {
            name: 'JURY',
            path: '/admin/jury',
            icon: <img src={jury} alt="Juryicon" className="w-6 h-6 object-contain" />
        },
        {
            name: 'RÉSULTATS & CLASSEMENT',
            path: '/admin/results',
            icon: <img src={classement} alt="resulticon" className="w-6 h-6 object-contain" />
        },
        {
            name: 'ÉVÈNEMENTS',
            path: '/admin/workshop',
            icon: <img src={calendar} alt="calendaricon" className="w-6 h-6 object-contain" />
        },
        {
            name: 'CONFIGURATION',
            path: '/admin/setting',
            icon: <img src={setting} alt="settingicon" className="w-6 h-6 object-contain" />
        },
    ];

    const handleNavClick = (item) => {
        if (item.isDropdown) {
            setIsFilmsOpen(!isFilmsOpen);
            navigate(item.path);
        } else {
            navigate(item.path);
            setIsMobileOpen(false);
        }
    };

    const handleSubClick = (path) => {
        navigate(path);
        setIsMobileOpen(false);
    };

    const SidebarContent = () => (
        <>
            <div className="mb-12 px-2">
                <Link
                    to="/"
                    onClick={() => setIsMobileOpen(false)}
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
                                className={`w-full flex items-center gap-4 px-4 py-3 cursor-pointer rounded-xl text-[10px] font-bold transition-all duration-200 group
                                    ${isActive && !item.isDropdown
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : (isActive && isFilmsOpen) ? 'bg-blue-500/90 text-white' : 'hover:bg-slate-800/50 hover:text-slate-200'}`}
                            >
                                <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>
                                    {item.icon}
                                </span>
                                <span className="tracking-[0.1em] uppercase font-bold">{item.name}</span>
                            </button>
                            {item.isDropdown && isFilmsOpen && (
                                <div className="mt-2 ml-4 flex flex-col space-y-1">
                                    {item.subItems.map((sub) => {
                                        const isSubActive = location.pathname === sub.path;
                                        return (
                                            <button
                                                key={sub.name}
                                                onClick={() => handleSubClick(sub.path)}
                                                className={`flex items-center cursor-pointer gap-4 px-8 py-2 text-[9px] font-bold tracking-widest transition-all
                                                    ${isSubActive ? 'text-white' : 'text-slate-500 hover:text-blue-300'}`}
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                                </svg>
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
        </>
    );

    return (
        <>
            {/* BOUTON HAMBURGER */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="hidden fixed top-4 left-4 z-[200] w-10 h-10 bg-[#1A1C1E] border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-colors shadow-lg"
                aria-label="Menu"
            >
                {isMobileOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* OVERLAY sidebar mobile */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* SIDEBAR MOBILE */}
            <div className={`
                lg:hidden fixed top-0 left-0 z-[150] h-full w-72 bg-[#1A1C1E] text-slate-400 p-6 flex flex-col border-r border-slate-800
                transition-transform duration-300 ease-in-out
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <SidebarContent />
            </div>

            {/* SIDEBAR DESKTOP */}
            <div className="hidden lg:flex w-72 min-h-screen bg-[#1A1C1E] text-slate-400 p-6 flex-col border-r border-slate-800 flex-shrink-0">
                <SidebarContent />
            </div>

            {/* OVERLAY SLIDE*/}
            {isFilmsSlideOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-[148] bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsFilmsSlideOpen(false)}
                />
            )}

            {/* Films + Stats */}
            <div className={`
                lg:hidden fixed left-0 right-0 z-[149] bg-[#1A1C1E] border-t border-slate-700 rounded-t-3xl
                transition-transform duration-300 ease-in-out
                ${isFilmsSlideOpen ? 'translate-y-0' : 'translate-y-full'}
            `} style={{ bottom: '64px' }}>
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 bg-slate-600 rounded-full" />
                </div>
                <div className="px-4 pb-4 pt-2">
                    {/* Section Films */}
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 px-2">Gestion Films</p>
                    {[
                        { name: 'TOUS LES FILMS',      path: '/admin/films',          color: 'text-blue-400',   bg: 'bg-blue-500/10',   dot: 'bg-blue-500',   exact: true },
                        { name: 'SÉLECTION OFFICIELLE', path: '/admin/films/selected', color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
                        { name: 'REFUSÉ',               path: '/admin/films/rejected', color: 'text-rose-400',   bg: 'bg-rose-500/10',   dot: 'bg-rose-500'   },
                        { name: 'À DISCUTER',           path: '/admin/films/pending',  color: 'text-amber-400',  bg: 'bg-amber-500/10',  dot: 'bg-amber-500'  },
                        { name: 'PLAYLISTS',            path: '/admin/playlists',      color: 'text-purple-400', bg: 'bg-purple-500/10', dot: 'bg-purple-500' },
                    ].map((item) => {
                        const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
                        return (
                            <button
                                key={item.path}
                                onClick={() => { navigate(item.path); setIsFilmsSlideOpen(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all ${isActive ? item.bg : 'hover:bg-slate-800/50'}`}
                            >
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dot}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? item.color : 'text-slate-400'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <svg className={`w-3 h-3 ml-auto ${item.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}

                    {/* Séparateur */}
                    <div className="border-t border-slate-800 my-3" />

                    {/* Section Statistique */}
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 px-2">Analyse</p>
                    {(() => {
                        const isActive = location.pathname === '/admin/statistique';
                        return (
                            <button
                                onClick={() => { navigate('/admin/statistique'); setIsFilmsSlideOpen(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-sky-500/10' : 'hover:bg-slate-800/50'}`}
                            >
                                <span className="w-2 h-2 rounded-full flex-shrink-0 bg-sky-500" />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
                                    STATISTIQUE
                                </span>
                                {isActive && (
                                    <svg className="w-3 h-3 ml-auto text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })()}
                </div>
            </div>

            {/* ── BOTTOM NAV mobile ── */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-[#1A1C1E] border-t border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
                <div className="flex items-stretch h-16">
                    {[
                        {
                            label: 'Dashboard', path: '/admin/dashboard', exact: true,
                            icon: (a) => <svg className={`w-5 h-5 ${a ? 'text-blue-500' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        },
                        {
                            label: 'Films', path: '/admin/films', isFilmsMenu: true,
                            icon: (a) => <svg className={`w-5 h-5 ${a ? 'text-blue-500' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                        },
                        {
                            label: 'Sélection', path: '/admin/films/selected',
                            icon: (a) => <svg className={`w-5 h-5 ${a ? 'text-emerald-500' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        },
                        {
                            label: 'Refusés', path: '/admin/films/rejected',
                            icon: (a) => <svg className={`w-5 h-5 ${a ? 'text-rose-500' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        },
                        {
                            label: 'À discuter', path: '/admin/films/pending',
                            icon: (a) => <svg className={`w-5 h-5 ${a ? 'text-amber-500' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={a ? 2.5 : 2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        },
                    ].map((item) => {
                        const active = item.isFilmsMenu
                            ? isFilmsSlideOpen
                            : (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path));
                        return (
                            <button
                                key={item.path}
                                onClick={() => {
                                    if (item.isFilmsMenu) {
                                        setIsFilmsSlideOpen(!isFilmsSlideOpen);
                                    } else {
                                        navigate(item.path);
                                        setIsFilmsSlideOpen(false);
                                    }
                                }}
                                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-200 relative ${active ? 'bg-slate-800/60' : ''}`}
                            >
                                {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-blue-500" />}
                                {item.icon(active)}
                                <span className={`text-[7px] font-black uppercase tracking-wide leading-none ${active ? 'text-blue-400' : 'text-slate-500'}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
                {/* Safe area iPhone */}
                <div style={{ height: 'env(safe-area-inset-bottom)' }} className="bg-[#1A1C1E]" />
            </nav>
        </>
    );
};
export default Sidebar;