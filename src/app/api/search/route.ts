import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/search";

// Read the content directory on every request so newly added Markdown
// articles are searchable immediately, without a rebuild.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
  return NextResponse.json(getSearchIndex(), {
    headers: { "Cache-Control": "no-store" },
  });
}
