import { NextResponse } from "next/server";
import { gettable } from "../../../../data/table";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const company = url.searchParams.get("company") || "";
  const difficulty = url.searchParams.get("difficulty") || "";
  const tag = url.searchParams.get("tag") || "";
  const searchQuery = url.searchParams.get("searchQuery") || "";
  const page = url.searchParams.get("page");

  try {
    const questions = await gettable({
      companyName: company,
      difficulty: difficulty,
      // tag: tag,
      searchQuery: searchQuery,
      page: page ? Number(page) : undefined, // Convert to number if page is provided
    });
    
    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching data:", error); // Log the error for debugging
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
