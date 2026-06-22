import { getHomePage } from "@/services/getHomePage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { HomePageCarousel, HomePageGenreSection } from "./HomeContent";
import { getTrendingMediaQueryOptions } from "@/features/trending/queries/getTrendingMediaQueryOptions";
import { getInfinitePopularMoviesQueryOptions } from "@/features/popular/queries/getInfinitePopularMoviesQuery.options";
import { getInfinitePopularTvShowsQueryOptions } from "@/features/popular/queries/getInfinitePopularTvShowsQuery.options";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UpcomingBanner } from "@/components/mainBanner/UpcomingBanner";
import { InfiniteTrendingPosterListSection } from "@/features/trending/components/InfiniteTrendingPosterListSection";
import { SliderSection } from "@/components/Slider/SliderSection";
import { getLocale, getTranslations } from "next-intl/server";
import { PosterList } from "@/components/poster/posterList";
import { InfinitePopularMoviesPosterListSection } from "@/features/popular/components/InfinitePopularMoviesPosterListSection";
import { InfinitePopularTvShowPosterListSection } from "@/features/popular/components/InfinitePopularTvShowsPosterListSection";
import { cacheLife } from "next/cache";

type Props = {
  params: Promise<{ lang: string }>;
};

async function getHomePageCachedData(locale: string) {
  "use cache";
  cacheLife("hours");

  const queryClient = new QueryClient();
  const data = await getHomePage(locale);
  await queryClient.prefetchInfiniteQuery({
    ...getTrendingMediaQueryOptions(locale),
    queryFn: () => data.trending,
  });
  await queryClient.prefetchInfiniteQuery({
    ...getInfinitePopularMoviesQueryOptions(locale),
    queryFn: () => data.popular.movie,
  });
  await queryClient.prefetchInfiniteQuery({
    ...getInfinitePopularTvShowsQueryOptions(locale),
    queryFn: () => data.popular.tv,
  });

  return {
    dehydratedState: dehydrate(queryClient),
    upcoming: data.upcoming,
    upcomingTrailers: data.upcomingTrailers,
  };
}

export default async function HomePage({ params }: Props) {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const { dehydratedState, upcoming, upcomingTrailers } =
    await getHomePageCachedData(locale);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={"w-full"}>
        <HomePageCarousel>
          <CarouselContent className={"z-10"}>
            {upcoming.slice(0, 8).map((u, i) => (
              <CarouselItem key={u.id}>
                <UpcomingBanner data={u} trailer={upcomingTrailers[i]} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={"left-4 z-50 translate-y-0 hidden md:flex"}
          />
          <CarouselNext
            className={"right-4 z-50 translate-y-0 hidden md:flex"}
          />
        </HomePageCarousel>
        <InfiniteTrendingPosterListSection />
        <SliderSection title={t("upcomingLabel")} speed={450}>
          <PosterList
            isBackdrop={true}
            media={upcoming}
            mediaType={"movie"}
            fallbackMessage={"There are not upcoming movies."}
          />
        </SliderSection>
        <div>
          <InfinitePopularMoviesPosterListSection />
          <InfinitePopularTvShowPosterListSection />
        </div>
        <HomePageGenreSection />
      </div>
    </HydrationBoundary>
  );
}
