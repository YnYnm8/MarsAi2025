import { useTranslation } from "react-i18next"; 

export function DynamicInputList({
    label,
    array,
    setArray,
    placeholder,
    max = 5,
}) {
    const { t } = useTranslation("formulaireF");

    // Función genérica para actualizar un array
    const handleChange = (index, value) => {
        const updated = [...array];
        updated[index] = value;
        setArray(updated);
    };

    // Agregar un input
    const handleAdd = () => {
        if (array.length >= max) return;
        setArray([...array, null]);
    };

    // Eliminar un input
    const handleRemove = (index) => {
        const updated = array.filter((_, i) => i !== index);
        setArray(updated);
    };

    return (
        <div className="flex flex-col gap-3">
            
            <label className="pb-2 text-white-primary uppercase font-bold">{label}</label>
            {array.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <input
                        type="text"
                        value={value || ""}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="bg-[#F2F2F2] p-3 rounded-lg text-sm flex-1 text-black"
                        placeholder={placeholder}
                    />
                    {array.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="bg-red-500 text-white p-4 rounded-lg"
                        >
                            X
                        </button>
                    )}
                </div>
            ))}
            {array.length < max && (
                <button
                    type="button"
                    onClick={handleAdd}
                    className="btn self-center bg-[#246BAD] text-white p-7 font-bold text-base tracking-widest mt-5 rounded-xl uppercase cursor-pointer"
                >
                    {t("dynamicInput.addButton", "Ajouter")}
                </button>
            )}
        </div>
    );
}


export function DynamicSubtitleInput({ subtitles, setSubtitles}) {
    const { t } = useTranslation("formulaireF");

    // Array de subtítulos: cada elemento tiene { type: "file"|"url", value: File|String }
    const handleTypeChange = (index, type) => {
        const updated = [...subtitles];
        updated[index] = { type, value: null };
        setSubtitles(updated);
    };

    const handleValueChange = (index, value) => {
        const updated = [...subtitles];
        updated[index].value = value;
        setSubtitles(updated);
    };

    const handleAdd = () => {
        if (subtitles.length >= 5) return;
        setSubtitles([...subtitles, { type: "file", value: null }]);
    };

    const handleRemove = (index) => {
        setSubtitles(subtitles.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="uppercase font-bold text-white-primary">
                {t("dynamicInput.subtitleLabel", "Sous-titres (Stills - Max 5)")}
            </label>

            {subtitles.map((sub, index) => (
                <div key={index} className="flex gap-2 items-center">
                    {/* Selector tipo */}
                    <select
                        value={sub.type}
                        onChange={(e) => handleTypeChange(index, e.target.value)}
                        className="p-4 rounded-lg cursor-pointer bg-[#F2F2F2] text-black"
                    >
                        <option value="file">{t("dynamicInput.typeFile", "Fichier")}</option>
                        <option value="url">{t("dynamicInput.typeLink", "Lien")}</option>
                    </select>

                    {/* Input dinámico */}
                    {sub.type === "file" ? (
                        <>
                            <label
                                htmlFor={`subtitle-${index}`}
                                className="flex-1 bg-[#6a7075] text-white p-4 rounded-lg cursor-pointer text-center"
                            >
                                {sub.value ? sub.value.name : t("dynamicInput.chooseFile", "Choisir un fichier .SRT")}
                            </label>
                            <input
                                type="file"
                                id={`subtitle-${index}`}
                                accept=".srt,.vtt,text/plain"
                                className="hidden"
                                onChange={(e) => handleValueChange(index, e.target.files[0])}
                            />
                        </>
                    ) : (
                        <input
                            type="url"
                            placeholder={t("dynamicInput.pasteLink", "Collez le lien")}
                            value={sub.value || ""}
                            onChange={(e) => handleValueChange(index, e.target.value)}
                            className="bg-[#F2F2F2] p-4 rounded-lg text-sm flex-1 text-black"
                        />
                    )}

                    {subtitles.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="bg-red-500 text-white p-4 rounded-lg"
                        >
                            X
                        </button>
                    )}
                </div>
            ))}

            {subtitles.length < 5 && (
                <button
                    type="button"
                    onClick={handleAdd}
                    className="self-center bg-[#246BAD] text-white p-5 font-bold text-base tracking-widest mt-5 rounded-xl uppercase cursor-pointer"
                >
                    {t("dynamicInput.addButton", "Ajouter")}
                </button>
            )}
        </div>
    );
}