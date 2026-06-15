import { infiniteQueryOptions } from "@tanstack/react-query";

export const trendingMediaQueryOptions = (lang: string) =>
  infiniteQueryOptions({
    queryKey: ["trending", lang],
    queryFn: () => {},
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
