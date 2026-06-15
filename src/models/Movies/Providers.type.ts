import { z } from "zod";

export const providerSchema = z.object({
  logo_path: z.string(),
  provider_id: z.number(),
  provider_name: z.string(),
  display_priority: z.number(),
});

export type Provider = z.infer<typeof providerSchema>;

export const countryProvidersSchema = z
  .object({
    link: z.string(),
    flatrate: providerSchema.array().optional(),
    buy: z.array(providerSchema),
    rent: providerSchema.array().optional(),
    ads: providerSchema.array().optional(),
    free: providerSchema.array().optional(),
  })
  .nullish();

export type CountryProviders = z.infer<typeof countryProvidersSchema>;

export const resultsSchema = z.object({
  AE: countryProvidersSchema,
  AR: countryProvidersSchema,
  AT: countryProvidersSchema,
  AU: countryProvidersSchema,
  BA: countryProvidersSchema,
  BB: countryProvidersSchema,
  BE: countryProvidersSchema,
  BG: countryProvidersSchema,
  BO: countryProvidersSchema,
  BR: countryProvidersSchema,
  BS: countryProvidersSchema,
  CA: countryProvidersSchema,
  CH: countryProvidersSchema,
  CI: countryProvidersSchema,
  CL: countryProvidersSchema,
  CO: countryProvidersSchema,
  CR: countryProvidersSchema,
  CZ: countryProvidersSchema,
  DE: countryProvidersSchema,
  DK: countryProvidersSchema,
  DO: countryProvidersSchema,
  DZ: countryProvidersSchema,
  EC: countryProvidersSchema,
  EG: countryProvidersSchema,
  ES: countryProvidersSchema,
  FI: countryProvidersSchema,
  FR: countryProvidersSchema,
  GB: countryProvidersSchema,
  GF: countryProvidersSchema,
  GH: countryProvidersSchema,
  GQ: countryProvidersSchema,
  GT: countryProvidersSchema,
  HK: countryProvidersSchema,
  HN: countryProvidersSchema,
  HR: countryProvidersSchema,
  HU: countryProvidersSchema,
  ID: countryProvidersSchema,
  IE: countryProvidersSchema,
  IL: countryProvidersSchema,
  IN: countryProvidersSchema,
  IQ: countryProvidersSchema,
  IT: countryProvidersSchema,
  JM: countryProvidersSchema,
  JP: countryProvidersSchema,
  KE: countryProvidersSchema,
  LB: countryProvidersSchema,
  MD: countryProvidersSchema,
  MU: countryProvidersSchema,
  MX: countryProvidersSchema,
  MY: countryProvidersSchema,
  MZ: countryProvidersSchema,
  NE: countryProvidersSchema,
  NG: countryProvidersSchema,
  NL: countryProvidersSchema,
  NO: countryProvidersSchema,
  NZ: countryProvidersSchema,
  PA: countryProvidersSchema,
  PE: countryProvidersSchema,
  PH: countryProvidersSchema,
  PL: countryProvidersSchema,
  PS: countryProvidersSchema,
  PT: countryProvidersSchema,
  PY: countryProvidersSchema,
  RO: countryProvidersSchema,
  RS: countryProvidersSchema,
  SA: countryProvidersSchema,
  SC: countryProvidersSchema,
  SE: countryProvidersSchema,
  SG: countryProvidersSchema,
  SI: countryProvidersSchema,
  SK: countryProvidersSchema,
  SN: countryProvidersSchema,
  SV: countryProvidersSchema,
  TH: countryProvidersSchema,
  TR: countryProvidersSchema,
  TW: countryProvidersSchema,
  TZ: countryProvidersSchema,
  UG: countryProvidersSchema,
  US: countryProvidersSchema,
  UY: countryProvidersSchema,
  VE: countryProvidersSchema,
  ZA: countryProvidersSchema,
  ZM: countryProvidersSchema,
});

export type Results = z.infer<typeof resultsSchema>;

export const providersResponseSchema = z.object({
  id: z.number().nullish(),
  results: resultsSchema,
});

export type ProvidersResponseInterface = z.infer<
  typeof providersResponseSchema
>;
