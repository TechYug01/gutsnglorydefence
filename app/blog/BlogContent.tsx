"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, TrendingUp, Library, FileText } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  tags: string[];
  views: number;
  createdAt: string;
  content: string;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function readingTime(html: string) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogContent({ blogs, allTags }: { blogs: Blog[]; allTags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"latest" | "trending" | "all">("latest");

  const filtered = activeTag ? blogs.filter(b => b.tags.includes(activeTag)) : blogs;

  const sorted = [...filtered].sort((a, b) => {
    if (activeSection === "trending") return (b.views || 0) - (a.views || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const featured = blogs[0]; // Latest blog is featured
  const rest = activeSection === "latest" ? sorted : sorted;

  return (
    <>
      {/* Hero / Featured Post */}
      {featured && !activeTag && activeSection === "latest" && (
        <Link href={`/${featured.slug}`} className="group block mb-16 no-underline">
          <div className="relative rounded-3xl overflow-hidden border border-edge bg-card hover:border-gold transition-all duration-500">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-[420px] overflow-hidden">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gold text-[#1A1A1A] uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex gap-2 mb-5 flex-wrap">
                  {featured.tags.map((tag: string) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-[rgba(200,169,81,0.12)] text-gold rounded-full border border-[rgba(200,169,81,0.2)]">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 text-foreground group-hover:text-gold transition-colors leading-tight">
                  {featured.title}
                </h2>
                <p className="text-muted leading-relaxed mb-6 line-clamp-3">
                  {stripHtml(featured.content).slice(0, 200)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>{new Date(featured.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span>{readingTime(featured.content)} min read</span>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span>{featured.views || 0} views</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Section Tabs + Tag Filters */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-1 bg-card border border-edge rounded-2xl p-1.5">
            {(["latest", "trending", "all"] as const).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-none cursor-pointer ${
                  activeSection === section
                    ? "bg-gold text-[#1A1A1A]"
                    : "bg-transparent text-muted hover:text-foreground"
                }`}
              >
                {section === "latest" ? <span className="flex items-center gap-2"><Clock size={16}/> Latest</span> : section === "trending" ? <span className="flex items-center gap-2"><TrendingUp size={16}/> Trending</span> : <span className="flex items-center gap-2"><Library size={16}/> All Posts</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer ${
              !activeTag
                ? "bg-gold text-[#1A1A1A] border-gold"
                : "bg-transparent text-secondary border-edge hover:border-gold hover:text-gold"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                activeTag === tag
                  ? "bg-[rgba(200,169,81,0.2)] text-gold border-gold"
                  : "bg-transparent text-secondary border-edge hover:border-gold hover:text-gold"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {rest.length === 0 ? (
        <div className="text-center py-20">
          <div className="flex justify-center mb-4 text-muted"><FileText size={64}/></div>
          <h3 className="font-heading text-2xl font-bold mb-2 text-foreground">No posts found</h3>
          <p className="text-muted">Try selecting a different category or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((blog, i) => (
            <Link
              key={String(blog._id)}
              href={`/${blog.slug}`}
              className="group flex flex-col bg-card border border-edge rounded-2xl overflow-hidden hover:border-gold hover:-translate-y-1 transition-all duration-300 no-underline"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {activeSection === "trending" && i < 3 && (
                  <div className="absolute top-3 right-3">
                    <span className="w-8 h-8 rounded-full bg-gold text-[#1A1A1A] flex items-center justify-center text-xs font-black">
                      #{i + 1}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {blog.tags.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-[0.65rem] font-semibold px-2.5 py-0.5 bg-edge text-muted rounded-full">
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="text-[0.65rem] font-semibold px-2.5 py-0.5 bg-edge text-muted rounded-full">
                      +{blog.tags.length - 2}
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed">
                  {stripHtml(blog.content).slice(0, 120)}...
                </p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted pt-3 border-t border-edge">
                  <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  <div className="flex items-center gap-3">
                    <span>{readingTime(blog.content)} min</span>
                    <span>{blog.views || 0} views</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
