import {AgregateCastResponse} from "@/utils/models/tv/TvCast.interface";
import {CreditsDto, PeopleDto} from "@/utils/models/dto/Credit.dto";

export function formatTvCredits(tvCredits:AgregateCastResponse):CreditsDto{
    //just returning the first 12 member of the main cast and
    // the director or screenplay members of the crew
    //I use destructuring so next deserializes the object, if not it woulld throw an error
    const cast = tvCredits.cast?.slice(0,12).map(c => ({
        ...PeopleDto.formatTvCast(c)
    }))
    return {
        // id:tvCredits.id,
        cast,
        crew:[]
    }
}