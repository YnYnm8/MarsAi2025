import { extractVideoId, controlDuration } from "../services/youtubeService.mjs";
import { getVideoDurationInSeconds } from 'get-video-duration';
import { handleFileProcessing } from "../helpers/proccesFiles.mjs";
import { catchError } from "../helpers/errorHandler.mjs";
import Film from "../models/Films.mjs";
import fs from "fs";

export const uploadMiddleware = async (req, res, next) => {
    try {
        const { youtubeUrl, posterUrl } = req.body;
        const filmFile = req.files?.film?.[0];
        const posterFile = req.files?.poster?.[0];

        // --- 1. VALIDACIÓN MANUAL DE ARCHIVOS / LINKS ---

        // Validacion youtube o local
        if (!filmFile && !youtubeUrl) {
            return res.status(400).json({ message: "Veuillez télécharger un fichier vidéo ou fournir un lien YouTube." });
        }

        // Validacion poster o posterURL
        if (!posterFile && !posterUrl) {
            return res.status(400).json({ message: "L'affiche du film est requise." });
        }

        req.finalPosterPath = posterFile ? posterFile.path : posterUrl;

        // --- 2. CONTROL DE DURACIÓN  ---
        let finalDuration = 0;
        if (filmFile) {
            // archivo local
            finalDuration = await getVideoDurationInSeconds(filmFile.path);
        } else if (youtubeUrl) {
            // YouTube 
            const videoId = extractVideoId(youtubeUrl);
            const API_KEY = process.env.YOUTUBE_API_KEY;

            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`);
            const data = await response.json();

            if (data.items?.[0]) {
                finalDuration = controlDuration(data.items[0].contentDetails.duration);
            }
        }

        // Validacion de duracion
        if (finalDuration > 120) {
            if (filmFile && fs.existsSync(filmFile.path)) fs.unlinkSync(filmFile.path);
            if (posterFile && fs.existsSync(posterFile.path)) fs.unlinkSync(posterFile.path);
            return res.status(400).json({ message: "La durée maximale de la vidéo est de 120 secondes." });
        }
        req.validatedData = {
            duration: finalDuration,
            poster: posterFile ? posterFile.path : posterUrl, 
            video: filmFile ? filmFile.path : youtubeUrl
        };
        next();

    } catch (error) {
        console.error("Error en uploadMiddleware:", error);
        return catchError(res, error);
    }
};