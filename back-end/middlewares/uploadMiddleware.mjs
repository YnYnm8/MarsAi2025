import { filmSchema } from "../validators/filmValidator.mjs";
import { filesSchema } from "../validators/fileValidator.mjs";
import sharp from "sharp";
import fs from "fs";
import Film from "../models/Films.mjs";
import File from "../models/File.mjs";
import { catchError } from "../helpers/errorHandler.mjs";
import { getVideoDurationInSeconds } from 'get-video-duration';

export const uploadMiddleware = async (req, res, next) => {

    try {
        console.log("BODY RECEIVED:", req.body);
        console.log("FILES RECEIVED:", req.files);
        // Validation des données du film avec zod
        const bodyValidation = filmSchema.safeParse(req.body);
        if (!bodyValidation.success) {
            return res.status(400).json({
                errors: bodyValidation.error.issues.map(issue => ({
                    field: issue.path.join(".") || "global",
                    message: issue.message
                }))
            });
        }

        // Validation des données du files avec zod
        const filesValidation = filesSchema.safeParse(req.files);
        if (!filesValidation.success) {
            return res.status(400).json({
                errors: filesValidation.error.issues.map(issue => ({
                    field: issue.path.join(".") || "global",
                    message: issue.message
                }))
            });
        }
        const filmFile = req.files.film[0];
        try {
            const videoDuration = await getVideoDurationInSeconds(filmFile.path);

            if (videoDuration > 120) {
                if (fs.existsSync(filmFile.path)) fs.unlinkSync(filmFile.path);

                return res.status(400).json({
                    errors: [{
                        field: "film",
                        message: `La vidéo est trop longue (${Math.round(videoDuration)}s). Le maximum est de 2 minutes.`
                    }]
                });
            }
        } catch (durationError) {
            console.error("Error al medir el video:", durationError);
        }


        // Redimensionnement de l'affiche avec Sharp
        await Promise.all(
            req.files.poster.map(async (file) => {
                const resizedPath = `${file.destination}/resized-${file.filename}`;

                await sharp(file.path)
                    .resize(800, 600, { fit: "inside" })
                    .toFile(resizedPath);

                // Borramos el original físicamente
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }

                // Actualizamos las propiedades del objeto 'file' directamente
                file.path = resizedPath;
                file.filename = `resized-${file.filename}`;
            })
        );

        // Creation du film en base de données
        const {
            title,
            description,
            duration,
            collaborateur,
            generateAi,
        } = bodyValidation.data;

        const newFilm = await Film.create({

            UserId: req.user.id,
            title,
            description,
            duration,
            collaborateur,
            generateAi,
            status: "submitted",
        })

        // Creation des fichiers en base de données
        const posterFiles = req.files.poster[0];
        const subtitleFiles = req.files.subtitle;
        const { outil_Ai } = bodyValidation.data;
        const galerieFiles = req.files.galerie || [];
        const { creativeMethodology } = bodyValidation.data;


        //Limpieza de ruta
        //const clean = (f) => (f && f.path) ? `/uploads/${f.path.split('/').pop()}` : null;

        const clean = (f) => {
            if (!f) return null;
            const fileName = f.filename || (f.path ? f.path.split('/').pop() : null);
            return fileName ? `/uploads/${fileName}` : null;
        };

        await File.create({
            FilmId: newFilm.id,
            film_url: clean(filmFile),
            poster_url: clean(posterFiles),
            subtitle: subtitleFiles ? subtitleFiles.map(f => clean(f)).join(",") : "",
            outil_Ai,
            galerie_url: galerieFiles.map(f => clean(f)).filter(Boolean),
            creativeMethodology
        })

        // ajout film et fichiers à req pour les utiliser dans le controller
        req.newFilm = newFilm;
        next();

    } catch (error) {
        return catchError(res, error);
    }
}



