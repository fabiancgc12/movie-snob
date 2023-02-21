import {RecommendationResponseInterface} from "@/utils/models/Movies/RecomendationResponse.interface";

export function formatRecommendations(recommendations:RecommendationResponseInterface){
    //just returning the first 12 recommendation
    return recommendations.results.slice(0,12)
}