import React from "react";

export default function DynamicInputList({ label, array, setArray, placeholder }) {
    // Función genérica para actualizar un array
    const handleChange = (index, value) => {
        const updated = [...array];
        updated[index] = value;
        setArray(updated);
    };

    // Agregar un input
    const handleAdd = () => setArray([...array, ""]);

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
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="bg-[#F2F2F2] p-3 rounded-lg text-sm flex-1"
                        placeholder={placeholder}
                        required
                    />
                    {array.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="bg-red-500 text-white px-3 rounded-lg"
                        >
                            X
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={handleAdd}
                className="mt-2 bg-blue-600 uppercase text-white px-4 py-2 rounded-lg"
            >
                Ajouter
            </button>
        </div>
    );
}