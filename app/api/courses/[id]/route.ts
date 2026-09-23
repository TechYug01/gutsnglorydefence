import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { cloudinary } from "@/lib/cloudinary";

type Params = { params: Promise<{ id: string }> };

// Helper to extract public ID from Cloudinary URL if imagePublicId is missing
function getPublicIdFromUrl(url: string) {
  if (!url) return null;
  const parts = url.split('/upload/');
  if (parts.length !== 2) return null;
  const pathParts = parts[1].split('/');
  let startIndex = 0;
  if (pathParts[0].startsWith('v') && !isNaN(parseInt(pathParts[0].substring(1)))) {
    startIndex = 1;
  }
  let publicIdWithExt = pathParts.slice(startIndex).join('/');
  const lastDotIndex = publicIdWithExt.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    publicIdWithExt = publicIdWithExt.substring(0, lastDotIndex);
  }
  return publicIdWithExt;
}

// ── GET /api/courses/[id] ─────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const { id } = await params;
    const course = await Course.findById(id).lean();
    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ course });
  } catch (err) {
    console.error("[GET /api/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

// ── PUT /api/courses/[id] ─────────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const oldCourse = await Course.findById(id);
    if (!oldCourse) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    const oldPublicId = oldCourse.imagePublicId || getPublicIdFromUrl(oldCourse.image);

    const course = await Course.findByIdAndUpdate(
      id,
      {
        ...body,
        price: body.price !== undefined ? Number(body.price) : undefined,
        discountPrice: body.discountPrice ? Number(body.discountPrice) : undefined,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      },
      { returnDocument: "after", runValidators: true }
    );

    // If a new image was uploaded, delete the old one from Cloudinary
    if (body.image && oldCourse.image && body.image !== oldCourse.image && oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (err) {
        console.error("Failed to delete old image from Cloudinary", err);
      }
    }

    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ course });
  } catch (err) {
    console.error("[PUT /api/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

// ── DELETE /api/courses/[id] ──────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const publicIdToDelete = course.imagePublicId || getPublicIdFromUrl(course.image);
    if (publicIdToDelete) {
      try {
        await cloudinary.uploader.destroy(publicIdToDelete);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary", err);
      }
    }

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("[DELETE /api/courses/[id]]", err);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
