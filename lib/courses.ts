import { connectDB } from "@/lib/mongodb";
import Course, { getSortQuery, SortType } from "@/models/Course";

export async function getCoursesData(type: "all" | "free" | "paid", sort: string, limit: number) {
  try {
    await connectDB();
    const filter: any = {};
    if (type === "free") filter.price = 0;
    if (type === "paid") filter.price = { $gt: 0 };
    
    // Do not show expired courses
    filter.$or = [
      { expiryDate: { $exists: false } },
      { expiryDate: null },
      { expiryDate: { $gt: new Date() } }
    ];

    const courses = await Course.find(filter)
      .sort(getSortQuery(sort as SortType))
      .limit(limit)
      .lean();

    return courses.map((c: any) => ({
      ...c,
      _id: c._id.toString(),
      expiryDate: c.expiryDate?.toISOString() || null,
      createdAt: c.createdAt?.toISOString() || null,
      updatedAt: c.updatedAt?.toISOString() || null,
    }));
  } catch (err) {
    console.error("Failed to fetch courses data:", err);
    return [];
  }
}
