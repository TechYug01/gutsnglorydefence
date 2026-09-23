import AdminSidebar from "../../components/AdminSidebar";
import CourseForm from "../CourseForm";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = { title: "Add Course — Admin" };

export default async function NewCoursePage() {
  await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Add Course</h1>
          <p className="text-sm text-muted">Fill in the details to create a new course</p>
        </div>
        <CourseForm mode="create" />
      </main>
    </div>
  );
}
