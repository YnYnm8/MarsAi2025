import { z } from "zod";

export const filmSchema = z.object({
    title:
        z.string()
            .min(2, "Titre obligatoire minimum 2 caractères"),

    duration:
        z.preprocess(val => Number(val),
            z.number()
                .positive()
                .max(120)).optional(),

    status:
        z.enum(["submitted", "selected", "rejected"])
            .default("submitted"),

    description:
        z.string()
            .min(10, "Description obligatoire minimum 10 caractères")
            .max(300, "Description maximum 300 caractères"),

    generateAi:
        z.string()
            .refine(val => val === "fullAi" || val === "hybrid", {
                message: "Il est obligatoire de choisir une option"
            }),

    collaborateur: z.string().optional(),

    outil_Ai: z.string().min(2, "Outil AI obligatorio"),
    creativeMethodology: z.string().optional(),

});

// PARA EDIT FILM
export const updateFilmSchema = filmSchema.partial();

// PARA CREAR
export const createFilmSchema = filmSchema;