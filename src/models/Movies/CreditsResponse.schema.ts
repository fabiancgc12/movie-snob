import { z } from "zod";

export const castEntitySchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().optional().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
});

export type CastEntity = z.infer<typeof castEntitySchema>;

export const crewEntitySchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().optional().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export type CrewEntity = z.infer<typeof crewEntitySchema>;

export const crewDtoSchema = crewEntitySchema.pick({
  id: true,
  job: true,
  name: true,
  profile_path: true,
});

export type CrewDto = z.infer<typeof crewDtoSchema>;

export const creditsResponseTypeSchema = z.object({
  id: z.number(),
  cast: castEntitySchema.array().optional().nullable(),
  crew: castEntitySchema.array().optional().nullable(),
});

export type CreditsResponseSchema = z.infer<typeof creditsResponseTypeSchema>;
