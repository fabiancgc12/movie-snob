import { z } from "zod";

export const productionCountriesSchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});
export type ProductionCountriesType = z.infer<typeof productionCountriesSchema>;
