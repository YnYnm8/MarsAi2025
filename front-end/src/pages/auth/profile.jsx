import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../../components/navbar";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3000/me', {
                    method: 'GET',
                    credentials: 'include', // Indispensable pour le cookie
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 401 || response.status === 403) {
                    navigate('/login');
                    return;
                }

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user || data);
                }
            } catch (error) {
                console.error("Erreur chargement profil", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );

    if (!user) return null;

    // --- PRÉPARATION DES DONNÉES ---
    const firstName = user.firstName || "Utilisateur";
    const lastName = user.lastName || "";
    // Calcul des initiales
    const initials = (firstName[0] + (lastName[0] || "")).toUpperCase();
    
    // Formatage de la date (ex: 12 Février 2024)
    const joinDate = new Date(user.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
            <TopNavbar />

            <div className="h-48 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="max-w-md mx-auto px-4 -mt-16 relative z-10 pb-20">
                
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 flex items-center justify-center shadow-xl shadow-purple-900/20">
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-3xl font-bold tracking-widest">
                                {initials}
                            </div>
                        </div>
                        {user.isEmailVerified && (
                            <div className="absolute bottom-1 right-1 bg-black rounded-full p-1">
                                <svg className="w-6 h-6 text-blue-500 fill-current" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" className="fill-black" />
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                        )}
                    </div>

                    <h1 className="mt-4 text-2xl font-bold uppercase tracking-wide">
                        {firstName} {lastName}
                    </h1>
                    <p className="text-blue-400 font-medium text-sm mt-1">
                        @{firstName.toLowerCase()}{lastName.toLowerCase()}
                    </p>

                    <div className="flex items-center gap-3 mt-6 w-full justify-center">
                        <button className="bg-white text-black font-bold py-2 px-8 rounded-full text-sm hover:bg-gray-200 transition">
                            SUIVRE
                        </button>
                        <button className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-900 transition text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                        <button className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-900 transition text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed italic">
                        "Réalisateur passionné par l'IA et la création visuelle. Explore les frontières entre l'humain et la machine."
                    </p>
                    
                    <div className="flex items-center justify-center gap-6 text-xs font-bold text-gray-500 tracking-wider">
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            CHINE
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {joinDate}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mt-8">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                        </div>
                        <div>
                            <svg className="w-5 h-5 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                            <div className="text-2xl font-bold text-white">1</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Films Publiés</div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <div>
                            <svg className="w-5 h-5 text-pink-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            <div className="text-2xl font-bold text-white">45.8K</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">J'aimes</div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition">
                             <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                        <div>
                            <svg className="w-5 h-5 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            <div className="text-2xl font-bold text-white">287.5K</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Vues Totales</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between bg-gray-900/80 rounded-full p-1 border border-gray-800">
                    <button className="flex-1 py-2 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </button>
                    <button className="flex-1 py-2 flex items-center justify-center text-gray-500 hover:text-white transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <button className="flex-1 py-2 flex items-center justify-center text-gray-500 hover:text-white transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden border border-gray-800 relative">
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            🏆 #1
                        </div>
                        <div className="w-full h-full flex items-center justify-center bg-black">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-600 blur-sm opacity-80"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
                            <p className="text-xs font-bold">Saturn V</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;