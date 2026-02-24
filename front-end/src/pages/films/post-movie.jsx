import { useState, useEffect } from "react";
import { DynamicSubtitleInput } from "../../components/DynamicInput";
import ImagesPreview from "../../components/imagesPreview";
import defaultImg from "../../assets/image-default.png";
import VideoUpload from "../../components/videoPreview";
import { useNavigate } from "react-router";
import { Toast } from "../../components/toastMessage";
import { faPlus, faTrash, faFilm, faMicrochip, faSave, faUsers, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


export default function PostFilm() {
    const [posterFile, setPosterFile] = useState(null);
    const [collaborateurs, setCollaborateurs] = useState([{ genre: "", name: "" }]);
    const [selected, setSelected] = useState(null);
    const [toastMessages, setToastMessages] = useState([]);
    const [subtitles, setSubtitles] = useState([{ type: "file", value: null }]);

    const navigate = useNavigate();

    const options = [
        { label: "Génération intégrale (100% IA)", value: "fullAi" },
        { label: "Production hybride (Prises de vues réelles + apports IA)", value: "hybrid" },
    ];

    const handleCollabChange = (index, field, value) => {
        const updated = [...collaborateurs];
        updated[index][field] = value;
        setCollaborateurs(updated);
    };

    const addCollaborateur = () => {
        setCollaborateurs([...collaborateurs, { genre: "", name: "" }]);
    };

    const removeCollaborateur = (index) => setCollaborateurs(collaborateurs.filter((_, i) => i !== index));


    useEffect(() => {
        if (!toastMessages.length) return;

        const timer = setTimeout(() => {
            setToastMessages([]);
        }, 4000);

        return () => clearTimeout(timer);
    }, [toastMessages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmation = window.confirm(
            "Êtes-vous sûr de vouloir soumettre ce film ? Assurez-vous que toutes les informations sont correctes avant de continuer."
        );
        if (!confirmation) return

        const formData = new FormData(e.target);

        subtitles.forEach((sub) => {
            if (sub.type === "file" && sub.value) {
                formData.append("subtitle", sub.value);
            } else if (sub.type === "url" && sub.value) {
                formData.append("subtitle", sub.value);
            }
        });

        const namesWithGenre = collaborateurs
            .filter(c => c.name && c.name.trim() !== "") // Evita vacíos
            .map(c => {
                const prefix = c.genre === 'female' ? 'Mrs.' : 'M.';
                return `${prefix} ${c.name.trim()}`;
            })
            .join(", ");

        formData.set("collaborateur", namesWithGenre);
        
        if (selected) formData.append("generateAi", selected);

        if (posterFile) formData.append("poster", posterFile);

        try {
            const response = await fetch("http://localhost:3000/films", {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setToastMessages(data.errors.map(err => err.message));
                } else {
                    setToastMessages([data.message || "Erreur inconnue"]);
                }
                return;
            }

            console.log("Film soumis avec succès :", data);

            navigate("/profile", {
                state: { successMessage: "Film soumis avec succès !." },
            });// Redirige vers une page de succès après la soumission
        } catch (error) {
            setToastMessages(["Erreur réseau"]);
            console.error(error);
        }

    }
    return (
        <div className="bg-black-primary min-h-screen text-white">

            {/* Cabecera */}
            <div className="flex flex-col m-8 flex-wrap">
                <div className="font-display text-center flex items-center flex-col ">
                    <div className="flex uppercase font-extrabold p-5 ">
                        <img src="src/assets/icon-stars.png" className="w-8 pr-2" alt="" />
                        <p className="text-brand-blue text-base tracking-wider"> Appel à Projets 2026</p>
                    </div>

                    <h1 className="text-7xl text-white-secondary uppercase font-extrabold pb-8 ">Soumettre un <span className="text-blue-tertiary">film</span></h1>
                    <p className="font-bold text-lg text-white/60 tracking-wide w-2xl ">Transmettez les éléments techniques,
                        l'usage de l'IA et la composition de votre équipe.<br />
                        Tous les campos marqués d'une étoile (*) sont obligatoires.
                    </p>
                </div>

                <form className="m-5 font-display flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* 01. Identité */}

                    <fieldset className="fieldset bg-dark-card border-dark-border rounded-box m-7 border p-10">
                        <div className="flex pb-5">

                            <p className="uppercase font-display pl-2 tracking-widest font-bold text-lg ">01. Identité du Film</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-20 gap-y-15 pt-5 tracking-wider text-base font-bold">
                            <div className="flex flex-col">
                                <label htmlFor="titleInput" className="pb-2 text-white/50">TITRE *</label>
                                <input type="text" name="title" id="titleInput" className="bg-black border border-dark-border p-3 rounded-lg text-sm outline-none focus:border-blue-tertiary" placeholder="TITRE" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="durationInput" className="pb-2 text-white/50">DURÉE EXACTE (EN SECONDES) *</label>
                                <input type="number" name="duration" min={1} id="durationInput" className="bg-black border border-dark-border p-3 rounded-lg text-sm outline-none focus:border-blue-tertiary" placeholder="EX:60" />
                            </div>
                        </div>

                        <div className="flex flex-col pt-15 tracking-wider text-base font-bold">
                            <label htmlFor="descriptionInput" className="pb-2 text-white/50">MANIFESTE / SYNOPSIS * (MAX. 300 CARACTÈRES)</label>
                            <textarea name="description" id="descriptionInput" maxLength={300} className="bg-black border border-dark-border p-3 rounded-lg text-sm uppercase min-h-35 max-h-45 outline-none focus:border-blue-tertiary"
                                placeholder="résumez l’intention de votre film et l’histoire qu’il raconte en quelques lignes...">
                            </textarea>
                        </div>
                    </fieldset>

                    {/* 02. Déclaration IA */}
                    <fieldset className="bg-dark-card text-white p-10 fieldset border-dark-border rounded-box m-7 border pt-15 pb-15 pr-10 pl-10">
                        <div className="flex border-b border-gray-700 pb-5">
                            <p className="uppercase tracking-widest font-bold text-lg">02. Déclaration Usage de l'IA</p>
                        </div>

                        <div className="flex gap-10 justify-center bg-black/40 p-5 rounded-box border border-gray-700 mt-10">
                            <img src="src/assets/icon-info.png" className="h-10" alt="" />
                            <p className="uppercase font-bold text-base tracking-wider ">
                                MARS.A.I exige une transparence totale sur l'utilisation de l'Intelligence Artificielle. Sélectionnez tous les outils génératifs sollicités dans votre processus créatif.
                            </p>
                        </div>

                        <div>
                            <p className="uppercase font-bold text-base tracking-widest pt-10 pb-10">
                                Classification de l'Œuvre : * Choix exclusif entre :
                            </p>
                            <div className="flex text-base font-bold tracking-widest justify-evenly gap-5">
                                {options.map((option, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setSelected(option.value)}
                                        className={`uppercase p-10 cursor-pointer rounded-box border transition-all duration-200
                                             ${selected === option.value
                                                ? "bg-blue-tertiary text-white border-blue-500 shadow-glow-blue"
                                                : "bg-black/50 text-white/50 border-gray-700 hover:bg-gray-800"
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="text-base uppercase pt-10 font-bold tracking-widest grid grid-cols-2 gap-x-20 gap-y-15">
                            <div className="flex flex-col">
                                <label htmlFor="stack-techno" className="pb-5">Stack Technologique *</label>
                                <textarea name="outil_Ai" className="resize-none h-60 uppercase bg-black/50 p-5 rounded-box border border-gray-700 outline-none focus:border-blue-tertiary"
                                    placeholder="Listez les outils utilizados (ex: Midjourney pour les visuels, ElevenLabs pour les voix, Runway pour l'animation...)"
                                    maxLength={500}
                                ></textarea>
                            </div>
                            <div className="flex flex-col ">
                                <label htmlFor="creativeMethodology" className="pb-5">Méthodologie Créative </label>
                                <textarea name="creativeMethodology" maxLength={500} className="resize-none h-60 uppercase bg-black/50 p-5 rounded-box border border-gray-700 outline-none focus:border-blue-tertiary"
                                    placeholder="Décrivez l'interaction entre l'humain et la machine dans ce processus.."
                                ></textarea>
                            </div>
                        </div>
                    </fieldset>

                    {/* 03. Livrables */}
                    <fieldset className="fieldset tracking-widest uppercase bg-dark-card border-dark-border rounded-box text-base font-bold m-7 border p-10">
                        <div className="flex gap-3 pb-7">

                            <p className="uppercase font-display pt-1 text-base tracking-widest font-bold text-lg ">03. Livrables & Accessibilité</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-20 gap-y-15 ">
                            {/*VIDEO */}
                            <VideoUpload
                                label="Lien YouTube (Public / Non-répertorié) *"
                                name="film"
                                id="videoUrl" />

                            {/*SUBTITULOS */}
                            <div className="text-white/50 flex flex-col">
                                <DynamicSubtitleInput subtitles={subtitles}
                                    setSubtitles={setSubtitles} />
                            </div>
                            {/*POSTER */}
                            <ImagesPreview
                                id="fichier-vignette"
                                label="Vignette Officielle (16:9) *"
                                name="poster"
                                defaultImage={defaultImg}
                                fullPreviewOnUpload={true}
                                onFileSelect={setPosterFile} />

                            {/*GALERIA */}
                            <div>

                                <p className="text-white/50 p-3">Galerie Médias (Stills - Max 2)</p>
                                <div className="flex justify-around gap-1">
                                    <ImagesPreview label="" id="fichier-galerie-1" defaultImage={defaultImg} name="galerie" />
                                    <ImagesPreview label="" id="fichier-galerie-2" name="galerie" defaultImage={defaultImg} />
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* 04. Équipe */}
                    <fieldset className="fieldset bg-dark-card uppercase border-dark-border rounded-box m-7 border p-10">
                        <div className="flex gap-5 mb-5">
                            <img src="src/assets/avatar.png" className="w-12 rounded-box bg-white/5 p-1" alt="" />
                            <p className="uppercase pt-2 tracking-widest font-bold text-lg "> 04. Composition de l'Équipe</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            {collaborateurs.map((collab, index) => (
                                <div key={index} className="bg-black/40 p-5 flex justify-center gap-5 font-bold rounded-box tracking-wider text-sm">
                                    <select className="bg-black border border-gray-700 p-5 rounded-box mt-5 text-white" value={collab.genre} onChange={(e) => handleCollabChange(index, "genre", e.target.value)}>
                                        <option value="male">M.</option>
                                        <option value="female">Mrs.</option>
                                    </select>
                                    <input type="text" placeholder="EX: JEAN DUPOND" className="bg-black border border-gray-700 p-5 w-200 rounded-box mt-5 text-white outline-none focus:border-blue-tertiary"
                                        value={collab.name} onChange={(e) => handleCollabChange(index, "name", e.target.value)} />
                                    {collaborateurs.length > 1 && (
                                        <button type="button" onClick={() => removeCollaborateur(index)} className="bg-red-900/40 cursor-pointer text-red-500 p-7 rounded-lg hover:bg-red-600 hover:text-white transition-all">X</button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addCollaborateur} className="btn self-center cursor-pointer  bg-blue-tertiary text-white py-6 px-20 font-bold text-lg rounded-2xl uppercase shadow-glow-blue hover:scale-105 transition-all mt-10 mb-20 flex items-center gap-3">
                                + Ajouter un collaborateur
                            </button>
                        </div>
                    </fieldset>

                    <div className="bg-blue-tertiary/10 flex justify-center gap-7 rounded-4xl p-10 m-7 tracking-widest uppercase border border-blue-tertiary/20">
                        <img src="src/assets/icon-protection.png" className="h-10" alt="" />
                        <div className="flex flex-col justify-between gap-5 text-white/80">
                            <p className="font-extrabold text-base">Certificat de Propriété</p>
                            <p className="font-sm">En soumettant ce dossier, vous certifiez sur l'honneur être l'auteur original de l'œuvre et détenir l'intégralité des droits de diffusion.</p>
                        </div>
                    </div>

                    <button className="btn self-center cursor-pointer bg-blue-tertiary text-white p-8 font-bold text-base tracking-widest rounded-xl uppercase shadow-glow-blue hover:scale-105 transition-all mb-20" type="submit">
                        finaliser ma soumission
                    </button>
                </form>
                <Toast messages={toastMessages} />
            </div>
        </div>
    );
}