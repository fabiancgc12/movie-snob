import {TvShowResume} from "@/utils/models/tv/TvShowResume";

export interface PopularTvShowResponse {
    page:          number;
    results:       TvShowResume[];
    total_pages:   number;
    total_results: number;
}