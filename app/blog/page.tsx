import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({ title: "Defence Blog & Strategies | Guts N Glory" });
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import SubscribeButton from "./SubscribeButton";
import ThemeToggle from "./ThemeToggle";
import BlogContent from "./BlogContent";

async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
  return blogs.map((b: any) => ({
    _id: String(b._id),
    title: b.title,
    slug: b.slug,
    content: b.content,
    coverImage: b.coverImage,
    tags: b.tags,
    views: b.views || 0,
    createdAt: b.createdAt.toISOString(),
  }));
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  // Extract unique tags
  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags)));

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="border-b border-edge bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <img src="/gutsnglorylogo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
            <div className="font-heading font-extrabold text-xl tracking-wide text-foreground">
              GUTS N <span className="text-gold">GLORY</span>
              <span className="text-xs font-medium text-muted ml-2 tracking-normal">BLOG</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SubscribeButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">


        <BlogContent blogs={blogs} allTags={allTags} />
      </main>

      {/* Footer */}
      <footer className="border-t border-edge mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Guts N Glory. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
