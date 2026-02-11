
import { useState } from "react";

export default function ImagesPreview({ label, id, defaultImage,onFileSelect,
    fullPreviewOnUpload = false
}) {
    const [preview, setPreviews] = useState(null);
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviews(URL.createObjectURL(file));
            if (onFileSelect) onFileSelect(file); 
        }
    };


    if (fullPreviewOnUpload && preview) {

        return (
            <div className="w-full aspect-video rounded-lg  overflow-hidden relative cursor-pointer">
                <img
                    src={preview}
                    alt={label}
                    className="w-full h-full object-cover"
                />
                <input
                    type="file"
                    id={id}
                    name="poster"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        );
    }

    return (
        <div>
            <p className="text-white-primary p-3">{label}</p>
            <div className="bg-[#F2F2F2] p-4 rounded-lg h-60 w-full flex justify-center border-3 border-dashed">
                <label
                    htmlFor={id}
                    className="flex flex-col items-center justify-center gap-7 cursor-pointer w-full h-full"
                >
                    <div className="bg-white w-full h-full rounded-3xl overflow-hidden">
                        <img
                            src={preview || defaultImage}
                            alt={label}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </label>
                <input
                    type="file"
                    id={id}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}


