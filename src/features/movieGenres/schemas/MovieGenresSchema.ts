import { z } from "zod";

export const movieGenresSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type MovieGenresType = z.infer<typeof movieGenresSchema>;
