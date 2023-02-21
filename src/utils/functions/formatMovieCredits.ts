import {CreditsResponseInterface} from "@/utils/models/Movies/CreditsResponse.interface";

export function formatMovieCredits(credits:CreditsResponseInterface){
    //just returning the first 12 member of the main cast and
    // the director or screenplay members of the crew
    credits.cast = credits.cast?.slice(0,12);
    credits.crew = credits.crew
        ?.filter(c => c.job.toLowerCase() == "director" || c.job.toLowerCase() == "screenplay")
        .slice(0,2)
    return credits
}