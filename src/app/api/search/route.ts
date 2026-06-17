import { NextRequest, NextResponse } from "next/server";
import { searchByTitle } from "@/services/search/searchByTitle";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parameters = {
    title: searchParams.get("title") ?? undefined,
    page: Number(searchParams.get("page")),
    locale: searchParams.get("locale") ?? "en",
  };
  const data = await searchByTitle(parameters);
  return NextResponse.json(data);
}
