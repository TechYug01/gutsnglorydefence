import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";

// ── GET /api/courses/search?q=query ──────────────
// Returns up to 8 matching course title + id for autocomplete dropdown
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";

    if (!q || q.length < 1) {
      return NextResponse.json({ results: [] });
    }

    await connectDB();

    const results = await Course.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" }, title: 1, price: 1 }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(8)
      .lean();

    // Fallback: if text index gives no results, try regex
    if (results.length === 0) {
      const regex = new RegExp(q, "i");
      const fallback = await Course.find(
        { title: regex },
        { title: 1, price: 1 }
      )
        .limit(8)
        .lean();
      return NextResponse.json({ results: fallback });
    }

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[GET /api/courses/search]", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
