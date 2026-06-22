import { NextRequest, NextResponse } from "next/server";
import { getPopularTv } from "@/services/tv/getPopularTv";
import { routing } from "@/i18n/routing";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") ?? 1);
  const locale = searchParams.get("locale") ?? routing.defaultLocale;
  const data = await getPopularTv(page, locale);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
