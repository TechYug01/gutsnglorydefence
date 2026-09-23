import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShareButton from "../ShareButton";
import ThemeToggle from "../ThemeToggle";
import ViewTracker from "../ViewTracker";
import parse from "html-react-parser";
import "react-quill-new/dist/quill.snow.css";
import "katex/dist/katex.min.css";

import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any) {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug });
  if (!blog) return constructMetadata({ title: "Blog Not Found" });
  return constructMetadata({ 
    title: `${blog.title} | Guts N Glory`,
    description: blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
    image: blog.coverImage
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function readingTime(html: string) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPost({ params }: any) {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug });
  if (!blog) notFound();

  // Find related posts by shared tags, excluding current post
  const relatedPosts = await Blog.find({
    _id: { $ne: blog._id },
    tags: { $in: blog.tags },
  })
    .sort({ views: -1, createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <div className="min-h-screen bg-background">
      <ViewTracker slug={blog.slug} />

      {/* Header */}
      <header className="border-b border-edge bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline text-muted hover:text-foreground transition-colors font-medium text-sm">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ShareButton title={blog.title} />
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="mb-10">
          <div className="flex gap-2 mb-5 flex-wrap">
            {blog.tags.map((tag: string) => (
              <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-[rgba(200,169,81,0.12)] text-gold rounded-full border border-[rgba(200,169,81,0.2)]">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black leading-[1.15] mb-6 text-foreground">{blog.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>{readingTime(blog.content)} min read</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span>{blog.views || 0} views</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-12 border border-edge">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-auto object-cover" />
        </div>

        {/* Content */}
        <div className="ql-editor !px-0 prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-gold prose-img:rounded-xl text-foreground">
          {parse(blog.content)}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          [data-theme="dark"] .ql-editor { color: var(--foreground); }
          .ql-editor img { border-radius: 0.75rem; margin: 2rem auto; max-width: 100%; }
          .ql-editor iframe { border-radius: 0.75rem; margin: 2rem auto; max-width: 100%; aspect-ratio: 16/9; width: 100%; }
        ` }} />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-edge bg-card/50">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Related Articles</h2>
              <p className="text-sm text-muted">More posts you might enjoy based on similar topics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post: any) => (
                <Link
                  key={String(post._id)}
                  href={`/${post.slug}`}
                  className="group flex flex-col bg-card border border-edge rounded-2xl overflow-hidden hover:border-gold hover:-translate-y-1 transition-all duration-300 no-underline"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex gap-1.5 mb-2 flex-wrap">
                      {post.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-[0.6rem] font-semibold px-2 py-0.5 bg-edge text-muted rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-heading text-base font-bold text-foreground group-hover:text-gold transition-colors line-clamp-2 leading-snug mb-2">
                      {post.title}
                    </h3>
                    <div className="mt-auto text-xs text-muted pt-2 border-t border-edge flex justify-between">
                      <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span>{post.views || 0} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-edge py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Guts N Glory. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
