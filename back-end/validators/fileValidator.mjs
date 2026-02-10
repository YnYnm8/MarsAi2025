import z from "zod";

export const filesSchema = z.object({
  film: z
    .array(
      z.object({
        mimetype: z.literal("video/mp4"),
        size: z.number(),
        path: z.string(),
      })
    )
    .length(1, "Le film est obligatoire"),

  poster: z
    .array(
      z.object({
        mimetype: z.enum(["image/jpeg", "image/png"]),
        size: z.number(),
        path: z.string(),
      })
    )
    .length(1, "Le poster est obligatoire"),

  subtitle: z
    .array(
      z.object({
        mimetype: z.enum(["application/x-subrip", "text/plain"]),
        path: z.string(),
      })
    )
    .min(1, "Au moins 1 fichier de sous-titres est obligatoire"),

  galerie: z
    .array(
      z.object({
        mimetype: z.enum(["image/jpeg", "image/png"]),
        size: z.number(),
        path: z.string(),
      })
    )
    .max(2, "Maximum 2 images pour la gallery")
    .optional(),

});

