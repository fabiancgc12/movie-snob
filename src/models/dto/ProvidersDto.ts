import { CountryProviders } from "@/models/Movies/Providers.type";

export interface ProvidersDto {
  results: {
    US: CountryProviders | null | undefined;
  };
}
