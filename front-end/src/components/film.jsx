
export const FilmComponent = ({ data, variant = "details" }) => {

    if (!data) return null;

    //variables
    const isCard = variant === "card";
    const mainFile = data.Files?.[0] || {};

    // URL base backend
    const API_URL = "http://localhost:3000";

    // Función para resolver la ruta de archivos 
    const getFileUrl = (path) => {
        if (!path) return "";
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${API_URL}/${cleanPath}`;
    };

    const containerStyles = isCard
        ? "bg-[#0F0F0F] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition group flex flex-col cursor-pointer relative"
        : "max-w-5xl mx-auto p-6 bg-[#0F0F0F] text-white rounded-3xl border border-gray-800";

    return (
        <div className={containerStyles}>

            {/* --- SECCIÓN VISUAL (POSTER O VIDEO) --- */}
            <div className={`relative ${isCard ? 'h-48' : 'w-full mb-8'}`}>
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border backdrop-blur-md ${data.generateAi === 'fullAi' ? 'bg-purple-600/80 border-purple-400' : 'bg-cyan-600/80 border-cyan-400'}`}>
                        {data.generateAi === 'fullAi' ? 'Full AI' : 'Hybrid'}
                    </span>
                    {isCard && mainFile.outil_Ai && (
                        <span className="bg-gray-900/80 border border-gray-700 px-2 py-1 rounded-md text-[10px] font-medium text-gray-300 backdrop-blur-md">
                            {mainFile.outil_Ai}
                        </span>
                    )}
                </div>

                {isCard ? (
                    <img
                        src={mainFile.poster_url ? getFileUrl(mainFile.poster_url) : "../assets/image-default.png"}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                    />
                ) : (
                    <div className="rounded-2xl overflow-hidden border border-gray-700 bg-black aspect-video shadow-2xl">
                        {mainFile.film_url ? (
                            <video src={getFileUrl(mainFile.film_url)} controls className=" cursor-pointer w-full h-full"></video>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">Vidéo non disponible</div>
                        )}
                    </div>
                )}
            </div>

            {/* --- CUERPO DE INFORMACIÓN --- */}
            <div className={isCard ? "p-4 flex flex-col flex-1" : "space-y-6"}>

                <div className="flex justify-between items-start">
                    <div>
                        <h2 className={`${isCard ? 'text-lg' : 'text-4xl'} font-bold text-white leading-tight`}>
                            {data.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[14px] text-blue-400 font-bold uppercase tracking-wider">
                                {data.duration} min • {data.status}
                            </span>
                            {!isCard && mainFile.outil_Ai && (
                                <span className="text-[14px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded italic">
                                    Propulsé par {mainFile.outil_Ai}
                                </span>
                            )}
                        </div>
                    </div>

                    {data.collaborateur && data.collaborateur !== "no" && (
                        <div className="text-[12px] text-gray-400 bg-gray-800/50 px-2 py-1 rounded border border-gray-700">
                            Feat. <span className="text-white font-bold">
                                {isCard
                                    ? data.collaborateur.split(',')[0].replace(/^(M\.|Mrs\.)\s*/, '') // Limpia el primero para la card
                                    : data.collaborateur // Muestra todo en el detalle
                                }
                            </span>
                        </div>
                    )}
                </div>

                <p className={`text-gray-400 font-light leading-relaxed ${isCard ? 'text-xs line-clamp-3 my-4' : 'text-lg my-6'}`}>
                    {data.description}
                </p>

                {!isCard && mainFile.creativeMethodology && (
                    <div className="p-6 bg-gradient-to-br from-gray-900 to-[#0B0B0B] border border-gray-800 rounded-2xl shadow-inner">
                        <h3 className="text-blue-500 font-bold uppercase text-[10px] tracking-widest mb-3">Méthodologie Créative</h3>
                        <p className="text-gray-300 text-sm leading-relaxed italic leading-loose">
                            "{mainFile.creativeMethodology}"
                        </p>
                    </div>
                )}

                {/* --- POSTER & GALERIE --- */}
                {!isCard && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t border-gray-800">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest">Poster Officiel</h3>
                            <img src={getFileUrl(mainFile.poster_url)} className="rounded-xl border border-gray-700 w-full max-w-xs shadow-lg" alt="Poster" />
                        </div>
                        {mainFile.galerie_url && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest">Galerie d'images</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {Array.isArray(mainFile.galerie_url) && mainFile.galerie_url.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={getFileUrl(img)}
                                            className="rounded-xl border border-gray-700 w-full shadow-lg h-32 object-cover"
                                            alt={`Galerie ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- COMMENTAIRES --- */}
                {!isCard && data.Annotators && data.Annotators.length > 0 && (
                    <div className="mt-12 border-t border-gray-800 pt-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            Commentaires <span className="text-gray-600 text-sm">({data.Annotators.length})</span>
                        </h3>
                        <div className="space-y-4">
                            {data.Annotators.map((user) => (
                                <div key={user.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-blue-400 font-bold text-sm">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-mono">
                                            {new Date(user.Annotation?.createdAt).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm italic leading-relaxed">
                                        "{user.Annotation?.content}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- FOOTER --- */}
                <div className={`flex items-center justify-between border-t border-gray-800 pt-4 ${isCard ? 'mt-auto' : 'mt-8'}`}>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            {data.views}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            {data.shares}
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-600 flex flex-col items-end">
                        <span>Créé le {new Date(data.createdAt).toLocaleDateString('fr-FR')}</span>
                        <span>Modifié le {new Date(data.updatedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};