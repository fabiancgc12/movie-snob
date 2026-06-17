import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSearchInfiniteQuery } from "@/features/search/queries/getSearchInfiniteQuery";
import { searchByTitle } from "@/services/search/searchByTitle";
import { SearchContent } from "./SearchContent";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ title?: string }>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const { title = "" } = await searchParams;

  const queryClient = new QueryClient();

  if (title) {
    const data = await searchByTitle({ title, locale: lang, page: 1 });
    await queryClient.prefetchInfiniteQuery({
      ...getSearchInfiniteQuery({ locale: lang, title }),
      queryFn: () => data,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchContent initialTitle={title} />
    </HydrationBoundary>
  );
}

export const revalidate = 1200;
