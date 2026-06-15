import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/services/trending/getTrending";
import { TrendingResponse } from "@/models/trending/TrendingMovieResponse.schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") ?? 1);
  const locale = searchParams.get("locale") ?? undefined;
  const data = await getTrending("all", page, locale);
  return NextResponse.json<TrendingResponse>(data);
}
