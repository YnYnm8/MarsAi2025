import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // <-- Import ajouté
import { DynamicSubtitleInput } from "../../components/DynamicInput";
import ImagesPreview from "../../components/imagesPreview";
import defaultImg from "../../assets/image-default.png";
import VideoUpload from "../../components/videoPreview";
import { useNavigate } from "react-router";
import { Toast } from "../../components/toastMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faFilm, faMicrochip, faSave, faUsers, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export default function PostFilm() {
    const { t } = useTranslation("formulaireF");

    const [posterFile, setPosterFile] = useState(null);
    const [duration, setDuration] = useState("");
    const [collaborateurs, setCollaborateurs] = useState([{ genre: "male", name: "" }]);
    const [selected, setSelected] = useState(null);
    const [toastMessages, setToastMessages] = useState([]);
    const [subtitles, setSubtitles] = useState([{ type: "file", value: null }]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [uploadMode, setUploadMode] = useState("file"); // o "youtube"
    const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);


    const navigate = useNavigate();

    const options = [
        { label: t("options.fullAi"), value: "fullAi" },
        { label: t("options.hybrid"), value: "hybrid" },
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

    const fetchYoutubeInfo = async () => {
        const cleanUrl = youtubeUrl.trim();
        if (!cleanUrl) return;

        setIsLoadingYoutube(true);
        try {
            const response = await fetch(`http://localhost:3004/films/youtube-info?url=${encodeURIComponent(cleanUrl)}`);
            const data = await response.json();
            console.log(data)
            if (response.ok && data.title) {
                setTitle(data.title);
                setDescription(data.description || "");
                if (data.duration) {
                    setDuration(data.duration);
                }

                const youtubeImg = data.thumbnails?.maxres?.url ||
                    data.thumbnail ||
                    data.thumbnails?.high?.url ||
                    data.thumbnails?.medium?.url ||
                    data.thumbnails?.default?.url;

                setPosterFile(youtubeImg);

                setToastMessages(["¡Información de YouTube cargada!"]);
            } else {
                setToastMessages(["No se encontró información del video"]);
            }
        } catch (error) {
            setToastMessages(["Error al conectar con el servidor"]);
        } finally {
            setIsLoadingYoutube(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmation = window.confirm(t("alerts.confirmSubmit"));
        if (!confirmation) return

        const formData = new FormData(e.target);
        //Append youtube
        if (uploadMode === "youtube" && youtubeUrl) {
            formData.append("youtubeUrl", youtubeUrl);
        }

        subtitles.forEach((sub) => {
            if (sub.type === "file" && sub.value) {
                formData.append("subtitle", sub.value);
            } else if (sub.type === "url" && sub.value) {
                formData.append("subtitle", sub.value);
            }
        });

        // Append de colaboradores

        const namesWithGenre = collaborateurs
            .filter(c => c.name && c.name.trim() !== "") // Evita vacíos
            .map(c => {
                const prefix = c.genre === 'female' ? 'Mrs.' : 'M.';
                return `${prefix} ${c.name.trim()}`;
            })
            .join(", ");
        formData.delete("collaborateur");
        formData.append("collaborateur", namesWithGenre);

        // Append de generateAi

        if (selected) formData.append("generateAi", selected);

        //Append poster 

        formData.delete("poster");
        formData.delete("posterUrl");

        if (posterFile instanceof File) {
            formData.set("poster", posterFile);
        } else if (typeof posterFile === 'string' && posterFile !== "") {
            formData.set("posterUrl", posterFile);
        }
        try {
            const response = await fetch("http://localhost:3004/films", {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setToastMessages(data.errors.map(err => err.message));
                } else {
                    setToastMessages([data.message || t("alerts.errorUnknown")]);
                }
                return;
            }

            console.log("Film soumis avec succès :", data);

            navigate("/me", {
                state: { successMessage: t("alerts.successSubmit") },
            });
        } catch (error) {
            setToastMessages([t("alerts.networkError")]);
            console.error(error);
        }
    }

    return (
        <div className="bg-black-primary min-h-screen text-white">

            <div className="flex flex-col m-8 flex-wrap">
                <div className="font-display text-center flex items-center flex-col ">
                    <div className="flex uppercase font-extrabold p-5 ">
                        <img src="src/assets/icon-stars.png" className="w-8 pr-2" alt="" />
                        <p className="text-brand-blue text-base tracking-wider">{t("header.callForProjects")}</p>
                    </div>

                    <h1 className="text-7xl text-white-secondary uppercase font-extrabold pb-8 ">
                        {t("header.submitTitle1")}<span className="text-blue-tertiary">{t("header.submitTitle2")}</span>
                    </h1>
                    <p className="font-bold text-lg text-white/60 tracking-wide w-2xl ">
                        {t("header.description1")}<br />
                        {t("header.description2")}
                    </p>
                </div>

                <form className="m-5 font-display flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">

                    {/* 01. Identité */}
                    <fieldset className="fieldset bg-dark-card border-dark-border rounded-box m-7 border p-10">
                        <div className="flex pb-5">
                            <p className="uppercase font-display pl-2 tracking-widest font-bold text-lg ">{t("step1.title")}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-20 gap-y-15 pt-5 tracking-wider text-base font-bold">
                            <div className="flex flex-col">
                                <label htmlFor="titleInput" className="pb-2 text-white/50">{t("step1.titleLabel")}</label>
                                <input type="text" name="title" id="titleInput" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-black border border-dark-border p-3 rounded-lg text-sm outline-none focus:border-blue-tertiary" placeholder={t("step1.titlePlaceholder")} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="durationInput" className="pb-2 text-white/50">{t("step1.durationLabel")}</label>
                                <input type="number"
                                    name="duration"
                                    id="durationInput"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder={t("step1.durationPlaceholder")}
                                    min={1}
                                    className="bg-black border border-dark-border p-3 rounded-lg text-sm outline-none focus:border-blue-tertiary" />
                            </div>
                        </div>

                        <div className="flex flex-col pt-15 tracking-wider text-base font-bold">
                            <label htmlFor="descriptionInput" className="pb-2 text-white/50">{t("step1.synopsisLabel")}</label>
                            <textarea name="description"
                                id="descriptionInput"
                                maxLength={300}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-black border border-dark-border p-3 rounded-lg text-sm uppercase min-h-35 max-h-45 outline-none focus:border-blue-tertiary"
                                placeholder={t("step1.synopsisPlaceholder")}>
                            </textarea>
                        </div>
                    </fieldset>

                    {/* 02. Déclaration IA */}
                    <fieldset className="bg-dark-card text-white p-10 fieldset border-dark-border rounded-box m-7 border pt-15 pb-15 pr-10 pl-10">
                        <div className="flex border-b border-gray-700 pb-5">
                            <p className="uppercase tracking-widest font-bold text-lg">{t("step2.title")}</p>
                        </div>

                        <div className="flex gap-10 justify-center bg-black/40 p-5 rounded-box border border-gray-700 mt-10">
                            <img src="src/assets/icon-info.png" className="h-10" alt="" />
                            <p className="uppercase font-bold text-base tracking-wider ">
                                {t("step2.transparencyText")}
                            </p>
                        </div>

                        <div>
                            <p className="uppercase font-bold text-base tracking-widest pt-10 pb-10">
                                {t("step2.classificationLabel")}
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
                                <label htmlFor="stack-techno" className="pb-5">{t("step2.stackLabel")}</label>
                                <textarea name="outil_Ai" className="resize-none h-60 uppercase bg-black/50 p-5 rounded-box border border-gray-700 outline-none focus:border-blue-tertiary"
                                    placeholder={t("step2.stackPlaceholder")}
                                    maxLength={500}
                                ></textarea>
                            </div>
                            <div className="flex flex-col ">
                                <label htmlFor="creativeMethodology" className="pb-5">{t("step2.methodologyLabel")}</label>
                                <textarea name="creativeMethodology" maxLength={500} className="resize-none h-60 uppercase bg-black/50 p-5 rounded-box border border-gray-700 outline-none focus:border-blue-tertiary"
                                    placeholder={t("step2.methodologyPlaceholder")}
                                ></textarea>
                            </div>
                        </div>
                    </fieldset>


                    {/* 03. Livrables */}
                    <fieldset className="fieldset tracking-widest uppercase bg-dark-card border-dark-border rounded-box text-base font-bold m-7 border p-10">
                        <div className="flex gap-3 pb-7">
                            <p className="uppercase font-display pt-1 text-base tracking-widest font-bold text-lg ">
                                {t("step3.title")}
                            </p>
                        </div>

                        {/* Sélecteur de mode : Fichier vs YouTube */}
                        <div className="flex bg-black/40 p-1 rounded-xl border border-dark-border w-fit mb-10 self-center">
                            <button
                                type="button"
                                onClick={() => setUploadMode("file")}
                                className={`px-8 py-2 cursor-pointer rounded-lg text-[10px] font-bold tracking-widest transition-all duration-300 ${uploadMode === "file"
                                    ? "bg-blue-tertiary text-white shadow-lg shadow-blue-tertiary/20"
                                    : "text-white/40 hover:text-white/60"
                                    }`}
                            >
                                {t("step3.typeFile", "FICHIER LOCAL")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMode("youtube")}
                                className={`px-8 py-2 cursor-pointer rounded-lg text-[10px] font-bold tracking-widest transition-all duration-300 ${uploadMode === "youtube"
                                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                    : "text-white/40 hover:text-white/60"
                                    }`}
                            >
                                {t("step3.typeYoutube", "LIEN YOUTUBE")}
                            </button>
                        </div>

                        {/* Champ URL YouTube (Visible uniquement en mode YouTube) */}
                        {uploadMode === "youtube" && (
                            <div className="col-span-2 flex flex-col mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="pb-3 text-white/50 uppercase text-xs tracking-widest font-bold">
                                    {t("step3.youtubeLabel")}
                                </label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
                                            className="w-full bg-black border border-dark-border p-4 rounded-xl text-sm outline-none focus:border-red-600 transition-all"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                        <FontAwesomeIcon icon={faFilm} className="absolute right-4 top-4 text-red-600/30" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={fetchYoutubeInfo}
                                        disabled={isLoadingYoutube || !youtubeUrl}
                                        className={`px-6 rounded-xl cursor-pointer font-bold uppercase text-xs transition-all flex items-center gap-2 
                    ${isLoadingYoutube ? 'bg-gray-800 text-gray-500' : 'bg-red-600/10 border border-red-600/40 text-red-500 hover:bg-red-600 hover:text-white'}`}
                                    >
                                        {isLoadingYoutube ? t("step3.loading", 'Chargement...') : t("step3.importBtn", 'Importer info')}
                                        <FontAwesomeIcon icon={faCloudUploadAlt} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-x-20 gap-y-15 ">
                            {/* Composant VideoUpload adapté */}

                            <VideoUpload
                                label={uploadMode === "file" ? t("step3.fileUpload", "Télécharger le film") : t("step3.previewYoutube", "Aperçu YouTube")}
                                name="film"
                                youtubeUrl={uploadMode === "youtube" ? youtubeUrl : ""}
                                uploadMode={uploadMode}
                                onDurationError={(msg) => setToastMessages([msg])}
                                id="videoUrl"
                            />

                            <div className="text-white/50 flex flex-col">
                                <DynamicSubtitleInput
                                    subtitles={subtitles}
                                    setSubtitles={setSubtitles}
                                />
                            </div>

                            <ImagesPreview
                                id="fichier-vignette"
                                label={t("step3.posterLabel")}
                                name="poster"
                                defaultImage={defaultImg}
                                defaultValue={posterFile}
                                fullPreviewOnUpload={true}
                                onFileSelect={setPosterFile}
                            />

                            <div>
                                <p className="text-white/50 p-3">{t("step3.galleryLabel")}</p>
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
                            <p className="uppercase pt-2 tracking-widest font-bold text-lg "> {t("step4.title")}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            {collaborateurs.map((collab, index) => (
                                <div key={index} className="bg-black/40 p-5 flex justify-center gap-5 font-bold rounded-box tracking-wider text-sm">
                                    <select className="bg-black border border-gray-700 p-5 rounded-box mt-5 text-white"
                                        value={collab.genre}
                                        onChange={(e) => handleCollabChange(index, "genre", e.target.value)}>
                                        <option value="male">{t("step4.mr")}</option>
                                        <option value="female">{t("step4.mrs")}</option>
                                    </select>

                                    <input type="text" placeholder={t("step4.namePlaceholder")} className="bg-black border border-gray-700 p-5 w-200 rounded-box mt-5 text-white outline-none focus:border-blue-tertiary"
                                        value={collab.name} onChange={(e) => handleCollabChange(index, "name", e.target.value)} />
                                    {collaborateurs.length > 1 && (
                                        <button type="button" onClick={() => removeCollaborateur(index)} className="text-red-500  cursor-pointer bg-red-500/10 p-8 text-xl rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>)}


                                </div>
                            ))}
                            <button type="button"
                                onClick={addCollaborateur}
                                className="mt-4 cursor-pointer self-center bg-blue-tertiary/10 border border-blue-tertiary/40 text-blue-tertiary px-8 py-4 rounded-xl font-bold uppercase text-xs flex items-center gap-2 hover:bg-blue-tertiary hover:text-white transition-all"
                            >
                                {t("step4.addCollaborator")}
                            </button>
                        </div>
                    </fieldset>

                    <div className="bg-blue-tertiary/10 flex justify-center gap-7 rounded-4xl p-10 m-7 tracking-widest uppercase border border-blue-tertiary/20">
                        <img src="src/assets/icon-protection.png" className="h-10" alt="" />
                        <div className="flex flex-col justify-between gap-5 text-white/80">
                            <p className="font-extrabold text-base">{t("footer.certificateTitle")}</p>
                            <p className="font-sm">{t("footer.certificateText")}</p>
                        </div>
                    </div>

                    <button className="btn self-center bg-blue-tertiary cursor-pointer text-white p-8 font-bold text-base tracking-widest rounded-xl uppercase shadow-glow-blue hover:scale-105 transition-all mb-20" type="submit">
                        {t("footer.submitBtn")}
                    </button>
                </form>
                <Toast messages={toastMessages} />
            </div>
        </div>
    );
}