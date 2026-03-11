import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import ImagesPreview from "../../components/imagesPreview";
import VideoUpload from "../../components/videoPreview";
import { DynamicSubtitleInput } from "../../components/DynamicInput";
import { Toast } from "../../components/toastMessage";
import { faPencil, faPlus, faTrash, faFilm, faMicrochip, faSave, faUsers, faCloudUploadAlt, faInfo } from '@fortawesome/free-solid-svg-icons';
import defaultImg from "../../assets/image-default.png";


export default function EditFilm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const BACKEND_URL = API_URL_FRONTEND;

    const [movie, setMovie] = useState(null);
    const [selected, setSelected] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [toastMessages, setToastMessages] = useState([]);

    // Youtube
    const [uploadMode, setUploadMode] = useState("file");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Inputs dinamicos
    const [collaborateurs, setCollaborateurs] = useState([{ genre: "male", name: "" }]);
    const [subtitles, setSubtitles] = useState([{ type: "file", value: null }]);
    const [newGalleryFiles, setNewGalleryFiles] = useState([null, null]);

    const options = [
        { label: "Génération intégrale (100% IA)", value: "fullAi" },
        { label: "Production hybride (Prises de vues réelles + apports IA)", value: "hybrid" },
    ];

    // Informacion del film
    useEffect(() => {
        const editFetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/films/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Film introuvable');
                const data = await response.json();

                setMovie(data);
                setSelected(data.generateAi);
                setTitle(data.title);
                setDescription(data.description);

                //deteccion video
                const videoUrl = data.Files?.[0]?.film_url || "";
                if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
                    setUploadMode("youtube");
                    setYoutubeUrl(videoUrl);
                } else {
                    setUploadMode("file");
                }

                // Cargar colaboradores existentes
                if (data.collaborateur && data.collaborateur.trim() !== "") {
                    const parsed = data.collaborateur.split(',').map(item => {
                        const trimmed = item.trim();
                        const isFemale = trimmed.startsWith('Mrs.');
                        return {
                            genre: isFemale ? "female" : "male",
                            name: trimmed.replace(/^(M\.|Mrs\.)\s*/, '')
                        };
                    });
                    setCollaborateurs(parsed);
                } else {
                    setCollaborateurs([{ genre: "male", name: "" }]);
                }

                // Cargar subtítulos existentes
                const existingSubs = data.Files?.filter(f => f.type === "subtitle").map(s => ({
                    type: "file",
                    value: s.url,
                    isExisting: true
                }));

                if (existingSubs?.length > 0) {
                    setSubtitles(existingSubs);
                }

                const posterObj = data.Files?.find(f => f.poster_url || f.category === "poster_url");
                const posterPath = posterObj?.poster_url || posterObj?.url;

                if (posterPath) {
                    setPosterFile(posterPath);
                }

                const fileObj = data.Files?.[0];
                if (fileObj) {
                    const currentGallery = Array.isArray(fileObj.galerie_url)
                        ? fileObj.galerie_url
                        : [];

                    setNewGalleryFiles([
                        currentGallery[0] || null,
                        currentGallery[1] || null
                    ]);
                }

            } catch (error) {
                console.error("Erreur fetch", error);
            }
        };
        if (id) editFetchData();
    }, [id]);

    const handleCollabChange = (index, field, value) => {
        setCollaborateurs(prevCollabs => {
            const updated = [...prevCollabs];
            updated[index] = { ...updated[index], [field]: value }
            return updated;
        });
    };

    const addCollaborateur = () => setCollaborateurs([...collaborateurs, { genre: "male", name: "" }]);
    const removeCollaborateur = (index) => setCollaborateurs(collaborateurs.filter((_, i) => i !== index));

    const handleGalleryChange = (index, file) => {
        const updatedGallery = [...newGalleryFiles];
        updatedGallery[index] = file;
        setNewGalleryFiles(updatedGallery);
    };

    useEffect(() => {
        if (!toastMessages.length) return;
        const timer = setTimeout(() => setToastMessages([]), 4000);
        return () => clearTimeout(timer);
    }, [toastMessages]);

    // Fetch YOUTUBE 
    const fetchYoutubeInfo = async () => {
        const cleanUrl = youtubeUrl.trim();
        if (!cleanUrl) return;
        setIsLoadingYoutube(true);
        try {
            const response = await fetch(`${BACKEND_URL}/films/youtube-info?url=${encodeURIComponent(cleanUrl)}`);
            const data = await response.json();
            if (response.ok && data.title) {
                setTitle(data.title);
                setDescription(data.description || "");
                const youtubeImg = data.thumbnails?.maxres?.url || data.thumbnail || data.thumbnails?.high?.url;
                setPosterFile(youtubeImg);


                if (data.duration) {
                    setMovie(prev => ({ ...prev, duration: data.duration }));
                }

                setToastMessages(["¡Información de YouTube cargada!"]);
            }
        } catch (error) {
            setToastMessages(["Error al conectar con el servidor"]);
        } finally {
            setIsLoadingYoutube(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Souhaitez-vous enregistrer les modifications ?");
        if (!confirmation) return;

        const formData = new FormData(e.target);

        subtitles.forEach((sub) => {
            if (sub.value) formData.append("subtitle", sub.value);
        });

        const namesWithGenre = collaborateurs
            .filter(c => c.name && c.name.trim() !== "")
            .map(c => `${c.genre === 'female' ? 'Mrs.' : 'M.'} ${c.name.trim()}`)
            .join(", ");

        formData.set("collaborateur", namesWithGenre || "");

        newGalleryFiles.forEach((file) => {
            if (!file) return;
            if (typeof file === "string") {
                formData.append("existing_galerie", file);
            } else {
                formData.append("galerie", file);
            }
        });

        if (selected) formData.set("generateAi", selected);

        if (posterFile instanceof File) {
            formData.append("poster", posterFile);
        } else if (typeof posterFile === 'string') {
            formData.set("posterUrl", posterFile);
        }

        try {
            const response = await fetch(`${BACKEND_URL}/films/${id}`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            });
            const result = await response.json();

            if (!response.ok) {
                setToastMessages(result.errors ? result.errors.map(err => err.message) : [result.message || "Erreur inconnue"]);
                return;
            }
            navigate("/me", { state: { successMessage: "Film mis à jour avec succès !" } });
        } catch (error) {
            setToastMessages(["Erreur réseau lors de la mise à jour"]);
        }
    };

    if (!movie) return <div className="text-white p-20 text-center font-display uppercase tracking-widest">Chargement du projet...</div>;

    return (
        <div className="bg-black-primary min-h-screen text-white pb-10 md:pb-20">
            {/* Agregamos w-full y centrado relativo */}
            <div className="flex flex-col w-full max-w-7xl mx-auto p-4 md:p-8">

                {/* Header responsivo */}
                <div className="font-display text-center mb-8 md:mb-10 w-full">
                    <div className="flex  md:flex-row justify-center items-center gap-2 md:gap-4 mb-4">
                        <h1 className="text-3xl md:text-6xl text-white-secondary uppercase font-extrabold tracking-tighter text-center">
                            Modifier le <span className="text-blue-tertiary">film</span>
                        </h1>
                        <FontAwesomeIcon icon={faPencil} className="text-blue-tertiary text-xl md:text-3xl opacity-50" />
                    </div>
                    <p className="text-white/40 uppercase tracking-widest text-[10px] md:text-sm font-bold">ID PROJET: {id}</p>
                </div>

                {/* Formulario con ancho completo */}
                <form className="font-display flex flex-col w-full" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="generateAi" value={selected || ""} />

                    {/* 01. Identité - Eliminamos m-7 y usamos mb-6 para móviles */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box border p-5 md:p-10 mb-6 md:m-7">
                        <div className="flex items-center gap-3 pb-6 md:pb-8 border-b border-white/5 mb-6 md:mb-8">
                            <FontAwesomeIcon icon={faFilm} className="text-blue-tertiary text-lg md:text-xl" />
                            <p className="uppercase tracking-widest font-bold text-base md:text-lg">01. Identité du Film</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-10">
                            <div className="flex flex-col relative w-full">
                                <label className="pb-2 text-white/50 text-[10px] md:text-xs font-bold uppercase">Titre du film *</label>
                                <input type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-black border border-dark-border p-4 pr-12 rounded-xl outline-none focus:border-blue-tertiary transition-all" />
                            </div>
                            <div className="flex flex-col relative w-full">
                                <label className="pb-2 text-white/50 text-[10px] md:text-xs font-bold uppercase">Durée (Secondes) *</label>
                                <input type="number" name="duration" value={movie.duration} onChange={(e) => setMovie({ ...movie, duration: e.target.value })} className="w-full bg-black border border-dark-border p-4 pr-12 rounded-xl outline-none focus:border-blue-tertiary" />
                            </div>
                            <div className="flex flex-col col-span-1 md:col-span-2 relative w-full">
                                <label className="pb-2 text-white/50 text-[10px] md:text-xs font-bold uppercase">Manifeste / Synopsis *</label>
                                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black border border-dark-border p-4 pr-12 rounded-xl h-32 md:h-40 outline-none focus:border-blue-tertiary uppercase text-sm" />
                            </div>
                        </div>
                    </fieldset>

                    {/* 02. IA Usage */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box border p-5 md:p-10 mb-6 md:m-7">
                        <div className="flex items-center gap-3 pb-6 md:pb-8 border-b border-white/5 mb-6 md:mb-8">
                            <FontAwesomeIcon icon={faMicrochip} className="text-blue-tertiary text-lg md:text-xl" />
                            <p className="uppercase tracking-widest font-bold text-base md:text-lg">02. Déclaration IA</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-8 md:mb-12">
                            {options.map((opt) => (
                                <button key={opt.value} type="button" onClick={() => setSelected(opt.value)} className={`flex-1 p-4 md:p-6 cursor-pointer rounded-xl border transition-all font-bold text-xs md:text-sm uppercase ${selected === opt.value ? "bg-blue-tertiary border-blue-400 shadow-glow-blue text-white" : "bg-black/40 border-gray-800 text-white/40 hover:bg-gray-800"}`}>{opt.label}</button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                            <textarea name="outil_Ai" defaultValue={movie.Files[0].outil_Ai} placeholder="Outils utilisés" className="w-full bg-black/50 border border-gray-800 p-5 rounded-xl h-40 md:h-48 outline-none focus:border-blue-tertiary" />
                            <textarea name="creativeMethodology" defaultValue={movie.Files[0].creativeMethodology} placeholder="Méthodologie" className="w-full bg-black/50 border border-gray-800 p-5 rounded-xl h-40 md:h-48 outline-none focus:border-blue-tertiary" />
                        </div>
                    </fieldset>

                    {/* 03. Livrables */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box border p-5 md:p-10 mb-6 md:m-7">
                        <div className="flex gap-3 pb-6 border-b border-white/5 mb-6 md:mb-8">
                            <FontAwesomeIcon icon={faCloudUploadAlt} className="text-blue-tertiary text-lg md:text-xl" />
                            <p className="uppercase font-display pt-1 tracking-widest font-bold text-base md:text-lg">03. Livrables</p>
                        </div>

                        <div className="flex bg-black/40 p-1 rounded-xl border border-dark-border w-full md:w-fit mb-8 md:mb-10 self-center">
                            <button type="button" onClick={() => setUploadMode("file")} className={`flex-1 md:flex-none px-4 md:px-8 py-2 cursor-pointer rounded-lg text-[10px] font-bold tracking-widest ${uploadMode === "file" ? "bg-blue-tertiary text-white shadow-lg" : "text-white/40"}`}>FICHIER LOCAL</button>
                            <button type="button" onClick={() => setUploadMode("youtube")} className={`flex-1 md:flex-none px-4 md:px-8 py-2 cursor-pointer rounded-lg text-[10px] font-bold tracking-widest ${uploadMode === "youtube" ? "bg-red-600 text-white shadow-lg" : "text-white/40"}`}>LIEN YOUTUBE</button>
                        </div>

                        {uploadMode === "youtube" && (
                            <div className="flex flex-col mb-8 animate-in fade-in slide-in-from-top-2">
                                <label className="pb-3 text-white/50 uppercase text-xs font-bold">Lien de la vidéo YouTube</label>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <input type="text" value={youtubeUrl} name="youtubeUrl" onChange={(e) => setYoutubeUrl(e.target.value)} className="flex-1 bg-black border border-dark-border p-4 rounded-xl text-sm outline-none focus:border-red-600" />
                                    <button type="button" onClick={fetchYoutubeInfo} disabled={isLoadingYoutube || !youtubeUrl} className="px-6 py-4 md:py-0 rounded-xl cursor-pointer font-bold uppercase text-xs bg-red-600/10 border border-red-600/40 text-red-500 hover:bg-red-600 hover:text-white transition-all">{isLoadingYoutube ? 'Chargement...' : 'Importer info'}</button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-x-20 md:gap-y-15">
                            <VideoUpload
                                label={uploadMode === "file" ? "Télécharger le film" : "Aperçu YouTube"}
                                name="film"
                                youtubeUrl={uploadMode === "youtube" ? youtubeUrl : ""}
                                uploadMode={uploadMode}
                                onDurationError={(msg) => setToastMessages([msg])}
                                id="videoUrl"
                                defaultValue={movie.Files[0].film_url ? (movie.Files[0].film_url.startsWith('http') ? movie.Files[0].film_url : `${BACKEND_URL}${movie.Files[0].film_url}`) : ""}
                            />

                            <div className="flex flex-col">
                                <label className="pb-4 text-white/50 text-[10px] md:text-xs font-bold uppercase text-center md:text-left">Sous-titres (SRT/VTT)</label>
                                <DynamicSubtitleInput subtitles={subtitles} setSubtitles={setSubtitles} />
                            </div>

                            <ImagesPreview
                                id="fichier-vignette"
                                label="Vignette Officielle (16:9) *"
                                defaultImage={(posterFile && typeof posterFile === 'string') ? (posterFile.startsWith('http') ? posterFile : `${BACKEND_URL}${posterFile}`) : defaultImg}
                                fullPreviewOnUpload={true}
                                onFileSelect={setPosterFile}
                            />

                            <div>
                                <label className="pb-4 block text-white/50 text-[10px] md:text-xs font-bold uppercase text-center md:text-left">Galerie Médias</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
                                    {newGalleryFiles.map((file, idx) => (
                                        <div key={idx} className="w-full">
                                            <ImagesPreview
                                                id={`galerie-${idx}`}
                                                defaultImage={file ? (typeof file === 'string' ? (file.startsWith('http') ? file : `${BACKEND_URL}${file}`) : URL.createObjectURL(file)) : defaultImg}
                                                onFileSelect={(f) => handleGalleryChange(idx, f)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* 04. Équipe */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box border p-5 md:p-10 mb-6 md:m-7">
                        <div className="flex items-center gap-3 pb-6 md:pb-8 border-b border-white/5 mb-6 md:mb-8">
                            <FontAwesomeIcon icon={faUsers} className="text-blue-tertiary text-lg md:text-xl" />
                            <p className="uppercase tracking-widest font-bold text-base md:text-lg">04. Composition de l'Équipe</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {collaborateurs.map((collab, index) => (
                                <div key={index} className="bg-black/40 p-4 md:p-5 flex flex-col md:flex-row items-center gap-3 md:gap-5 font-bold rounded-2xl md:rounded-box tracking-wider text-sm border border-white/5 w-full">
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <select
                                            className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none flex-1 md:flex-none md:w-24 focus:border-blue-tertiary"
                                            value={collab.genre}
                                            onChange={(e) => handleCollabChange(index, "genre", e.target.value)}
                                        >
                                            <option value="male">M.</option>
                                            <option value="female">Mrs.</option>
                                        </select>
                                        {collaborateurs.length > 1 && (
                                            <button type="button" onClick={() => removeCollaborateur(index)} className="md:hidden text-red-500 bg-red-500/10 px-6 rounded-xl border border-red-500/20 flex items-center justify-center">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={collab.name || ""}
                                        onChange={(e) => handleCollabChange(index, "name", e.target.value)}
                                        className="bg-black border border-gray-700 p-4 md:p-5 flex-1 rounded-xl md:rounded-box text-white outline-none focus:border-blue-tertiary transition-all uppercase w-full"
                                        placeholder="NOM COMPLET"
                                    />
                                    {collaborateurs.length > 1 && (
                                        <button type="button" onClick={() => removeCollaborateur(index)} className="hidden md:flex text-red-500 cursor-pointer bg-red-500/10 p-5 text-xl rounded-xl hover:bg-red-500 hover:text-white transition-all items-center justify-center border border-red-500/10">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addCollaborateur} className="mt-4 cursor-pointer self-center w-full md:w-auto bg-blue-tertiary/10 border border-blue-tertiary/40 text-blue-tertiary px-8 py-4 rounded-xl font-bold uppercase text-[10px] md:text-xs flex items-center justify-center gap-2 hover:bg-blue-tertiary hover:text-white transition-all">
                                <FontAwesomeIcon icon={faPlus} /> AJOUTER UN COLLABORATEUR
                            </button>
                        </div>
                    </fieldset>

                    <button className="btn self-center w-full md:w-auto cursor-pointer bg-blue-tertiary text-white py-5 md:py-6 px-10 md:px-20 font-bold text-base md:text-lg rounded-2xl uppercase shadow-glow-blue hover:scale-105 transition-all mt-6 md:mt-10 mb-20 flex items-center justify-center gap-3" type="submit">
                        <FontAwesomeIcon icon={faSave} /> Enregistrer
                    </button>
                </form>
            </div>
            <Toast messages={toastMessages} />
        </div>
    );
}