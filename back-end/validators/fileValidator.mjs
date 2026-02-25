import { z } from "zod";

export const filesSchema = z.preprocess(
  (val) => {

    return {
      film: val?.film || val?.files?.film || [],
      poster: val?.poster || val?.files?.poster || [],
      subtitle: val?.subtitle || val?.files?.subtitle || [],
      galerie: val?.galerie || val?.files?.galerie || [],
    };
  },
  z.object({
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
        z.union([
          z.string(),
          z.object({
            mimetype: z.string(),
            size: z.number(),
            path: z.string(),
            filename: z.string().optional()
          })
        ])
      )
      .max(2, "Maximum 2 images pour la galerie")
      .optional(),

  }
  )
)

