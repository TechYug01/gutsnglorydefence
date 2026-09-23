import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Course, { getSortQuery, SortType } from "@/models/Course";

// ── GET /api/courses ──────────────────────────────
// Query params:
//   type=all|free|paid   (default: all)
//   sort=popular|trending|new|default
//   limit=N              (default: 50)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") ?? "all";
    const sort = (searchParams.get("sort") ?? "default") as SortType;
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);

    // Build filter
    const filter: Record<string, unknown> = {};
    if (type === "free") filter.price = 0;
    if (type === "paid") filter.price = { $gt: 0 };
    
    // Do not show expired courses
    filter.$or = [
      { expiryDate: { $exists: false } },
      { expiryDate: null },
      { expiryDate: { $gt: new Date() } }
    ];

    const courses = await Course.find(filter)
      .sort(getSortQuery(sort))
      .limit(limit)
      .lean();

    return NextResponse.json({ courses });
  } catch (err) {
    console.error("[GET /api/courses]", err);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// ── POST /api/courses ─────────────────────────────
// Body: { title, description, price, discountPrice, image, externalLink, tags }
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { title, description, price, discountPrice, image, imagePublicId, externalLink, tags, expiryDate } = body;

    if (!title || !description || price === undefined || !image || !externalLink) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const course = await Course.create({
      title,
      description,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      image,
      imagePublicId,
      externalLink,
      tags: tags ?? [],
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/courses]", err);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
