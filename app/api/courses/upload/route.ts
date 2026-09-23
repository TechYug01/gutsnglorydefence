import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { cloudinary } from "@/lib/cloudinary";

// ── POST /api/courses/upload ──────────────────────
// Returns a signed Cloudinary upload signature so the browser can upload
// directly to Cloudinary without exposing API secret.
export async function POST(_req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "gutsnglory/courses";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch (err) {
    console.error("[POST /api/courses/upload]", err);
    return NextResponse.json({ error: "Failed to sign upload" }, { status: 500 });
  }
}
