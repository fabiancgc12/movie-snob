import { infiniteQueryOptions } from "@tanstack/react-query";
import { discoverMovieResponseSchema } from "@/models/discover/discoverMovieResponse.schema";

type GetDiscoverTvShowsQueryProps = {
  locale: string;
  genre: string | number;
};

export const getDiscoverMoviesInfiniteQuery = ({
  locale,
  genre,
}: GetDiscoverTvShowsQueryProps) => {
  const params = {
    locale,
    genre: genre.toString(),
  };
  return infiniteQueryOptions({
    queryKey: ["discover-movie", params],
    queryFn: async ({ pageParam }) => {
      const searchParams = new URLSearchParams({
        ...params,
        page: pageParam.toString(),
      }).toString();
      const raw = await fetch(`/api/discoverMovies?${searchParams}`).then((v) =>
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
