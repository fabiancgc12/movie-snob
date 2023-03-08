import {CreditsResponseInterface} from "@/models/Movies/CreditsResponse.interface";
import {CreditsDto, PeopleDto} from "@/models/dto/Credit.dto";

export function formatMovieCredits(movieCredits:CreditsResponseInterface):CreditsDto{
    //just returning the first 12 member of the main cast and
    // the director or screenplay members of the crew
    //i use destructuring so next deserializes the object, if not it woulld throw an error
    const cast = movieCredits.cast?.slice(0,12).map(c => ({...PeopleDto.formatMovieCast(c)}))
    const crew = movieCredits
        .crew?.filter(c => c.job.toLowerCase() == "director" || c.job.toLowerCase() == "screenplay")
        .map(c => ({...PeopleDto.formatMovieCrew(c)}))

    return {
        // id:movieCredits.id,
        cast,
        crew
    }
}