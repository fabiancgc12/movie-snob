import { infiniteQueryOptions } from "@tanstack/react-query";
import { multiSearchResponseSchema } from "@/models/search/MultiSearchResponse.schema";

type GetDiscoverTvShowsQueryProps = {
  locale: string;
  title: string | undefined;
};

export const getSearchInfiniteQuery = ({
  locale,
  title = "",
}: GetDiscoverTvShowsQueryProps) => {
  const params = {
    locale,
    title,
  };
  return infiniteQueryOptions({
    queryKey: ["search", params],
    queryFn: async ({ pageParam }) => {
      const searchParams = new URLSearchParams({
        ...params,
        page: pageParam.toString(),
      });
      const raw = await fetch(`/api/search?${searchParams}`).then((v) =>
        v.json(),
      );
      return multiSearchResponseSchema.parse(raw);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.total_pages == lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });
};
