import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Pencil } from "lucide-react";
import Image from "next/image";
import AdminSidebar from "../components/AdminSidebar";
import { connectDB } from "@/lib/mongodb";
import Course, { getSortQuery, SortType } from "@/models/Course";
import DeleteCourseButton from "./DeleteCourseButton";
import { requireAdmin } from "@/lib/admin-auth";

interface PageProps {
  searchParams: Promise<{ sort?: string }>;
}

async function getCourses(sort: SortType) {
  await connectDB();
  return Course.find({}).sort(getSortQuery(sort)).lean();
}

export default async function AdminCoursesPage({ searchParams }: PageProps) {
  await requireAdmin();

  const { sort = "default" } = await searchParams;
  const courses = await getCourses(sort as SortType);

  const sortOptions: { label: string; value: string }[] = [
    { label: "Latest", value: "default" },
    { label: "Most Popular", value: "popular" },
    { label: "Trending", value: "trending" },
    { label: "Oldest First", value: "old" },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Courses</h1>
            <p className="text-sm text-muted">{courses.length} courses total</p>
          </div>
          <Link
            href="/courses/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold no-underline text-[#1A1A1A] transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
          >
            <Pencil size={14} />
            Add Course
          </Link>
        </div>

        {/* Sort tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {sortOptions.map((opt) => (
            <Link
              key={opt.value}
              href={`/courses?sort=${opt.value}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium no-underline transition-all duration-200 border ${
                sort === opt.value
                  ? "bg-[rgba(200,169,81,0.15)] text-gold border-[rgba(200,169,81,0.3)]"
                  : "text-muted border-edge hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>

        {/* Courses table */}
        {courses.length === 0 ? (
          <div className="bg-card border border-edge rounded-2xl p-16 text-center">
            <div className="flex justify-center mb-4 text-muted"><FileText size={48} /></div>
            <p className="text-muted text-sm mb-4">No courses yet.</p>
            <Link
              href="/courses/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold no-underline text-[#1A1A1A]"
              style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
            >
              Add your first course
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-edge rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-edge">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-[1px]">Course</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-[1px]">Price</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-[1px]">Tags</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-[1px]">Views</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-[1px]">Enroll Clicks</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-[1px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, idx) => (
                    <tr
                      key={String(course._id)}
                      className={`border-b border-edge last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors ${
                        idx % 2 === 0 ? "" : "bg-[rgba(255,255,255,0.01)]"
                      }`}
                    >
                      {/* Course info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-edge">
                            <Image
                              src={course.image}
                              alt={course.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground line-clamp-1">{course.title}</div>
                            <div className="text-xs text-muted line-clamp-1 max-w-[260px]">{course.description}</div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        {course.price === 0 ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[rgba(74,138,38,0.15)] text-[#6ABF40]">
                            Free
                          </span>
                        ) : (
                          <div>
                            <div className="text-sm font-bold text-gold">₹{course.discountPrice ?? course.price}</div>
                            {course.discountPrice && (
                              <div className="text-xs text-muted line-through">₹{course.price}</div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Tags */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {(course.tags as string[]).slice(0, 3).map((tag: string) => (
                            <span key={tag} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-edge text-muted">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Views & Clicks */}
                      <td className="px-5 py-4 text-sm text-secondary">
                        {course.views?.toLocaleString() || 0}
                      </td>
                      <td className="px-5 py-4 text-sm text-secondary">
                        {course.enrollClicks?.toLocaleString() || 0}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/courses/${course._id}/edit`}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-edge text-secondary no-underline hover:text-foreground transition-colors"
                          >
                            Edit
                          </Link>
                          <DeleteCourseButton id={String(course._id)} title={course.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
