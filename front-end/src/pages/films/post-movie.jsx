export default function PostMovie() {
    return (
        <div className="flex flex-col m-8 flex-wrap ">
            <div className="font-display text-center flex items-center flex-col ">
                <div className="flex uppercase font-extrabold p-5 ">
                    <img src="src/assets/icon-stars.png" className="w-8 pr-2" alt="" />
                    <p className="text-[var(--color-secondary-orange)] text-base tracking-wider"> Appel à Projets 2026</p>
                </div>
                <h1 className="text-7xl uppercase font-extrabold pb-8 ">Soumettre un <span className="text-[var(--color-primary-blue)]">film</span></h1>
                <p className="font-bold text-lg tracking-wide w-2xl ">Transmettez les éléments techniques,
                    l'usage de l'IA et la composition de votre équipe.
                    Tous les champs marqués d'une étoile (*) sont obligatoires.
                </p>
            </div>
            <form action="" className="m-5 font-display flex flex-col" >
                <fieldset className="fieldset bg-white border-base-300 rounded-box m-7 border p-10">
                    <div className="flex pb-5">
                        <img src="src/assets/icon-film.png" className="w-5" alt="" />
                        <p className="uppercase font-display pl-2 tracking-widest font-bold text-lg ">01. Identité du Film</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-20 gap-y-15 pt-5 tracking-wider text-base font-bold">
                        <div className="flex flex-col">
                            <label className="pb-2 text-[#64748B]">TITRE ORIGINAL *</label>
                            <input type="text" name="titre" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" required id="titreInput" placeholder="TITRE ORIGINAL" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="pb-2 text-[#64748B]">TRADUCTION ANGLAISE *</label>
                            <input type="text" name="" id="" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" placeholder="TRADUCTION ANGLAISE" required />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="pb-2 text-[#64748B]">DURÉE EXACTE (EN SECONDES) *</label>
                            <input type="number" name="" id="" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" placeholder="EX:60" required />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="" className="pb-2 text-[#64748B]">LANGUE PARLÈE/PRINCIPALE DU FILM *</label>
                            <input type="text" placeholder="LANGUE" className="bg-[#F2F2F2] p-3 rounded-lg text-sm" required />
                        </div>
                    </div>

                    <div className="flex flex-col pt-15 tracking-wider text-base font-bold">
                        <label htmlFor="" className="pb-2 text-[#64748B]">SYNOPSIS LANGUE ORIGINALE* (MAX. 300 CARACTÈRES)</label>
                        <textarea name="" id="" maxLength={300} className="bg-[#F2F2F2] p-3 rounded-lg text-sm uppercase min-h-35 max-h-45"
                            placeholder="résumez l’intention de votre film et l’histoire qu’il raconte en quelques lignes...">
                        </textarea>


                        <div className="flex flex-col pt-15 tracking-wider text-base font-bold">
                            <label htmlFor="" className="pb-2 text-[#64748B]">SYNOPSIS ANGLAIS* (MAX. 300 CARACTÈRES)</label>
                            <textarea name="" id="" className="bg-[#F2F2F2] p-3 rounded-lg text-sm uppercase min-h-35 max-h-45" placeholder="résumez l’intention de votre film et l’histoire qu’il raconte en quelques lignes..."></textarea>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="bg-[#292828] text-white  fieldset border-base-300 rounded-box m-7 border pt-15 pb-15 pr-10 pl-10">
                    <div className="flex border-b border-gray-600 pb-2">
                        <img src="src/assets/icon-placa.png" alt="" className="bg-[#246BAD] rounded-box p-2 h-15" />
                        <h1 className="uppercase font-display p-5 tracking-widest font-bold text-lg">02. Déclaration Usage de l'IA</h1>
                    </div>
                    <div className="flex gap-10 justify-center bg-[#333333] p-5 rounded-box border border-gray-600 mt-10">
                        <img src="src/assets/icon-info.png" className="h-10" alt="" />
                        <p className="uppercase font-bold text-base tracking-wider ">
                            MARS.A.I exige une transparence totale sur l'utilisation de l'Intelligence Artificielle. Sélectionnez tous les outils génératifs sollicités dans votre processus créatif.
                        </p>
                    </div>
                    <div >
                        <p className="uppercase font-bold text-base tracking-widest pt-10 pb-10">
                            Classification de l'Œuvre : * Choix exclusif entre :
                        </p>
                        <div className="flex text-base font-bold tracking-widest justify-evenly gap-5  "  >
                            <p className=" uppercase bg-[#333333] p-10 rounded-box border border-gray-600">Génération intégrale (100% IA)</p>
                            <p className=" uppercase bg-[#333333] p-10 rounded-box border border-gray-600">Production hybride (Prises de vues
                                réelles + apports IA)    </p>
                        </div>
                    </div>
                    <div className="text-base uppercase  pt-10 font-bold tracking-widest grid grid-cols-2 gap-x-20 gap-y-15 ">
                        <div className="flex flex-col">
                            <label htmlFor="stack-techno"
                                className="pb-5"
                            >Stack Technologique *</label>
                            <textarea name="" id=""
                                className="resize-none  h-60 uppercase bg-[#333333] p-5 rounded-box border border-gray-600"
                                placeholder="Listez les outils utilisés (ex: Midjourney pour les visuels, ElevenLabs pour les voix, Runway pour l'animation...)"
                                maxLength={500}
                            ></textarea>
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="metoCreative"
                                className="pb-5"
                            >Méthodologie Créative *</label>
                            <textarea name="metoCreative" id=""
                                maxLength={500}
                                className="resize-none h-60 uppercase bg-[#333333] p-5 rounded-box border border-gray-600"
                                placeholder="Décrivez l'interaction entre l'humain et la machine dans ce processus.."
                            ></textarea>
                        </div>
                    </div>

                </fieldset>

                <fieldset className="fieldset tracking-widest uppercase bg-white border-base-300 rounded-box text-base font-bold  m-7 border p-10">

                    <div className="flex gap-3 pb-7">
                        <img src="src/assets/icon-stars.png" className="w-9 bg-[#FFF7F6]" alt="" />
                        <p className="uppercase font-display pt-1 text-base tracking-widest font-bold text-lg ">03. Livrables & Accessibilité</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-20 gap-y-15 " >
                        <div className="flex flex-col" >
                            <span className="text-[#64748B] p-3">
                                Lien YouTube (Public / Non-répertorié) *
                            </span>
                            <label htmlFor="videoUrl"
                                className="btn self-center bg-[#246BAD] text-white p-8 font-bold text-base tracking-widest mt-5 rounded-xl uppercase"
                            >Explorer</label>
                            <input type="file"
                                name="videoUrl"
                                accept="video/*"
                                required
                                className="hidden" />
                        </div>
                        <div className="text-[#64748B] flex flex-col">
                            <p>Sous-titres (.srt)</p>
                            <label className="flex items-center gap-3 pt-4 gap-6 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="checkbox-soustitre"
                                    className="checkbox checkbox-sm"
                                />
                                <span>Voix ou textes nécessitant des sous-titres</span>
                            </label>
                            <label htmlFor="sous-titre-fille"
                                className="bg-[#F2F2F2] p-4 rounded-lg text-sm uppercase mt-3 cursor-pointer"
                            >Choisir fichier .SRT</label>
                            <input type="file" name="sous-titre-fille" id="sous-titre-fille"
                                className="hidden"
                            />
                        </div>
                        <div>
                            <p className="text-[#64748B] p-3">Vignette Officielle (16:9) *</p>
                            <div className="bg-[#F2F2F2] p-4 rounded-lg h-100 flex justify-center border-2 border-dashed">
                                <label
                                    htmlFor="fichier-vignette"
                                    className="flex flex-col items-center justify-center gap-7 cursor-pointer"
                                >
                                    <div className="bg-white p-4 rounded-3xl">
                                        <img src="src/assets/image-default.png" alt="" />
                                    </div>

                                    <span className="text-sm font-semibold uppercase">
                                        Haute résolution
                                    </span>
                                    <span className="bg-white p-3 rounded-2xl text-sm shadow-lg">PNG ou JPG • Max 15Mo</span>
                                </label>
                                <input
                                    type="file"
                                    name="fichier-vignette"
                                    id="fichier-vignette"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-[#64748B] p-3">Galerie Médias (Stills - Max 3)</p>
                            <div className="flex justify-between gap-1 ">
                                <div className="bg-[#F2F2F2] p-4 rounded-xl border-2 border-dashed" >
                                    <label className="cursor-pointer " htmlFor="fichier-galerie-1">
                                        <img src="src/assets/image-default.png" className="bg-white p-2 rounded-xl" alt="" />
                                    </label>
                                </div>
                                <div className="bg-[#F2F2F2] p-4 rounded-xl border-2 border-dashed">
                                    <label className="cursor-pointer bg-white  rounded-2xl" htmlFor="fichier-galerie-2">
                                        <img src="src/assets/image-default.png" className="bg-white p-2 rounded-xl" alt="" />
                                    </label>
                                </div>
                                <div className="bg-[#F2F2F2] p-4 rounded-xl border-2 border-dashed">
                                    <label className="cursor-pointer bg-white rounded-2xl" htmlFor="fichier-galerie-3">
                                        <img src="src/assets/image-default.png" className="bg-white p-2 rounded-xl" alt="" />
                                    </label>
                                </div>
                                <input type="file" className="hidden" name="fichier-galerie-1" id="fichier-vignette" />
                                <input type="file" className="hidden" name="fichier-galerie-2" id="fichier-vignette" />
                                <input type="file" className="hidden" name="fichier-galerie-3" id="fichier-vignette" />
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
                            <button className="btn btn-neutral tracking-widest p-6 rounded-box font-bold " > + AJOUTER COLLABORATEUR</button>
                        </div>
                        <div className="bg-[#F2F2F2] p-5 flex justify-around gap-5 mt-10 font-bold rounded-box tracking-wider text-sm text-[#64748B]">
                            <div className="flex flex-col" >
                                <label htmlFor="">civilité*</label>
                                <select className="bg-white p-5 border-2 rounded-box mt-5" name="genre-collab" id="">
                                    <option value="male">M.</option>
                                    <option value="femme">Mrs.</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="name-collab">prénom et nom</label>
                                <input type="text"
                                    name="name-collab"
                                    className="bg-white p-5 border-2 rounded-box mt-5"
                                    placeholder="EX: JEAN DUPOND" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="profession-collab">profession*</label>
                                <input type="text" name="profession-collab"
                                    className="bg-white p-5 border-2 rounded-box mt-5"
                                    id="" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email-collab">email*</label>
                                <input type="email" name="email-collab"
                                    className="bg-white p-5 border-2 rounded-box mt-5"
                                    id="" />
                            </div>
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
            </form>

        </div >
    )
}