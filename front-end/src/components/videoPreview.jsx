import React, { useEffect,useState } from "react";

export default function VideoUpload({ label, id, defaultValue }) {
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    if (defaultValue) {
      setVideoPreview(defaultValue);
    }
  }, [defaultValue]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoPreview(URL.createObjectURL(file));
  };
  

  return (
<div className="flex flex-col">
      <span className="text-white-primary p-3 uppercase text-xs font-bold opacity-50">{label}</span>

      {videoPreview ? (
        <div className="relative group">
          <video
            src={videoPreview}
            controls
            className="w-full max-h-80 rounded-lg mb-4 border border-white/10"
          />
          <p className="text-[10px] text-blue-tertiary uppercase mt-[-10px] mb-4 font-bold">
            {videoPreview.startsWith('http') ? "Vidéo actuelle" : "Nouvelle vidéo sélectionnée"}
          </p>
        </div>
      ) : (
        <div className="w-full h-48 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center mb-4 bg-white/5">
           <p className="text-white/20 text-xs uppercase">Aucune vidéo</p>
        </div>
      )}

      <label
        htmlFor={id}
        className="btn self-center bg-blue-tertiary/20 text-blue-tertiary border border-blue-tertiary/40 p-4 px-8 font-bold text-xs tracking-widest rounded-xl uppercase cursor-pointer hover:bg-blue-tertiary hover:text-white transition-all"
      >
        {videoPreview ? "Remplacer la vidéo" : "Explorer"}
      </label>
      <input
        type="file"
        id={id}
        accept="video/*"
        name="film"
        className="hidden"
        onChange={handleVideoChange}
      />
    </div>
  );
}