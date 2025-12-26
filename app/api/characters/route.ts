import { NextResponse } from "next/server";
import { getCharacters, searchCharactersByName } from "@/lib/characterService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const name = searchParams.get("name");

  try {
    if (name) {
      const data = await searchCharactersByName(name);
      return NextResponse.json(data);
    } else {
      const data = await getCharacters(page);
      return NextResponse.json(data);
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    );
  }
}
