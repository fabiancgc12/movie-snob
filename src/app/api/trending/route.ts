import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/services/trending/getTrending";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page") ?? 1);
  const locale = searchParams.get("locale") ?? "en";
  const data = await getTrending("all", page, locale);
  return NextResponse.json(data);
}
