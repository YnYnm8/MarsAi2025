import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import ImagesPreview from "../../components/imagesPreview";
import VideoUpload from "../../components/videoPreview";
import { DynamicSubtitleInput } from "../../components/DynamicInput";
import { Toast } from "../../components/toastMessage";

import defaultImg from "../../assets/image-default.png";


export default function EditFilm() {
    const { id } = useParams();
    const navigate = useNavigate();


    const [movie, setMovie] = useState(null);
    const [selected, setSelected] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [toastMessages, setToastMessages] = useState([]);

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
                const response = await fetch(`http://localhost:3000/films/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) throw new Error('Film introuvable');
                const data = await response.json();

                setMovie(data);
                setSelected(data.generateAi);

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
                    setCollaborateurs(parsed); // El ESTADO puede llamarse plural si quieres, es interno
                } else {
                    setCollaborateurs([{ genre: "male", name: "" }]);
                }

                // Cargar subtítulos existentes (mapeo desde los archivos)
                const existingSubs = data.Files?.filter(f => f.type === "subtitle").map(s => ({
                    type: "file",
                    value: s.url,
                    isExisting: true
                }));

                if (existingSubs?.length > 0) {
                    setSubtitles(existingSubs);
                }

                const posterObj = data.Files?.find(f => f.category === "poster_url" || f.poster_url)
                const posterPath = posterObj?.poster_url || posterObj?.url;
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

    // 2. Manejo de cambios
    const handleCollabChange = (index, field, value) => {
        setCollaborateurs(prevCollabs => {
            const updated = [...prevCollabs];
            updated[index] = {
                ...updated[index],
                [field]: value
            }
            return updated
        }

        );
    };

    const addCollaborateur = () => {
        setCollaborateurs([...collaborateurs, { genre: "male", name: "" }]);
    };
    const removeCollaborateur = (index) => setCollaborateurs(collaborateurs.filter((_, i) => i !== index));

    const handleGalleryChange = (index, file) => {
        const updatedGallery = [...newGalleryFiles];
        updatedGallery[index] = file;
        setNewGalleryFiles(updatedGallery);
    };

    //TOAST 

    useEffect(() => {
        if (!toastMessages.length) return;

        const timer = setTimeout(() => {
            setToastMessages([]);
        }, 4000);

        return () => clearTimeout(timer);
    }, [toastMessages]);



    // 3. Envío del Formulario (UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmation = window.confirm("Souhaitez-vous enregistrer les modifications ?");
        if (!confirmation) return;

        const formData = new FormData(e.target);


        // Append de subtítulos (solo nuevos)
        subtitles.forEach((sub) => {
            if (sub.type === "file" && sub.value) {
                formData.append("subtitle", sub.value);
            } else if (sub.type === "url" && sub.value) {
                formData.append("subtitle", sub.value);
            }
        });

        // Append de colaboradores

        const namesWithGenre = collaborateurs
            .filter(c => c.name && c.name.trim() !== "")
            .map(c => {
                const prefix = c.genre === 'female' ? 'Mrs.' : 'M.';
                return `${prefix} ${c.name.trim()}`;
            })
            .join(", ");


        formData.set("collaborateur", namesWithGenre || "");

        // Append de galería (solo nuevos)

        newGalleryFiles.forEach((file) => {
            if (!file) return;
            if (typeof file === "string") {
                formData.append("existing_galerie", file);
            } else {
                formData.append("galerie", file);
            }
        });


        // Append de generateAi, poster

        if (selected) formData.set("generateAi", selected);
        if (posterFile) formData.append("poster", posterFile);

        try {
            const response = await fetch(`http://localhost:3000/films/${id}`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            });
            const result = await response.json();

            if (!response.ok) {
                if (result.errors) {
                    console.log(result.errors)
                    setToastMessages(result.errors.map(err => err.message));
                } else {
                    setToastMessages([result.message || "Erreur inconnue"]);
                }
                return;
            }

            navigate("/me", { state: { successMessage: "Film mis à jour avec succès !" } });
        } catch (error) {
            setToastMessages(["Erreur réseau lors de la mise à jour"]);
            console.error(error);
        }
    };

    if (!movie) return <div className="text-white p-20 text-center font-display uppercase tracking-widest">Chargement du projet...</div>;
    // Archivos actuales para previsualización

    return (
        <div className="bg-black-primary min-h-screen text-white pb-20">

            <div className="flex flex-col m-8 max-w-7xl mx-auto">
                {/* Cabecera */}
                <div className="font-display text-center mb-10">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <h1 className="text-6xl text-white-secondary uppercase font-extrabold tracking-tighter">
                            Modifier le <span className="text-blue-tertiary">film</span>
                        </h1>
                        <FontAwesomeIcon icon={faPencil} className="text-blue-tertiary text-3xl opacity-50" />
                    </div>
                    <p className="text-white/40 uppercase tracking-widest text-sm font-bold">ID PROJET: {id}</p>
                </div>

                <form className="font-display flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="hidden" name="generateAi" value={selected || ""} />

                    {/* 01. IDENTITÉ */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box m-7 border p-10">
                        <div className="flex items-center gap-3 pb-8 border-b border-white/5 mb-8">
                            <FontAwesomeIcon icon={faFilm} className="text-blue-tertiary text-xl" />
                            <p className="uppercase tracking-widest font-bold text-lg">01. Identité du Film</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                            <div className="flex flex-col relative">
                                <label className="pb-2 text-white/50 text-xs font-bold uppercase">Titre du film *</label>
                                <div className="relative">
                                    <input type="text" name="title" defaultValue={movie.title} className="w-full bg-black border border-dark-border p-4 pr-12 rounded-xl outline-none focus:border-blue-tertiary transition-all" />
                                    <FontAwesomeIcon icon={faPencil} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-tertiary/40" />
                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                <label className="pb-2 text-white/50 text-xs font-bold uppercase">Durée (Secondes) *</label>
                                <div className="relative">
                                    <input type="number" name="duration" defaultValue={movie.duration} className="w-full bg-black border border-dark-border p-4 pr-12 rounded-xl outline-none focus:border-blue-tertiary" />
                                    <FontAwesomeIcon icon={faPencil} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-tertiary/40" />
                                </div>
                            </div>
                            <div className="flex flex-col col-span-2 relative">
                                <label className="pb-2 text-white/50 text-xs font-bold uppercase">Manifeste / Synopsis * (Min 10 caracteres)</label>
                                <div className="relative">
                                    <textarea name="description" defaultValue={movie.description} className="w-full bg-black border border-dark-border p-4 pr-12 rounded-xl h-32 outline-none focus:border-blue-tertiary uppercase text-sm" />
                                    <FontAwesomeIcon icon={faPencil} className="absolute right-4 top-6 text-blue-tertiary/40" />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* 02. DÉCLARATION IA */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box m-7 border p-10">
                        <div className="flex items-center gap-3 pb-8 border-b border-white/5 mb-8">
                            <FontAwesomeIcon icon={faMicrochip} className="text-blue-tertiary text-xl" />
                            <p className="uppercase tracking-widest font-bold text-lg">02. Déclaration Usage de l'IA</p>
                        </div>

                        <p className="uppercase font-bold text-s text-white/50 mb-6">Classification actuelle :</p>
                        <div className="flex p-5 gap-7">
                            <FontAwesomeIcon icon={faInfo} className="text-lg" />
                            <p className="uppercase font-bold text-xs tracking-wider ">
                                MARS.A.I exige une transparence totale sur l'utilisation de l'Intelligence Artificielle. Sélectionnez tous les outils génératifs sollicités dans votre processus créatif.
                            </p>
                        </div>
                        <div className="flex gap-5 mb-12">
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setSelected(opt.value)}
                                    className={`flex-1 p-6  cursor-pointer rounded-xl border transition-all font-bold text-sm uppercase ${selected === opt.value ? "bg-blue-tertiary border-blue-400 shadow-glow-blue" : "bg-black/40 border-gray-800 text-white/40 hover:bg-gray-800"}`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-10">
                            <div className="flex flex-col relative">
                                <label className="pb-4 text-white/50 text-xs font-bold uppercase">Stack Technologique * (Min 10 caracteres)</label>
                                <div className="relative">
                                    <textarea name="outil_Ai" defaultValue={movie.Files[0].outil_Ai} className="w-full bg-black/50 border border-gray-800 p-5 rounded-xl h-48 outline-none focus:border-blue-tertiary" />
                                    <FontAwesomeIcon icon={faPencil} className="absolute right-4 top-5 text-blue-tertiary/40" />
                                </div>
                            </div>
                            <div className="flex flex-col relative">
                                <label className="pb-4 text-white/50 text-xs font-bold uppercase">Méthodologie Créative</label>
                                <div className="relative">
                                    <textarea name="creativeMethodology" defaultValue={movie.Files[0].creativeMethodology} className="w-full bg-black/50 border border-gray-800 p-5 rounded-xl h-48 outline-none focus:border-blue-tertiary" />
                                    <FontAwesomeIcon icon={faPencil} className="absolute right-4 top-5 text-blue-tertiary/40" />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* 03. LIVRABLES */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box m-7 border p-10">
                        <div className="flex items-center gap-3 pb-8 border-b border-white/5 mb-10">
                            <FontAwesomeIcon icon={faCloudUploadAlt} className="text-blue-tertiary text-xl" />
                            <p className="uppercase tracking-widest font-bold text-lg">03. Livrables & Accessibilité</p>
                        </div>
                        {/*VIDEO */}
                        <div className="grid grid-cols-2 gap-x-16 gap-y-12">

                            <VideoUpload
                                label="Fichier Vidéo / URL *"
                                name="film"
                                id="videoUrl"
                                defaultValue={movie.Files[0].film_url}
                            />

                            {/*SUBTITULOS */}
                            <div className="flex flex-col">
                                <label className="pb-2 text-white/50 text-xs font-bold uppercase">Sous-titres (SRT/VTT)</label>
                                <DynamicSubtitleInput subtitles={subtitles} setSubtitles={setSubtitles} />
                            </div>

                            {/*POSTER */}
                            <ImagesPreview
                                label="Vignette Officielle (16:9) *"
                                name="poster"
                                id="fichier-vignette"
                                defaultImage={
                                    movie.Files?.find(f => f.poster_url)?.poster_url ||
                                    movie.Files?.find(f => f.category === "poster_url")?.url ||
                                    defaultImg
                                } fullPreviewOnUpload={true}
                                onFileSelect={setPosterFile}
                            />
                            {/*GALERIA */}
                            <div>
                                <label className="pb-4 block text-white/50 text-xs font-bold uppercase">Galerie Médias (Stills)</label>
                                <div className="flex gap-4">
                                    <ImagesPreview
                                        id="galerie-1"
                                        name="galerie"
                                        defaultImage={typeof newGalleryFiles[0] === 'string'
                                            ? `http://localhost:3000${newGalleryFiles[0]}`
                                            : defaultImg}
                                        onFileSelect={(file) => handleGalleryChange(0, file)}
                                    />
                                    <ImagesPreview
                                        id="galerie-2"
                                        name="galerie"
                                        defaultImage={typeof newGalleryFiles[1] === 'string'
                                            ? `http://localhost:3000${newGalleryFiles[1]}`
                                            : defaultImg}
                                        onFileSelect={(file) => handleGalleryChange(1, file)}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* 04. ÉQUIPE */}
                    <fieldset className="bg-dark-card border-dark-border rounded-box m-7 border p-10">
                        <div className="flex items-center gap-3 pb-8 border-b border-white/5 mb-8">
                            <FontAwesomeIcon icon={faUsers} className="text-blue-tertiary text-xl" />
                            <p className="uppercase tracking-widest font-bold text-lg">04. Composition de l'Équipe</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {collaborateurs.map((collab, index) => (
                                <div key={index} className="flex gap-4 items-center bg-black/20 p-4 rounded-2xl border border-white/5">
                                    <select
                                        className="bg-black border border-gray-800 p-4 rounded-xl text-white outline-none"
                                        value={collab.genre}
                                        onChange={(e) => handleCollabChange(index, "genre", e.target.value)}
                                    >
                                        <option value="male">M.</option>
                                        <option value="female">Mrs.</option>
                                    </select>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={collab.name || ""}
                                            onChange={(e) => handleCollabChange(index, "name", e.target.value)}
                                            className="w-full bg-black border border-gray-800 p-4 pr-12 rounded-xl outline-none focus:border-blue-tertiary"
                                            placeholder="NOM COMPLET"
                                        />
                                        <FontAwesomeIcon icon={faPencil} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-tertiary/30" />
                                    </div>
                                    {collaborateurs.length > 1 && (
                                        <button type="button" onClick={() => removeCollaborateur(index)} className="text-red-500  cursor-pointer bg-red-500/10 w-12 h-12 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addCollaborateur}
                                className="mt-4 cursor-pointer self-center bg-blue-tertiary/10 border border-blue-tertiary/40 text-blue-tertiary px-8 py-4 rounded-xl font-bold uppercase text-xs flex items-center gap-2 hover:bg-blue-tertiary hover:text-white transition-all"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Ajouter un collaborateur
                            </button>
                        </div>
                    </fieldset>

                    {/* Botón Guardar */}
                    <button className="btn self-center cursor-pointer  bg-blue-tertiary text-white py-6 px-20 font-bold text-lg rounded-2xl uppercase shadow-glow-blue hover:scale-105 transition-all mt-10 mb-20 flex items-center gap-3" type="submit">
                        <FontAwesomeIcon icon={faSave} />
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
            <Toast messages={toastMessages} />
        </div>
    );
}