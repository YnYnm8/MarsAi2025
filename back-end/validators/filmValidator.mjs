import { z } from "zod";
import { filesSchema } from "./fileValidator.mjs";

export const filmSchema = z.object({

    collaborateur: z.string().optional(),

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

    outil_Ai: z
        .string()
        .min(2, "Outil AI obligatoire minimum 2 caractères"),

    creativeMethodology: z.string().optional(),

});

// Validation partielle pour les mises à jour de film (PUT /films/:id)
export const partialFilmSchema = filmSchema.partial();
export const createFilmSchema = filmSchema.extend({
    ...filesSchema.shape
});