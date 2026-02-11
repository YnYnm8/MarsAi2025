import React, { useState } from "react";

export default function VideoUpload({ label, id }) {
  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col">
      <span className="text-white-primary p-3">{label}</span>

      {videoPreview ? (
        <video
          src={videoPreview}
          controls
          className="w-full max-h-80 rounded-lg mb-4"
        />
      ) : null}

      <label
        htmlFor={id}
        className="btn self-center bg-[#246BAD] text-white p-8 font-bold text-base tracking-widest mt-5 rounded-xl uppercase cursor-pointer"
      >
        Explorer
      </label>
      <input
        type="file"
        id={id}
        accept="video/*"
        name="film"
        required
        className="hidden"
        onChange={handleVideoChange}
      />
    </div>
  );
}