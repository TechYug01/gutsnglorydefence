import { BookOpen, PlusCircle, GraduationCap, IndianRupee, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";
import { requireAdmin } from "@/lib/admin-auth";

async function getStats() {
  await connectDB();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [total, free, paid, recent] = await Promise.all([
    Course.countDocuments(),
    Course.countDocuments({ price: 0 }),
    Course.countDocuments({ price: { $gt: 0 } }),
    Course.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
  ]);
  return { total, free, paid, recent };
}

export default async function AdminDashboard() {
  await requireAdmin();

  const stats = await getStats();

  const statCards = [
    { label: "Total Courses", value: stats.total, color: "#C8A951", icon: <BookOpen size={24} /> },
    { label: "Free Courses", value: stats.free, color: "#4A8A26", icon: <GraduationCap size={24} /> },
    { label: "Paid Courses", value: stats.paid, color: "#D4774A", icon: <IndianRupee size={24} /> },
    { label: "Added This Week", value: stats.recent, color: "#4A8ACA", icon: <Sparkles size={24} /> },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-sm text-muted">Overview of your Guts N Glory course platform</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-card border border-edge rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="text-2xl">{card.icon}</div>
              <div
                className="font-heading text-4xl font-black"
                style={{ color: card.color }}
              >
                {card.value}
              </div>
              <div className="text-sm text-muted font-medium">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="bg-card border border-edge rounded-2xl p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4 text-base">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/courses/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline text-[#1A1A1A] transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
            >
              <PlusCircle size={16} />
              Add Course
            </a>
            <a
              href="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline text-foreground bg-edge border border-edge transition-all duration-200 hover:border-gold"
            >
              View All Courses
            </a>
            <a
              href="/blogs/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline text-[#1A1A1A] transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
            >
              <PlusCircle size={16} />
              Add Blog
            </a>
            <a
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline text-foreground bg-edge border border-edge transition-all duration-200 hover:border-gold"
            >
              View All Blogs
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
