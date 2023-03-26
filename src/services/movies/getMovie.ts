import {CreditsResponseInterface} from "@/models/Movies/CreditsResponse.interface";
import {MovieInterface} from "@/models/Movies/Movie.interface";
import {VideoMediaResponse, VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import {ImageMediaResponse} from "@/models/Movies/ImageMedia.interface";
import {ProvidersResponseInterface} from "@/models/Movies/Providers.interface";
import {
    RecommendationInterface,
    RecommendationResponseInterface
} from "@/models/Movies/RecomendationResponse.interface";
import {formatVideoResponse} from "@/utils/functions/formatVideoResponse";
import {formatImagesResponse} from "@/utils/functions/formatImagesResponse";
import {formatProvidersResponse} from "@/utils/functions/formatProvidersResponse";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {formatRecommendations} from "@/utils/functions/formatRecommendations";
import {formatMovieCredits} from "@/utils/functions/formatMovieCredits";
import {CreditsDto} from "@/models/dto/Credit.dto";
import {getLocale} from "@/utils/functions/getLanguage";
import {extractLanguageFromLocale} from "@/utils/functions/extractLanguageFromLocale";

type ApiResponse = MovieInterface & {
    videos:VideoMediaResponse,
    images:ImageMediaResponse,
    credits:CreditsResponseInterface,
    recommendations:RecommendationResponseInterface,
    ["watch/providers"]:ProvidersResponseInterface
}
export async function getMovie(id:number,locale?:string | string[]):Promise<
    {
        movie:MovieInterface,
        credits:CreditsDto,
        videos:VideoTrailerInterface[],
        images:ImageMediaResponse,
        providers:ProvidersDto,
        recommendations:RecommendationInterface[],
    }
>{
    locale = getLocale(locale)
    const languageWithoutCountry = extractLanguageFromLocale(locale)
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=${locale}&`+
        `append_to_response=videos,images,credits,watch/providers,recommendations&include_image_language=${languageWithoutCountry},null`
    );
    const data:ApiResponse = await response.json()
    try {
        // @ts-ignore
        if (data?.success == false){
            throw data;
        }

        // I destructure all the data to their separate parts to handle them independently from each other
        let {
            credits: creditsResponse,
            videos: videoResponse,
            images: imageResponse,
            "watch/providers": providersResponse,
            recommendations: recommendationResponse,
            ...movie
        } = data

        const videos = formatVideoResponse(videoResponse)
        const images = formatImagesResponse(imageResponse)
        const providers = formatProvidersResponse(providersResponse)
        const recommendations = formatRecommendations(recommendationResponse)
        const credits = formatMovieCredits(creditsResponse)
        return {
            movie: movie,
            credits: credits,
            videos: videos,
            images: images,
            providers: providers,
            recommendations: recommendations
        }
    } catch (e) {
        throw e
    }
}