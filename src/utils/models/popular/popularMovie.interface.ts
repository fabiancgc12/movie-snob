import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";

export interface PopularMovieResponse {
    page:          number;
    results:       MovieResumeInterface[];
    total_pages:   number;
    total_results: number;
}