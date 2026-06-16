import { infiniteQueryOptions } from "@tanstack/react-query";
import { discoverTvResponseInterfaceSchema } from "@/models/discover/discoverTvResponse.schema";

type GetDiscoverTvShowsQueryProps = {
  locale: string;
  genre: string | number;
};

export const getDiscoverTvShowsInfiniteQuery = ({
  locale,
  genre,
}: GetDiscoverTvShowsQueryProps) => {
  const params = {
    locale,
    genre: genre.toString(),
  };
  return infiniteQueryOptions({
    queryKey: ["discover-tv", params],
    queryFn: async ({ pageParam }) => {
      const searchParams = new URLSearchParams({
        ...params,
        page: pageParam.toString(),
      }).toString();
      const raw = await fetch(`/api/discoverTv?${searchParams}`).then((v) =>
        v.json(),
      );
      return discoverTvResponseInterfaceSchema.parse(raw);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
};
