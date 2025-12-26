import { NextResponse } from "next/server";
import { getCharacterById } from "@/lib/characterService";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getCharacterById(id);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Character not found" },
      { status: 404 }
    );
  }
}
