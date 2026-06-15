import z from "zod";

// export const mediaTypeSchema = z.union([z.literal("movie"), z.literal("tv")]);
export const mediaTypeSchema = z.enum(["movie", "tv"]);

export type MediaType = z.infer<typeof mediaTypeSchema>;
