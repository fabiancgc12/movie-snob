import { CountryProviders } from "@/models/Movies/Providers.schema";

export interface ProvidersDto {
  results: {
    US: CountryProviders | null | undefined;
  };
}
