import { useState } from "react";
import DynamicInputList from "../../components/DynamicInput";
import ImagesPreview from "../../components/imagesPreview";
import defaultImg from "../../assets/image-default.png";
import VideoUpload from "../../components/videoPreview";


export default function PostMovie() {
    const [posterFile, setPosterFile] = useState(null);
    const [socials, setSocials] = useState([""]);
    const [collaborateurs, setCollaborateurs] = useState([{ genre: "", name: "" }]);
    const [selected, setSelected] = useState(null);

    const options = [
        { label: "Génération intégrale (100% IA)", value: "full_ai" },
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

    const removeCollaborateur = (index) => {
        setCollaborateurs(collaborateurs.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        socials.forEach((s, i) => {
            formData.append(`socialNetworks[${i}]`, s);
        });

        collaborateurs.forEach((c, i) => {
            formData.append(`collaborateurs[${i}][genre]`, c.genre);
            formData.append(`collaborateurs[${i}][name]`, c.name);
        });

        if (selected) formData.append("generate_Ai", selected);

        if (posterFile) formData.append("poster", posterFile);

        try {
            const response = await fetch("http://localhost:3000/films", {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            if (!response.ok) {
                const err = await response.json();
                console.error("Erreur lors de la soumission du film :", err);
                return;
            }

            const data = await response.json();
            console.log("Film soumis avec succès :", data);
        } catch (error) {
            console.error(error)
        }

    }



    return (

        <div className="flex flex-col m-8 flex-wrap">

            <div className="font-display text-center flex items-center flex-col ">

                <div className="flex uppercase font-extrabold p-5 ">

                    <img src="src/assets/icon-stars.png" className="w-8 pr-2" alt="" />
                    <p className="text-blue-tertiary text-base tracking-wider"> Appel à Projets 2026</p>

                </div>

                <h1 className="text-7xl text-white-secondary uppercase font-extrabold pb-8 ">Soumettre un <span className="text-blue-tertiary">film</span></h1>
                <p className="font-bold text-lg text-black-primary tracking-wide w-2xl ">Transmettez les éléments techniques,
                    l'usage de l'IA et la composition de votre équipe.
                    Tous les champs marqués d'une étoile (*) sont obligatoires.
                </p>

            </div>

            <form action="" className="m-5 font-display flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data">

                <fieldset className="fieldset bg-white border-base-300 rounded-box m-7 border p-10">

                    <div className="flex pb-5">

                        <img src="src/assets/icon-film.png" className="w-5" alt="" />
                        <p className="uppercase font-display pl-2 tracking-widest font-bold text-lg ">01. Identité du Film</p>

                    </div>

                    <div className="grid grid-cols-2 gap-x-20 gap-y-15 pt-5 tracking-wider text-base font-bold">

                        <div className="flex flex-col">
                            <label htmlFor="lastNameInput" className="pb-2 text-white-primary"> NOM *</label>
                            <input type="text" name="last_name" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" required id="titreInput" placeholder="TITRE ORIGINAL" />
                        </div>

                        <div className="flex flex-col">
                            <label className="pb-2 text-white-primary"> EMAIL * </label>
                            <input type="email" name="email" required className="bg-[#F2F2F2] p-3 rounded-lg text-sm" id="emailInput" placeholder="EMAIL" />
                        </div>

                        <div className="flex flex-col">
                            <label className="pb-2 text-white-primary"> CATEGORY </label>
                            <input type="text" name="category" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" id="categoryInput" placeholder="CATEGORY" />
                        </div>

                        <div className="flex flex-col">
                            <label className="pb-2 text-white-primary"> ÉTUDES </label>
                            <input type="text" name="school" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" id="schoolInput" placeholder="ÉTUDES" />
                        </div>
                        <div className="flex flex-col">
                            <label className="pb-2 text-white-primary"> PAYS </label>
                            <input type="text" name="country" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" id="countryInput" placeholder="PAYS" />
                        </div>


                        <DynamicInputList
                            label="RÉSEAUX SOCIAUX *"
                            array={socials}
                            setArray={setSocials}
                            name="socialNetworks"
                            placeholder="Lien vers votre profil (Instagram, YouTube…)"
                        />

                        <div className="flex flex-col">
                            <label htmlFor="titleInput" className="pb-2 text-white-primary">TITRE *</label>
                            <input type="text" name="title" id="titleInput" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" placeholder="TITRE" required />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="durationInput" className="pb-2 text-white-primary">DURÉE EXACTE (EN SECONDES) *</label>
                            <input type="number" name="duration" id="durationInput" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" placeholder="EX:60" required />
                        </div>


                    </div>

                    <div className="flex flex-col pt-15 tracking-wider text-base font-bold">
                        <label htmlFor="bioInput" className="pb-2 text-white-primary"> BIOGRAPHIE  (MAX. 300 CARACTÈRES)</label>
                        <textarea name="bio" id="bioInput" maxLength={300} className="bg-[#F2F2F2] p-3 rounded-lg text-sm uppercase min-h-35 max-h-45"
                            placeholder="résumez l’intention de votre film et l’histoire qu’il raconte en quelques lignes...">
                        </textarea>
                    </div>

                    <div className="flex flex-col pt-15 tracking-wider text-base font-bold">
                        <label htmlFor="descriptionInput" className="pb-2 text-white-primary">MANIFESTE / SYNOPSIS * (MAX. 300 CARACTÈRES)</label>
                        <textarea name="description" id="descriptionInput" required maxLength={300} className="bg-[#F2F2F2] p-3 rounded-lg text-sm uppercase min-h-35 max-h-45"
                            placeholder="résumez l’intention de votre film et l’histoire qu’il raconte en quelques lignes...">
                        </textarea>
                    </div>

                </fieldset>

                <fieldset className="bg-[#292828] text-white p-10  fieldset border-base-300 rounded-box m-7 border pt-15 pb-15 pr-10 pl-10">

                    <div className="flex border-b border-gray-600 pb-5">
                        <img src="src/assets/icon-placa.png" alt="" className="bg-[#246BAD] rounded-box p-2 h-12" />
                        <h1 className="uppercase font-display pl-3 pt-2 tracking-widest font-bold text-lg">02. Déclaration Usage de l'IA</h1>
                    </div>


                    <div className="flex gap-10 justify-center bg-[#333333] p-5 rounded-box border border-gray-600 mt-10">
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
                                    required
                                    name="generate_Ai"
                                    onClick={() => setSelected(option.value)}
                                    className={`uppercase p-10 rounded-box border
                                                 border-gray-600 transition-all 
                                                 duration-200
                                             ${selected === option.value
                                            ? "bg-blue-600 text-white border-blue-800"
                                            : "bg-[#333333] text-white hover:bg-gray-700"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}

                        </div>
                    </div>


                    <div className="text-base uppercase  pt-10 font-bold tracking-widest grid grid-cols-2 gap-x-20 gap-y-15 ">

                        <div className="flex flex-col">
                            <label htmlFor="stack-techno"
                                className="pb-5"
                            >Stack Technologique *</label>
                            <textarea name="outil_Ai" id=""
                                className="resize-none  h-60 uppercase bg-[#333333] p-5 rounded-box border border-gray-600"
                                placeholder="Listez les outils utilisés (ex: Midjourney pour les visuels, ElevenLabs pour les voix, Runway pour l'animation...)"
                                maxLength={500}
                                required
                            ></textarea>

                        </div>

                        <div className="flex flex-col ">

                            <label htmlFor="creativeMethodology"
                                className="pb-5"
                            >Méthodologie Créative </label>
                            <textarea name="creativeMethodology" id="creativeMethodology"
                                maxLength={500}
                                className="resize-none h-60 uppercase bg-[#333333] p-5 rounded-box border border-gray-600"
                                placeholder="Décrivez l'interaction entre l'humain et la machine dans ce processus.."
                            ></textarea>

                        </div>

                    </div>

                </fieldset>

                <fieldset className="fieldset tracking-widest uppercase bg-white border-base-300 rounded-box text-base font-bold  m-7 border p-10">
                    <div>
                        <div className="flex gap-3 pb-7">

                            <img src="src/assets/icon-stars.png" className="w-9 bg-[#FFF7F6]" alt="" />
                            <p className="uppercase font-display pt-1 text-base tracking-widest font-bold text-lg ">03. Livrables & Accessibilité</p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-20 gap-y-15 " >

                            <VideoUpload label="Lien YouTube (Public / Non-répertorié) *" name="film" id="videoUrl" />

                            <div className="text-white-primary flex flex-col">
                                <p>Sous-titres (.srt)</p>
                                <label className="flex items-center gap-3 pt-4 gap-6 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="checkbox-soustitre"
                                        className="checkbox checkbox-sm"
                                    />
                                    <span>Voix ou textes nécessitant des sous-titres</span>
                                </label>
                                <label htmlFor="subtitle"
                                    className="bg-[#F2F2F2] p-4 rounded-lg text-sm uppercase mt-3 cursor-pointer"
                                >Choisir fichier .SRT</label>
                                <input type="file" name="subtitle" id="subtitle"
                                    className="hidden"
                                />

                            </div>

                            <div>

                                <ImagesPreview
                                    id="fichier-vignette"
                                    label="Vignette Officielle (16:9) *"
                                    name="poster"
                                    defaultImage={defaultImg}
                                    fullPreviewOnUpload={true}
                                    onFileSelect={setPosterFile}
                                />

                            </div>


                            <div>
                                <p className="text-white-primary p-3">Galerie Médias (Stills - Max 2)</p>

                                <div className="flex justify-around gap-1">

                                    <ImagesPreview
                                        label=""
                                        id="fichier-galerie-1"
                                        defaultImage={defaultImg}
                                        name="galerie"
                                    />

                                    <ImagesPreview
                                        label=""
                                        id="fichier-galerie-2"
                                        name="galerie"
                                        defaultImage={defaultImg}
                                    />

                                </div>

                                <input type="file" className="hidden" name="fichier-galerie-1" id="fichier-galerie-1" />
                                <input type="file" className="hidden" name="fichier-galerie-2" id="fichier-galerie-2" />
                            </div>

                        </div>
                    </div>
                </fieldset>


                <fieldset className="fieldset bg-white uppercase border-base-300 rounded-box m-7 border p-10">
                    <div>
                        <div className="flex justify-between font-bold">
                            <div className="flex gap-5">
                                <img src="src/assets/avatar.png" className="w-12 rounded-box bg-[#FAF5FF] p-1" alt="" />
                                <p className="uppercase pt-2 tracking-widest font-bold text-lg " > 04. Composition de l'Équipe</p>
                            </div>
                        </div>



                        <div className="flex flex-col gap-3">
                            <label className="pb-2 text-white-primary uppercase font-bold"></label>
                            {collaborateurs.map((collab, index) => (
                                <div key={index} className="bg-[#F2F2F2] p-5 flex justify-center gap-5 font-bold rounded-box tracking-wider text-sm text-white-primary">
                                    <select
                                        className="bg-white p-5 border-2 rounded-box mt-5"
                                        value={collab.genre}
                                        onChange={(e) => handleCollabChange(index, "genre", e.target.value)}
                                    >

                                        <option value="male">M.</option>
                                        <option value="female">Mrs.</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="EX: JEAN DUPOND"
                                        className="bg-white p-5 border-2 w-200 rounded-box mt-5 "
                                        value={collab.name}
                                        name="collaborateur"
                                        onChange={(e) => handleCollabChange(index, "name", e.target.value)}
                                    />
                                    {collaborateurs.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeCollaborateur(index)}
                                            className="bg-red-500 p-7 text-white rounded-lg"
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addCollaborateur}
                                className="mt-2 self-center bg-blue-600 font-bold font-display text-base uppercase text-white p-5  rounded-lg"
                            >
                                + Ajouter un collaborateur
                            </button>
                        </div>


                    </div>



                </fieldset>
                <div className="bg-[#F0F6FF] flex justify-center gap-7 rounded-4xl p-10 m-7 tracking-widest  uppercase">
                    <img src="src/assets/icon-protection.png" className="h-10" alt="" />
                    <div className="flex flex-col justify-between gap-5">
                        <p className="font-extrabold text-base">Certificat de Propriété</p>
                        <p className=" font-sm">En soumettant ce dossier, vous certifiez sur l'honneur être l'auteur original de l'œuvre et détenir l'intégralité des droits de diffusion. Vous acceptez que MARS.A.I utilise ces éléments pour la promotion du festival.</p>
                    </div>
                </div>

                <button className="btn self-center bg-[#246BAD] text-white p-8 font-bold text-base tracking-widest rounded-xl uppercase">finaliser ma soumission</button>
            </form >

        </div >
    )
}