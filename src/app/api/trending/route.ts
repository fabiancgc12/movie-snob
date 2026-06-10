import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/services/trending/getTrending";
import { TrendingResponseInterface } from "@/models/trending/TrendingMovieResponse";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") ?? 1);
  const locale = searchParams.get("locale") ?? undefined;
  const data = await getTrending("all", page, locale);
  return NextResponse.json<TrendingResponseInterface>(data);
}
