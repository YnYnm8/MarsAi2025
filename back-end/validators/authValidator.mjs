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
    .regex(/[!@#$%^&*()_+=\-\[\]{};':"\\|,.<>\/?]/, 'Min 1 caractère spécial requis'),

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
    .regex(/[!@#$%^&*()_+=\-\[\]{};':"\\|,.<>\/?]/, 'Min 1 caractère spécial requis'),
})

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  bio: z.string().optional(),
  school: z.string().optional()
});