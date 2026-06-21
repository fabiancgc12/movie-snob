import { ProvidersResponseInterface } from "@/models/Movies/Providers.schema";
import { ProvidersDto } from "@/models/dto/ProvidersDto";

export function formatProvidersResponse(
  providers: ProvidersResponseInterface,
): ProvidersDto {
  // just returning the us providers
  return {
    results: { US: providers.results.US ?? null },
  };
}
