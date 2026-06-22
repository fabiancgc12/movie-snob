import { NextRequest, NextResponse } from "next/server";
import { getTvDiscover } from "@/services/discover/getTvDiscover";
import { routing } from "@/i18n/routing";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    genre: searchParams.get("genre") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? routing.defaultLocale,
  };
  const data = await getTvDiscover(parameters);
  return NextResponse.json(data);
}
