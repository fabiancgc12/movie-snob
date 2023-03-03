import {MovieResumeInterface} from "@/utils/models/Movies/MovieResume.interface";

export interface UpcomingInterfaceResponse {
    dates: Dates;
    page: number;
    results: MovieResumeInterface[];
    total_pages: number;
    total_results: number;
}
export interface Dates {
    maximum: string;
    minimum: string;
}