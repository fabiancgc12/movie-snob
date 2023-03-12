import {MediaType} from "@/models/MediaType";

export interface RecommendationResponseInterface {
    page:          number;
    results:       RecommendationInterface[];
    total_pages:   number;
    total_results: number;
}

export interface RecommendationInterface {
    adult: boolean;
    backdrop_path?: string | null;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: MediaType;
    genre_ids?: (number)[] | null;
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum OriginalLanguage {
    En = "en",
    Nl = "nl",
}
