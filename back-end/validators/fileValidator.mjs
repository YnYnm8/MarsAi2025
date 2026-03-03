import { z } from "zod";

// VIDEO
const videoFileSchema = z.object({
  mimetype: z.string().startsWith("video/"),
  size: z.number(),
  path: z.string(),
});

//IMAGEN
const imageFileSchema = z.object({
  mimetype: z.enum(["image/jpeg", "image/png"]),
  size: z.number(),
  path: z.string(),
});

export const filesSchema = z.object({
  film: z.array(videoFileSchema).optional(),
  poster: z.array(imageFileSchema).optional(),

  subtitle: z.array(z.object({
    mimetype: z.string(),
    path: z.string(),
  })).optional(),

  galerie: z.array(z.any()).max(2).optional(),

  // YOUTUBE
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  posterUrl: z.string().url().optional().or(z.literal("")),
});
