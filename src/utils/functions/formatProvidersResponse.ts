import {ProvidersResponseInterface} from "@/utils/models/Movies/Providers.interface";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";

export function formatProvidersResponse(providers:ProvidersResponseInterface):ProvidersDto{
    // just returning the us providers
    return {
        results: {US: providers.results.US ?? []}
    }
}