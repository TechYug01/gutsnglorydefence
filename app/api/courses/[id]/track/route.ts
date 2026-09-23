import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Missing course ID" }, { status: 400 });
    }

    const body = await req.json();
    const { action } = body;

    if (action !== "view" && action !== "enrollClick") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await connectDB();

    const updateField = action === "view" ? { views: 1 } : { enrollClicks: 1 };
    
    const course = await Course.findByIdAndUpdate(
      id,
      { $inc: updateField },
      { returnDocument: "after" }
    );

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/courses/[id]/track]", err);
    return NextResponse.json({ error: "Failed to track action" }, { status: 500 });
  }
}
