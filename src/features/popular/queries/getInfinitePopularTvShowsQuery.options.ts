import { infiniteQueryOptions } from "@tanstack/react-query";
import { popularTvShowResponseSchema } from "@/models/popular/popularTv.schema";

export const getInfinitePopularTvShowsQueryOptions = (locale: string) =>
  infiniteQueryOptions({
    queryKey: ["popularTv", { locale }],
    enabled: false,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        locale,
        page: pageParam.toString(),
      }).toString();
      const raw = await fetch(`/api/popularTv?${params}`).then((v) => v.json());
      return popularTvShowResponseSchema.parse(raw);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
