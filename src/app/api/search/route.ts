import { NextRequest, NextResponse } from "next/server";
import { searchByTitle } from "@/services/search/searchByTitle";
import { routing } from "@/i18n/routing";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    title: searchParams.get("title") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? routing.defaultLocale,
  };
  const data = await searchByTitle(parameters);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
