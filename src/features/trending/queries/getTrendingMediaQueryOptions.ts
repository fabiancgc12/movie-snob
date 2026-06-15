import { infiniteQueryOptions } from "@tanstack/react-query";
import { trendingResponseInterfaceSchema } from "@/models/trending/TrendingMovieResponse.schema";

export const getTrendingMediaQueryOptions = (locale: string) =>
  infiniteQueryOptions({
    queryKey: ["trending", { locale }],
    enabled: false,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        locale,
        page: pageParam.toString(),
      }).toString();
      const raw = await fetch(`/api/trending?${params}`).then((v) => v.json());
      return trendingResponseInterfaceSchema.parse(raw);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
