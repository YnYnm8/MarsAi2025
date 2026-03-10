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
                            className="bg-red-500 cursor-pointer text-white p-4 rounded-lg"
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
                    className="btn self-center bg-brand-blue text-white p-7 font-bold text-base tracking-widest mt-5 rounded-xl uppercase cursor-pointer"
                >
                    {t("dynamicInput.addButton", "Ajouter d'autres sous-titres")}
                </button>
            )}
        </div>
    );
}


export function DynamicSubtitleInput({ subtitles, setSubtitles }) {
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
        <label className="uppercase font-bold text-white-primary text-sm md:text-base">
            {t("dynamicInput.subtitleLabel", "Sous-titres (Stills - Max 5)")}
        </label>

        {subtitles.map((sub, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2 md:items-center bg-white/5 md:bg-transparent p-3 md:p-0 rounded-xl">
                
                {/* Contenedor horizontal para el Select y el botón de eliminar en móvil */}
                <div className="flex gap-2 w-full md:w-auto">
                    {/* Selector tipo */}
                    <select
                        value={sub.type}
                        onChange={(e) => handleTypeChange(index, e.target.value)}
                        className="p-4 rounded-lg cursor-pointer bg-[#F2F2F2] text-black text-sm flex-1 md:flex-none md:min-w-[120px] outline-none"
                    >
                        <option value="file">{t("dynamicInput.typeFile", "Fichier")}</option>
                        <option value="url">{t("dynamicInput.typeLink", "Lien")}</option>
                    </select>

                    {/* Botón eliminar (Visible solo en móvil al lado del select) */}
                    {subtitles.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="md:hidden bg-red-500/20 text-red-500 border border-red-500/50 px-5 py-4 cursor-pointer rounded-lg font-bold"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Input dinámico - Toma todo el ancho disponible */}
                {sub.type === "file" ? (
                    <>
                        <label
                            htmlFor={`subtitle-${index}`}
                            className="flex-1 bg-[#6a7075] text-white p-4 rounded-lg cursor-pointer text-center text-sm truncate"
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
                        className="bg-[#F2F2F2] p-4 rounded-lg text-sm flex-1 text-black outline-none focus:ring-2 focus:ring-blue-tertiary"
                    />
                )}

                {/* Botón eliminar (Visible solo en Desktop al final de la fila) */}
                {subtitles.length > 1 && (
                    <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="hidden md:block bg-red-500 text-white p-4 cursor-pointer rounded-lg hover:bg-red-600 transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>
        ))}

        {subtitles.length < 5 && (
            <button
                type="button"
                onClick={handleAdd}
                className="w-full md:w-fit self-center bg-brand-blue text-white p-4 md:p-5 font-bold text-xs md:text-base tracking-widest mt-2 md:mt-5 rounded-xl uppercase cursor-pointer hover:opacity-90 transition-opacity"
            >
                {t("dynamicInput.addButton", "Ajouter d'autres sous-titres")}
            </button>
        )}
    </div>
);
}


