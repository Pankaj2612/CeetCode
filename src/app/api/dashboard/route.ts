import { NextResponse } from "next/server";
// Import your data fetching function
import { gettable } from "../../../../data/table";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const company = url.searchParams.get("company") || "";
  const difficulty = url.searchParams.get("difficulty") || "";
  const tag = url.searchParams.get("tag") || "";
  const searchQuery = url.searchParams.get("searchQuery") || "";
  // const page = url.searchParams.get("page") || Number;

  try {
    const questions = await gettable({
      companyName: company,
      difficulty: difficulty,
      tag: tag,
      searchQuery: searchQuery,
      // page: page,
    });
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
