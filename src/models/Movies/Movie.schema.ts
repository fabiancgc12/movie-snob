import { z } from "zod";

export const genresEntitySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type MovieGenresType = z.infer<typeof genresEntitySchema>;

export const productionCompaniesEntitySchema = z.object({
  id: z.number(),
  logo_path: z.string().optional().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

export type ProductionCompaniesEntity = z.infer<
  typeof productionCompaniesEntitySchema
>;

export const productionCountriesEntitySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export type ProductionCountriesEntity = z.infer<
  typeof productionCountriesEntitySchema
>;

export const spokenLanguagesEntitySchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

export type SpokenLanguagesEntity = z.infer<typeof spokenLanguagesEntitySchema>;

export const movieTypeSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  belongs_to_collection: z.null().optional(),
  budget: z.number(),
  genres: z.array(genresEntitySchema).optional().nullable(),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z
    .array(productionCompaniesEntitySchema)
    .optional()
    .nullable(),
  production_countries: z
    .array(productionCountriesEntitySchema)
    .optional()
    .nullable(),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(spokenLanguagesEntitySchema).optional().nullable(),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieSchema = z.infer<typeof movieTypeSchema>;
