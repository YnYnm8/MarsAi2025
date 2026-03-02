import { z } from "zod";
import { filesSchema } from "./fileValidator.mjs";

const updateFilesSchema = z.object({
    film: z.array(z.any()).optional().nullable(),
    poster: z.array(z.any()).optional().nullable(),
    subtitle: z.array(z.any()).optional().nullable(),
    galerie: z.array(z.any()).optional().nullable(),
});

export const filmSchema = z.object({


    title: z
        .string()
        .min(2, "Titre obligatoire minimum 2 caractères"),

    duration: z
        .preprocess(val => Number(val), z.number().positive().max(120, "Durée maximale 2 minutes")),


    status: z.enum(["submitted", "accepted", "rejected"]).default("submitted"),

    description: z
        .string()
        .min(10, "Description obligatoire minimum 10 caractères"),


    generateAi: z.string()
        .refine(val => val === "fullAi" || val === "hybrid", {
            message: "Il est obligatoire de choisir une option"
        }),

    collaborateur: z.string().optional(),
    outil_Ai: z
        .string()
        .min(2, "Outil AI obligatoire minimum 2 caractères"),

    creativeMethodology: z.string().optional(),

});

// Validation partielle pour les mises à jour de film (PUT /films/:id)
export const updateFilmSchema = filmSchema.partial().extend(updateFilesSchema.shape);

export const createFilmSchema = filmSchema.extend({
    ...filesSchema.shape
});