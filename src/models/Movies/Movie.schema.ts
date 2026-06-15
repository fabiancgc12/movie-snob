import { z } from "zod";
import { spokenLanguagesSchema } from "@/features/ImdbLanguages/schemas/SpokenLanguagesSchema";
import { productionCompaniesSchema } from "@/features/productionCompanies/schema/ProductionCompaniesType";
import { productionCountriesSchema } from "@/features/ProductionCountries/schemas/ProductionCountries.schema";
import { movieGenresSchema } from "@/features/movieGenres/schemas/MovieGenresSchema";

export const movieTypeSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable().optional(),
      backdrop_path: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  budget: z.number(),
  genres: movieGenresSchema.array().optional().nullable(),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: productionCompaniesSchema.array().optional().nullable(),
  production_countries: productionCountriesSchema.array().optional().nullable(),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number().nullable(),
  spoken_languages: spokenLanguagesSchema.array().optional().nullable(),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieSchema = z.infer<typeof movieTypeSchema>;
