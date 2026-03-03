import sharp from "sharp";
import fs from "fs";
import path from "path";
import File from "../models/File.mjs";

const formatYoutubeUrl = (url) => {
    if (!url) return null;
    const singleUrl = Array.isArray(url) ? url[0] : url;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = singleUrl.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return singleUrl;
};

export const handleFileProcessing = async (filmId, files, existingFileRecord = null, reqBody = {}) => {
    const updates = {};

    const clean = (f) => {
        if (!f) return null;
        if (typeof f === 'string') return f;
        const name = f.filename || (f.path ? f.path.split('/').pop() : null);
        return name ? `/uploads/${name}` : null;
    };

    // --- 1. PROCESAMIENTO DEL POSTER (ARCHIVO O URL) ---
    if (files?.poster) {
        // Caso A: El usuario subió un archivo físico
        const file = files.poster[0];
        const resizedFilename = `resized-${file.filename}`;
        const inputPath = path.join(process.cwd(), 'uploads', file.filename);
        const outputPath = path.join(process.cwd(), 'uploads', resizedFilename);

        try {
            await fs.promises.access(inputPath, fs.constants.F_OK);
            await sharp(inputPath)
                .resize(800, 600, { fit: "inside" })
                .toFile(outputPath);

            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            updates.poster_url = `/uploads/${resizedFilename}`;
        } catch (error) {
            console.error("Error en Sharp:", error);
            updates.poster_url = `/uploads/${file.filename}`;
        }
    } else if (reqBody.posterUrl) {
        // Caso B: El usuario importó desde YouTube (es un string con la URL)
        // ESTO EVITA EL ERROR 'poster_url cannot be null'
        updates.poster_url = reqBody.posterUrl;
    }

    // --- 2. VIDEO ---
    if (files?.film && files.film.length > 0) {
        updates.film_url = String(clean(files.film[0]));
    } else if (reqBody.youtubeUrl) {
        updates.film_url = formatYoutubeUrl(reqBody.youtubeUrl);
    }

    // --- 3. SUBTÍTULOS ---
    const newSubtitleFiles = files?.subtitle || [];
    if (newSubtitleFiles.length > 0) {
        updates.subtitle = newSubtitleFiles.map(f => clean(f));
    } else {
        updates.subtitle = ["none"];
    }

    // --- 4. GALERÍA ---
    if (files?.galerie) {
        updates.galerie_url = files.galerie.map(f => clean(f)).filter(Boolean);
    }

    // --- 5. CAMPOS ADICIONALES ---
    updates.outil_Ai = (reqBody.outil_Ai && reqBody.outil_Ai.trim() !== "")
        ? reqBody.outil_Ai
        : "Outil non spécifié";

    updates.creativeMethodology = reqBody.creativeMethodology || "Non renseigné";

    // --- 6. VALIDACIÓN FINAL ANTES DE DB ---
    // Si no es un update y poster_url sigue vacío, lanzamos error manual
    if (!existingFileRecord && !updates.poster_url) {
        throw new Error("Validation Error: poster_url is required (File or URL).");
    }

    // --- 7. GUARDADO FINAL ---
    if (existingFileRecord) {
        return await existingFileRecord.update(updates);
    } else {
        return await File.create({
            FilmId: filmId,
            ...updates
        });
    }
};