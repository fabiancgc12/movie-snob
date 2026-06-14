import { NextRequest, NextResponse } from "next/server";
import { getMovieDiscover } from "@/services/discover/getMovieDiscover";
import { DiscoverMovieResponseInterface } from "@/models/discover/discoverMovieResponse.Interface";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    genre: searchParams.get("genre") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? "en",
  };
  const data = await getMovieDiscover(parameters);
  return NextResponse.json<DiscoverMovieResponseInterface>(data);
}
