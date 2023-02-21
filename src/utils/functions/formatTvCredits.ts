import {AgregateCastResponse} from "@/utils/models/tv/TvCast.interface";

export function formatTvCredits(credits:AgregateCastResponse){
    //just returning the first 12 member of the main cast
    credits.cast = credits.cast?.slice(0,12);
    credits.crew = []
    return credits
}