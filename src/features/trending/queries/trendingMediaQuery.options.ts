import { infiniteQueryOptions } from "@tanstack/react-query";
import { TrendingResponse } from "@/models/trending/TrendingMovieResponse.schema";

export const trendingMediaQueryOptions = (lang: string) =>
  infiniteQueryOptions({
    queryKey: ["trending", lang],
    queryFn: () => ({} as TrendingResponse),
    getNextPageParam: (lastPage: TrendingResponse) => {
      if (lastPage.total_pages === lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
