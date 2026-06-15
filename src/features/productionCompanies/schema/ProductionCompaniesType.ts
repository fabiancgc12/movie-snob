import { z } from "zod";

export const productionCompaniesSchema = z.object({
  id: z.number(),
  logo_path: z.string().optional().nullable(),
  name: z.string(),
  origin_country: z.string(),
});
export type ProductionCompaniesType = z.infer<typeof productionCompaniesSchema>;
