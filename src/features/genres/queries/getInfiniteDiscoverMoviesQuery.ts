import { infiniteQueryOptions } from "@tanstack/react-query";
import { discoverMovieResponseSchema } from "@/models/discover/discoverMovieResponse.schema";

export type GetInfiniteDiscoverMoviesQueryOptions = {
  locale: string;
  genre: string | number;
};

export const getInfiniteDiscoverMoviesQuery = ({
  locale,
  genre,
}: GetInfiniteDiscoverMoviesQueryOptions) => {
  const params = {
    locale,
    genre: genre.toString(),
  };
  return infiniteQueryOptions({
    queryKey: ["discoverMovies", "movie", params],
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams({
        ...params,
        page: pageParam.toString(),
      }).toString();
      const raw = await fetch(`/api/discoverMovies?${queryParams}`).then((v) =>
        v.json(),
      );
      return discoverMovieResponseSchema.parse(raw);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
};
