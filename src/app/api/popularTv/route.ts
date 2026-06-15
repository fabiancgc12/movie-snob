import { NextRequest, NextResponse } from "next/server";
import { getPopularTv } from "@/services/tv/getPopularTv";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") ?? 1);
  const locale = searchParams.get("locale") ?? "en";
  const data = await getPopularTv(page, locale);
  return NextResponse.json(data);
}
