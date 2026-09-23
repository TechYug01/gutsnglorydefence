"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/app/admin/components/AdminSidebar";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Blogs</h1>
            <p className="text-sm text-muted">Manage your blog posts</p>
          </div>
          <a
            href="/blogs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold no-underline text-[#1A1A1A] transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
          >
            Create New Blog
          </a>
        </div>

        {loading ? (
          <p className="text-muted">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <div className="bg-card border border-edge rounded-2xl p-12 text-center">
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">No blogs yet</h3>
            <p className="text-muted">Create your first blog post to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={String(blog._id)} className="bg-card border border-edge rounded-2xl overflow-hidden flex flex-col">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{blog.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-edge px-2 py-1 rounded text-muted">#{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-edge flex justify-between items-center text-sm text-muted">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
