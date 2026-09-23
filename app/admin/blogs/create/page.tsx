"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import "react-quill-new/dist/quill.snow.css";
import "katex/dist/katex.min.css";

// Need to dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const PREDEFINED_TAGS = [
  "NDA", "CDS", "AFCAT", "SSB", "Motivation",
  "Current Affairs", "Mathematics", "English", "General Knowledge", "Physics", "Strategy"
];

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
};

const formats = [
  "header", "font",
  "bold", "italic", "underline", "strike", "blockquote",
  "color", "background",
  "list",
  "link", "image", "video", "formula",
];

export default function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    sendPush: true,
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // KaTeX needs to be in window for Quill's formula module to work
  if (typeof window !== "undefined") {
    window.katex = require("katex");
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content || formData.content === "<p><br></p>") {
      alert("Please enter some content for the blog post.");
      return;
    }
    setLoading(true);
    
    try {
      let coverImage = "";
      if (imageFile) {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "gutsnglory_courses"); 
        
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: data,
        });
        const uploadData = await res.json();
        coverImage = uploadData.secure_url;
      }

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          coverImage,
          tags: selectedTags,
        }),
      });

      if (res.ok) {
        window.location.href = "/blogs";
      } else {
        alert("Failed to create blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Create Blog</h1>
            <p className="text-sm text-muted">Write a new article using the Rich Text Editor</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-edge rounded-2xl p-6 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                required
                type="text"
                className="w-full bg-background border border-edge rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') });
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">URL Slug</label>
                <input
                  required
                  type="text"
                  className="w-full bg-background border border-edge rounded-xl px-4 py-3 text-sm text-muted"
                  value={formData.slug}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Cover Image</label>
                <input
                  required
                  type="file"
                  accept="image/*"
                  className="w-full bg-background border border-edge rounded-xl px-4 py-3 text-sm"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Select Tags</label>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_TAGS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 border ${
                      selectedTags.includes(tag)
                        ? "bg-[rgba(200,169,81,0.2)] border-gold text-gold"
                        : "bg-edge border-transparent text-secondary hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Content</label>
              <div className="bg-white text-black rounded-xl overflow-hidden border border-edge">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={modules}
                  formats={formats}
                  className="h-96"
                />
              </div>
              <style jsx global>{`
                .ql-toolbar { border: none !important; border-bottom: 1px solid #ccc !important; }
                .ql-container { border: none !important; }
                .ql-editor { min-height: 20rem; font-family: inherit; font-size: 1.1rem; }
              `}</style>
            </div>

            <div className="flex items-center gap-3 py-2 mt-4">
              <input
                type="checkbox"
                id="sendPush"
                checked={formData.sendPush}
                onChange={(e) => setFormData({ ...formData, sendPush: e.target.checked })}
                className="w-5 h-5 accent-gold"
              />
              <label htmlFor="sendPush" className="text-sm font-medium">
                Send Browser Push Notification to Subscribers
              </label>
            </div>

            <div className="border-t border-edge pt-6 mt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-[#1A1A1A] disabled:opacity-50 transition-all"
                style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
