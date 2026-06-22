import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSearchInfiniteQuery } from "@/features/search/queries/getSearchInfiniteQuery";
import { searchByTitle } from "@/services/search/searchByTitle";
import { SearchContent } from "./SearchContent";
import { getLocale } from "next-intl/server";

type Props = {
  searchParams: Promise<{ title?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const locale = await getLocale();
  const { title = "" } = await searchParams;

  const queryClient = new QueryClient();

  if (title) {
    const data = await searchByTitle({ title, locale: locale, page: 1 });
    await queryClient.prefetchInfiniteQuery({
      ...getSearchInfiniteQuery({ locale: locale, title }),
      queryFn: () => data,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchContent initialTitle={title} />
    </HydrationBoundary>
  );
}
