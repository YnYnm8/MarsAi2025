import { z } from "zod";

export const filmSchema = z.object({

    
    last_name: z
        .string()
        .min(2, "Nom obligatoire minimum 2 caractères"),

    collaborateur: z.string().optional(),

    email: z
        .string()
        .email("Format email invalide"),

    school: z.string().optional(),

    country: z.string().optional(),

    bio: z.string().optional(),

    socialNetworks: z
        .array(z.string().url("Format URL invalide"))
        .optional(),

    title: z
        .string()
        .min(2, "Titre obligatoire minimum 2 caractères"),

    duration: z
        .preprocess(val => Number(val), z.number().positive().max(120, "Durée maximale 2 minutes")),


    status: z.enum(["submitted", "accepted", "rejected"]),

    description: z
        .string()
        .min(10, "Description obligatoire minimum 10 caractères"),

    category: z.enum(["animation", "documentaire", "fiction", "expérimental"]),

    generate_Ai: z.enum(["full_ai", "hybrid"]),

    outil_Ai: z
        .string()
        .min(2, "Outil AI obligatoire minimum 2 caractères"),


});

// Validation partielle pour les mises à jour de film (PUT /films/:id)
export const partialFilmSchema = filmSchema.partial();

