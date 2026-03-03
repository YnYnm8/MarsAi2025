import React, { useEffect, useState } from "react";

export default function VideoUpload({ 
  label, 
  id, 
  defaultValue, 
  onDurationError, 
  youtubeUrl = "", 
  setYoutubeUrl,    
  onImport,         
  uploadMode = "file" 
}) {
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState(null);

  const getEmbedId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const youtubeId = getEmbedId(youtubeUrl);

  useEffect(() => {
    if (defaultValue) setVideoPreview(defaultValue);
  }, [defaultValue]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 120) {
          e.target.value = "";
          setVideoPreview(null);
          if (onDurationError) onDurationError("La vidéo est trop longue (max 2 minutes)");
          return;
        }
        setVideoPreview(URL.createObjectURL(file));
      };
      video.src = URL.createObjectURL(file);
    }
  };

  return (
 
  <div className="flex flex-col w-full">
    <span className="text-white-primary pb-3 uppercase text-xs font-bold opacity-50">{label}</span>

    {/* ÁREA DE PREVIEW  */}
    <div className="w-full aspect-video mb-4 overflow-hidden rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
      {uploadMode === "youtube" && youtubeId ? (
        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${youtubeId}`} frameBorder="0" allowFullScreen></iframe>
      ) : videoPreview && uploadMode === "file" ? (
        <video src={videoPreview} controls className="w-full h-full object-cover" />
      ) : (
        <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest text-center px-4">
          {uploadMode === "youtube" ? "Attente du lien youtube" : "Aucune vidéo"}
        </p>
      )}
    </div>

    {/* LOCAL*/}
    {uploadMode === "file" && (
      <>
        <label htmlFor={id} className="btn self-center bg-blue-tertiary/20 text-blue-tertiary border border-blue-tertiary/40 p-4 px-8 font-bold text-xs tracking-widest rounded-xl uppercase cursor-pointer hover:bg-blue-tertiary hover:text-white transition-all">
          {videoPreview ? "Changer le fichier" : "Choisir un fichier"}
        </label>
        <input type="file" id={id} accept="video/*" name="film" className="hidden" onChange={handleVideoChange} />
      </>
    )}
  </div>
);
  
}