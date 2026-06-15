import { getHomePage } from "@/services/getHomePage";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HomeContent } from "./HomeContent";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const queryClient = new QueryClient();
  try {
    const data = await getHomePage(lang);
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["trending", lang],
      queryFn: () => data.trending,
      initialPageParam: 1,
    });
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["popularMovies", lang],
      queryFn: () => data.popular.movie,
      initialPageParam: 1,
    });
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["popularTv", lang],
      queryFn: () => data.popular.tv,
      initialPageParam: 1,
    });

    return (
      <HomeContent
        upcoming={data.upcoming}
        upcomingTrailers={data.upcomingTrailers}
        dehydratedState={JSON.parse(JSON.stringify(dehydrate(queryClient)))}
      />
    );
  } catch (e) {
    throw e;
  }
}

export const revalidate = 1200;
