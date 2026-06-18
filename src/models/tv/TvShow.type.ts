import z from "zod";
import { spokenLanguagesSchema } from "@/features/ImdbLanguages/schemas/SpokenLanguagesSchema";
import { productionCompaniesSchema } from "@/features/productionCompanies/schema/ProductionCompaniesType";
import { productionCountriesSchema } from "@/features/ProductionCountries/schemas/ProductionCountries.schema";
import { movieGenresSchema } from "@/features/movieGenres/schemas/MovieGenresSchema";

export const createdByEntitySchema = z.object({
  id: z.number(),
  credit_id: z.string(),
  name: z.string(),
  gender: z.number(),
  profile_path: z.string().nullish(),
});

export type CreatedByEntity = z.infer<typeof createdByEntitySchema>;

export const lastEpisodeToAirOrNextEpisodeToAirSchema = z.object({
  air_date: z.string().nullish(),
  episode_number: z.number(),
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  production_code: z.string(),
  runtime: z.number().nullish(),
  season_number: z.number(),
  show_id: z.number(),
  still_path: z.string().nullish(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type LastEpisodeToAirOrNextEpisodeToAir = z.infer<
  typeof lastEpisodeToAirOrNextEpisodeToAirSchema
>;

export const networksEntitySchema = z.object({
  id: z.number(),
  name: z.string(),
  logo_path: z.string(),
  origin_country: z.string(),
});

export type NetworksEntity = z.infer<typeof networksEntitySchema>;

export const seasonsEntitySchema = z.object({
  air_date: z.string().nullish(),
  episode_count: z.number().optional(),
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullish(),
  season_number: z.number(),
});

export type SeasonsEntity = z.infer<typeof seasonsEntitySchema>;

export const tvShowSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  created_by: z.array(createdByEntitySchema).optional().nullable(),
  episode_run_time: z.array(z.number()).optional().nullable(),
  first_air_date: z.string(),
  genres: movieGenresSchema.array().optional().nullable(),
  homepage: z.string(),
  id: z.number(),
  in_production: z.boolean(),
  languages: z.array(z.string()).optional().nullable(),
  last_air_date: z.string(),
  last_episode_to_air: lastEpisodeToAirOrNextEpisodeToAirSchema,
  name: z.string(),
  next_episode_to_air: lastEpisodeToAirOrNextEpisodeToAirSchema
    .nullable()
    .optional(),
  networks: z.array(networksEntitySchema).optional().nullable(),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  origin_country: z.array(z.string()).optional().nullable(),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: productionCompaniesSchema.array().optional().nullable(),
  production_countries: productionCountriesSchema.array().optional().nullable(),
  seasons: seasonsEntitySchema.array().optional().nullable(),
  spoken_languages: spokenLanguagesSchema.array().optional().nullable(),
  status: z.string(),
  tagline: z.string(),
  type: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type TvShowType = z.infer<typeof tvShowSchema>;
