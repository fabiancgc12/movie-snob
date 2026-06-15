import z from "zod";

export const spokenLanguagesSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});
export type SpokenLanguagesType = z.infer<typeof spokenLanguagesSchema>;
