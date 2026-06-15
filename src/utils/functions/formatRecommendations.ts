import { RecommendationResponseInterface } from "@/models/Movies/RecomendationResponse.type";

export function formatRecommendations(
  recommendations: RecommendationResponseInterface,
) {
  //just returning the first 12 recommendation
  return recommendations.results.slice(0, 12);
}
