import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../../components/sidebar.jsx';

const Admin = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalFilms: 0,
        totalViews: 0,
        totalShares: 0,
        filmsByCountry: [],
        toolsUsage: []
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const roleStyles = {
        admin: "bg-red-100 text-red-700 border-red-200",
        director: "bg-purple-100 text-purple-700 border-purple-200",
        committee: "bg-amber-100 text-amber-700 border-amber-200",
        visitor: "bg-slate-100 text-slate-700 border-slate-200",
        default: "bg-blue-100 text-blue-700 border-blue-200"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statsRes, usersRes] = await Promise.all([
                    fetch('http://localhost:3000/admin/stats', { credentials: 'include' }),
                    fetch('http://localhost:3000/admin/users', { credentials: 'include' })
                ]);

                if (!statsRes.ok || !usersRes.ok) throw new Error("Erreur serveur");

                const statsJson = await statsRes.json();
                const usersJson = await usersRes.json();

                const finalStats = statsJson.success ? statsJson.data : statsJson;
                const finalUsers = usersJson.success ? usersJson.data : usersJson;

                setStats(finalStats);
                setUsers(Array.isArray(finalUsers) ? finalUsers : []);

            } catch (err) {
                setError("Accès refusé ou serveur hors ligne");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onUpdateRole = async (userId, newRole) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });
            if (response.ok) {
                setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            }
        } catch (err) { alert("Erreur de mise à jour"); }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 font-medium tracking-tight">CHARGEMENT DU SYSTÈME...</p>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Affichage de la Sidebar */}
            <Sidebar />

            {/* Contenu principal (tes stats et ton tableau) */}
            <div className="flex-1 text-slate-900 p-6 md:p-10 font-sans overflow-y-auto">

                <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            ADMIN <span className="text-orange-600">MANAGEMENT</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">Analyse détaillée de la progression du festival et des indicateurs de performance</p>
                    </div>
                    {error && (
                        <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span> {error}
                        </div>
                    )}
                </header>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 ">

                    {/* --- Sidebar Stats --- */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1 ">Global Stats</h2>

                        <CompactStat label="Total Users" value={stats.totalUsers} color="blue" />

                        {/* Details Films */}
                        <div className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-indigo-400">
                            <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1">Movies</p>
                            <p className="text-2xl font-bold font-mono text-indigo-600 ">
                                {(stats.totalFilms || 0).toLocaleString()}
                            </p>
                            <button
                                onClick={() => navigate('/admin/detailsfilms')}
                                className="mt-3 w-full py-2 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-tighter"
                            >
                                Details films →
                            </button>
                        </div>

                        <CompactStat label="Views" value={stats.totalViews} color="emerald" />
                        <CompactStat label="Shares" value={stats.totalShares} color="orange" />

                        {/* Pays */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-indigo-400">
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 italic">Country</h3>
                            <div className="space-y-4">
                                {stats.filmsByCountry?.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                                            <span className="text-slate-700">{item.country}</span>
                                            <span className="text-blue-600 font-mono">{item.count}</span>
                                        </div>
                                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${stats.totalFilms > 0 ? (item.count / stats.totalFilms) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Outils IA */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-indigo-400">
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 italic">Tools AI Usage</h3>
                            <div className="space-y-5">
                                {(() => {
                                    const dataUsage = stats.toolsUsage || [];
                                    const finalStats = dataUsage.reduce((acc, curr) => {
                                        const value = curr.generate_Ai;
                                        if (value === 'hybrid') acc.hybrid += curr.count;
                                        else if (value === 'full_ai') acc.full_ai += curr.count;
                                        return acc;
                                    }, { hybrid: 0, full_ai: 0 });

                                    return [
                                        { id: 'hybrid', label: 'Hybrid AI', count: finalStats.hybrid },
                                        { id: 'full_ai', label: 'Full AI', count: finalStats.full_ai }
                                    ].map((row) => {
                                        const percentage = stats.totalFilms > 0 ? (row.count / stats.totalFilms) * 100 : 0;
                                        return (
                                            <div key={row.id}>
                                                <div className="flex justify-between items-end mb-1.5">
                                                    <span className="text-xs font-bold text-slate-700 uppercase">{row.label}</span>
                                                    <span className="text-xs font-mono font-bold text-red-600">{row.count}</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-[1px] border border-slate-200">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-1000 bg-red-500"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* --- Table Utilisateurs --- */}
                    <div className="lg:col-span-3">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:border-indigo-400">
                            <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center">
                                <h3 className="font-bold text-slate-800 text-lg">User Management</h3>
                                <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-tight">
                                    {users.length} Records
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 text-[11px] text-slate-500 uppercase font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Profile</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4 text-right">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 text-xs font-bold border border-slate-700">
                                                            {user.firstName?.[0] || '?'}{user.lastName?.[0] || '?'}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-800">{user.firstName} {user.lastName}</p>
                                                            <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase border transition-all ${roleStyles[user.role] || roleStyles.default}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <select
                                                        value={user.role}
                                                        disabled={user.role === 'admin'}
                                                        onChange={(e) => onUpdateRole(user.id, e.target.value)}
                                                        className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                                                    >
                                                        <option value="visitor">Visitor</option>
                                                        <option value="director">Realisateur</option>
                                                        <option value="committee">Committee</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Composant Statistique Simple
const CompactStat = ({ label, value, color }) => {
    const colorMap = {
        blue: "text-blue-600",
        indigo: "text-indigo-600",
        emerald: "text-emerald-600",
        orange: "text-orange-600"
    };
    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-400">
            <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1">{label}</p>
            <p className={`text-2xl font-bold font-mono ${colorMap[color] || "text-slate-900"}`}>
                {(value || 0).toLocaleString()}
            </p>
        </div>
    );
};

export default Admin;