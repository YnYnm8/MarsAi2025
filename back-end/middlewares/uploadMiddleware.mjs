import { filmSchema } from "../validators/filmValidator.mjs";
import { filesSchema } from "../validators/fileValidator.mjs";
import sharp from "sharp";
import fs from "fs";
import Film from "../models/Films.mjs";
import File from "../models/File.mjs";
import { catchError } from "../helpers/errorHandler.mjs";

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

        // Redimensionnement de l'affiche avec Sharp
        await Promise.all(
            req.files.poster.map(async (file) => {
                const resizedPath = `${file.destination}/resized-${file.filename}`;
                await sharp(file.path)
                    .resize(800, 600, { fit: "inside" })
                    .toFile(resizedPath);

                fs.unlinkSync(file.path),
                    file.path = resizedPath
            })
        )

        // Creation du film en base de données
        const {
            title,
            description,
            duration,
            generateAi,
        } = bodyValidation.data;

        const newFilm = await Film.create({

            UserId: req.user?.id || 1, // Utilisateur par défaut si pas d'authentification
            title,
            description,
            duration,
            generateAi,
            status: "submitted",
        })

        // Creation des fichiers en base de données
        const filmFile = req.files.film[0];
        const posterFiles = req.files.poster[0];
        const subtitleFiles = req.files.subtitle;
        const { outil_Ai } = bodyValidation.data;
        const galerieFiles = req.files.galerie || [];
        const { creativeMethodology } = bodyValidation.data;

        await File.create({
            FilmId: newFilm.id,
            film_url: filmFile.path,
            poster_url: posterFiles.path,
            subtitle: subtitleFiles.map(f => f.path).join(","),
            outil_Ai,
            galerie_url: galerieFiles.map(f => f.path).join(","), 
            creativeMethodology
        })

        // ajout film et fichiers à req pour les utiliser dans le controller
        req.newFilm = newFilm;
        next();

    } catch (error) {
        return catchError(res, error);
    }
}



