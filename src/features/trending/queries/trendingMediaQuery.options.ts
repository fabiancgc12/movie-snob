import { infiniteQueryOptions } from "@tanstack/react-query";

export const trendingMediaQueryOptions = (lang: string) =>
  infiniteQueryOptions({
    queryKey: ["trending", lang],
    queryFn: () => {},
    initialPageParam: 1,
  });
