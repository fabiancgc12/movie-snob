import { NextRequest, NextResponse } from "next/server";
import { getTvDiscover } from "@/services/discover/getTvDiscover";
import { DiscoverTvResponseInterface } from "@/models/discover/discoverTvResponse.interface";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    genre: searchParams.get("genre") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? undefined,
  };
  const data = await getTvDiscover(parameters);
  return NextResponse.json<DiscoverTvResponseInterface>(data);
}
