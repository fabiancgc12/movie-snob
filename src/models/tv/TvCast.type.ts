import { z } from "zod";

export const rolesEntitySchema = z.object({
  credit_id: z.string(),
  character: z.string(),
  episode_count: z.number(),
});

export type RolesEntity = z.infer<typeof rolesEntitySchema>;

export const jobsEntitySchema = z.object({
  credit_id: z.string(),
  job: z.string(),
  episode_count: z.number(),
});

export type JobsEntity = z.infer<typeof jobsEntitySchema>;

export const aggregateCastEntitySchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().optional().nullable(),
  roles: z.array(rolesEntitySchema).optional().nullable(),
  total_episode_count: z.number(),
  order: z.number(),
});

export type AggregateCastEntity = z.infer<typeof aggregateCastEntitySchema>;

export const tvCrewEntitySchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().optional().nullable(),
  jobs: z.array(jobsEntitySchema).optional().nullable(),
  department: z.string(),
  total_episode_count: z.number(),
});

export type TvCrewEntity = z.infer<typeof tvCrewEntitySchema>;

export const aggregateCastResponseSchema = z.object({
  cast: z.array(aggregateCastEntitySchema).optional().nullable(),
  crew: z.array(tvCrewEntitySchema).optional().nullable(),
  id: z.number().nullish(),
});

export type AggregateCastResponse = z.infer<typeof aggregateCastResponseSchema>;
