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
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PosterList } from "@/components/poster/posterList";
import { InfinitePopularMoviesPosterListSection } from "@/features/popular/components/InfinitePopularMoviesPosterListSection";
import { InfinitePopularTvShowPosterListSection } from "@/features/popular/components/InfinitePopularTvShowsPosterListSection";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const t = await getTranslations("home");
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
      <div className={"w-full"}>
        <HomePageCarousel>
          <CarouselContent className={"z-10"}>
            {data.upcoming.slice(0, 8).map((u, i) => (
              <CarouselItem key={u.id}>
                <UpcomingBanner data={u} trailer={data.upcomingTrailers[i]} />
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
            media={data.upcoming}
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

export const revalidate = 1200;
