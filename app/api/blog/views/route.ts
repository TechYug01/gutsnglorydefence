import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
