import { NextRequest, NextResponse } from "next/server";
import { getMultiSearch } from "@/services/search/getMultiSearch";
import { MultiSearchResponseInterface } from "@/models/search/MultiSearchResponse.interface";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    title: searchParams.get("title") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? undefined,
  };
  const data = await getMultiSearch(parameters);
  return NextResponse.json<MultiSearchResponseInterface>(data);
}
