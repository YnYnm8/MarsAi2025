import { z } from 'zod';

export const registerSchema = z.object({
    email: 
    z.string().min(1, "Requis")
    .email('Format email invalide'),

    password: z
    .string({ required_error: 'Mots de passe obligatoire'})
    .min(8, 'Min 8 caracteres')
    .regex(/[A-Z]/, 'Min 1 majuscule requise')
    .regex(/[a-z]/, 'Min 1 minuscule requise')
    .regex(/[0-9]/, 'Min 1 chiffre requis')
    .regex(/[^a-zA-Z0-9]/, "Min 1 caractère spécial requis"),

    firstName: z
    .string({ required_error: 'Prénom obligatoire' })
    .min(2, 'Min 2 caractères'),

    lastName: z
    .string({ required_error: 'Nom obligatoire' })
    .min(2, 'Min 2 caractères'),

    role: z
    .enum(['director', 'visitor', 'committee', 'admin'])
    .default('visitor'),
})

export const loginSchema = z.object({

    email: z
    .string().min(1, "Requis")
    .email('Format email invalide'),

    password: z
    .string({ required_error: 'Mots de passe obligatoire'})
    .min(8, 'Min 8 caracteres')
    .regex(/[A-Z]/, 'Min 1 majuscule requise')
    .regex(/[a-z]/, 'Min 1 minuscule requise')
    .regex(/[0-9]/, 'Min 1 chiffre requis')
    .regex(/[^a-zA-Z0-9]/, "Min 1 caractère spécial requis"),
})

export const updateProfileSchema = z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    bio: z.string().max(500, "Max 500 caractères").optional(),
    school: z.string().max(100).optional(),
    country: z.string().max(50).optional(),
    socialNetworks: z.object({
        instagram: z.string().url().optional().or(z.literal("")),
        linkedin: z.string().url().optional().or(z.literal("")),
        website: z.string().url().optional().or(z.literal(""))
    }).optional()
});