import { getHomePage } from "@/services/getHomePage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { HomeContent } from "./HomeContent";
import { getTrendingMediaQueryOptions } from "@/features/trending/queries/getTrendingMediaQueryOptions";
import { getInfinitePopularMoviesQueryOptions } from "@/features/popular/queries/getInfinitePopularMoviesQuery.options";
import { getInfinitePopularTvShowsQueryOptions } from "@/features/popular/queries/getInfinitePopularTvShowsQuery.options";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const queryClient = new QueryClient();
  const data = await getHomePage(lang);
  await queryClient.prefetchInfiniteQuery({
    ...getTrendingMediaQueryOptions(lang),
    queryFn: () => data.trending,
  });
  await queryClient.prefetchInfiniteQuery({
    ...getInfinitePopularMoviesQueryOptions(lang),
    queryFn: () => data.popular.movie,
  });
  await queryClient.prefetchInfiniteQuery({
    ...getInfinitePopularTvShowsQueryOptions(lang),
    queryFn: () => data.popular.tv,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContent
        upcoming={data.upcoming}
        upcomingTrailers={data.upcomingTrailers}
      />
    </HydrationBoundary>
  );
}

export const revalidate = 1200;
