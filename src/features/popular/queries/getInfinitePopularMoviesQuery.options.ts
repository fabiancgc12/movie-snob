import { infiniteQueryOptions } from "@tanstack/react-query";
import { popularMovieResponseSchema } from "@/models/popular/popularMovie.schema";

export const getInfinitePopularMoviesQueryOptions = (locale: string) =>
  infiniteQueryOptions({
    queryKey: ["popularMovies", { locale }],
    enabled: false,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        locale,
        page: pageParam.toString(),
      }).toString();
      const raw = await fetch(`/api/popularMovies?${params}`).then((v) =>
        v.json(),
      );
      return popularMovieResponseSchema.parse(raw);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
