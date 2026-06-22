import { NextRequest, NextResponse } from "next/server";
import { getMovieDiscover } from "@/services/discover/getMovieDiscover";
import { routing } from "@/i18n/routing";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    genre: searchParams.get("genre") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? routing.defaultLocale,
  };
  const data = await getMovieDiscover(parameters);
  return NextResponse.json(data);
}
