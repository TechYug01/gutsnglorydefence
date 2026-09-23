import { notFound } from "next/navigation";
import AdminSidebar from "../../../components/AdminSidebar";
import CourseForm from "../../CourseForm";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { requireAdmin } from "@/lib/admin-auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: PageProps) {
  await requireAdmin();

  await connectDB();
  const { id } = await params;
  const course = await Course.findById(id).lean();
  if (!course) notFound();

  // Convert to plain serializable form
  const initialData = {
    _id: String(course._id),
    title: course.title,
    description: course.description,
    price: String(course.price),
    discountPrice: course.discountPrice ? String(course.discountPrice) : "",
    image: course.image,
    imagePublicId: course.imagePublicId || "",
    externalLink: course.externalLink,
    tags: course.tags,
    expiryDate: course.expiryDate ? new Date(course.expiryDate).toISOString() : "",
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Edit Course</h1>
          <p className="text-sm text-muted line-clamp-1">{course.title}</p>
        </div>
        <CourseForm mode="edit" initialData={initialData} />
      </main>
    </div>
  );
}
