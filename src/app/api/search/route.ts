import { NextRequest, NextResponse } from "next/server";
import { getMultiSearch } from "@/services/search/getMultiSearch";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    title: searchParams.get("title") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? "en",
  };
  const data = await getMultiSearch(parameters);
  return NextResponse.json(data);
}
