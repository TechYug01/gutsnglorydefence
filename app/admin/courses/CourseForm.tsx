import { UploadCloud, X } from "lucide-react";
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SUGGESTED_TAGS = [
  "NDA", "CDS", "AFCAT", "SSB", "MNS", "CAPF",
  "Free", "Live Classes", "Test Series", "Ebooks",
  "Beginner", "Advanced", "Crash Course",
];

interface FormState {
  title: string;
  description: string;
  price: string;
  discountPrice: string;
  externalLink: string;
  tags: string[];
  image: string;       // Cloudinary URL after upload
  imagePublicId: string;
  expiryDate: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  price: "",
  discountPrice: "",
  externalLink: "",
  tags: [],
  image: "",
  imagePublicId: "",
  expiryDate: "",
};

interface CourseFormProps {
  initialData?: Partial<FormState> & { _id?: string };
  mode?: "create" | "edit";
}

export default function CourseForm({ initialData, mode = "create" }: CourseFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({ ...EMPTY_FORM, ...initialData });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError("");
  }

  // ── Tags ─────────────────────────────────────────
  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || form.tags.includes(trimmed)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, trimmed] }));
    setTagInput("");
  }

  function removeTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image && !selectedFile) { setError("Please upload a course image."); return; }

    setSaving(true);
    setError("");
    try {
      let finalImage = form.image;
      let finalImagePublicId = form.imagePublicId;

      // Upload image first if a new one is selected
      if (selectedFile) {
        const sigRes = await fetch("/api/courses/upload", { method: "POST" });
        if (!sigRes.ok) throw new Error("Failed to get upload signature");
        const { signature, timestamp, cloudName, apiKey, folder } = await sigRes.json();

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("signature", signature);
        formData.append("timestamp", String(timestamp));
        formData.append("api_key", apiKey);
        formData.append("folder", folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData }
        );
        if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
        const data = await uploadRes.json();

        finalImage = data.secure_url;
        finalImagePublicId = data.public_id;
      }

      const url = mode === "edit" && initialData?._id
        ? `/api/courses/${initialData._id}`
        : "/api/courses";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: finalImage,
          imagePublicId: finalImagePublicId,
          price: Number(form.price || 0),
          discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
          expiryDate: form.expiryDate ? new Date(form.expiryDate).toISOString() : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Save failed");
      }

      router.push("/courses");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7 max-w-2xl">
      {error && (
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* ── Image upload ──────────────────────────── */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Course Image <span className="text-red-400">*</span>
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full h-52 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden ${
            (previewUrl || form.image)
              ? "border-gold/40"
              : "border-edge hover:border-gold/40 bg-surface"
          }`}
        >
          {(previewUrl || form.image) ? (
            <>
              <Image src={previewUrl || form.image} alt="Preview" fill className="object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
                <span className="text-white text-sm font-medium">Click to change</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <UploadCloud size={32} className="text-gold opacity-60" />
              <span className="text-sm text-muted">Click to select image</span>
              <span className="text-xs text-muted/60">JPG, PNG, WebP — max 10MB</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* ── Title ─────────────────────────────────── */}
      <Field label="Course Title" required>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
          placeholder="e.g. NDA Complete Preparation Course 2025"
          className="admin-input"
        />
      </Field>

      {/* ── Description ───────────────────────────── */}
      <Field label="Description" required>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          required
          rows={10}
          placeholder="Brief description of the course content and outcomes…"
          className="admin-input"
        />
      </Field>

      {/* ── Price row ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Price (₹)" required hint="Set 0 for free">
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            required
            placeholder="0"
            className="admin-input"
          />
        </Field>
        <Field label="Discount Price (₹)" hint="Leave blank if no discount">
          <input
            type="number"
            min="0"
            value={form.discountPrice}
            onChange={(e) => setForm((f) => ({ ...f, discountPrice: e.target.value }))}
            placeholder="Optional"
            className="admin-input"
          />
        </Field>
      </div>

      {/* ── External link ─────────────────────────── */}
      <Field label="Enroll / Buy Link" required hint="The URL users will be redirected to on 'Enroll Now'">
        <input
          type="url"
          value={form.externalLink}
          onChange={(e) => setForm((f) => ({ ...f, externalLink: e.target.value }))}
          required
          placeholder="https://…"
          className="admin-input"
        />
      </Field>

      {/* ── Expiry Date ───────────────────────────── */}
      <Field label="Expiry Date" hint="Optional. Course won't be shown after this date">
        <div className="relative cursor-pointer">
          {/* Visual text input showing dd/mm/yyyy */}
          <input
            type="text"
            readOnly
            value={
              form.expiryDate 
                ? (() => {
                    const d = new Date(form.expiryDate);
                    const pad = (n: number) => n.toString().padStart(2, '0');
                    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
                  })()
                : ""
            }
            placeholder="DD/MM/YYYY"
            className="admin-input cursor-pointer relative z-10 bg-transparent pointer-events-none"
          />
          {/* Invisible native date picker on top */}
          <input
            type="date"
            value={form.expiryDate ? new Date(form.expiryDate).toISOString().split('T')[0] : ""}
            onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
            onClick={(e) => {
              try { e.currentTarget.showPicker(); } catch (err) {}
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted z-0">
            <X size={18} />
          </div>
        </div>
      </Field>

      {/* ── Tags ──────────────────────────────────── */}
      <Field label="Tags" hint="Press Enter or click a suggestion">
        <div className="flex flex-wrap gap-2 mb-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-[rgba(200,169,81,0.12)] text-gold border border-[rgba(200,169,81,0.2)]"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-red-400 transition-colors cursor-pointer bg-transparent border-none p-0 leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); }
          }}
          placeholder="Type a tag and press Enter…"
          className="admin-input mb-2"
        />

        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_TAGS.filter((t) => !form.tags.includes(t)).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className="text-xs px-2.5 py-1 rounded-full border border-edge text-muted hover:border-gold hover:text-gold transition-colors cursor-pointer bg-transparent"
            >
              + {tag}
            </button>
          ))}
        </div>
      </Field>

      {/* ── Submit ────────────────────────────────── */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold text-[#1A1A1A] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
          style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-[#1A1A1A] border-t-transparent animate-spin" />
              Saving…
            </>
          ) : (
            mode === "edit" ? "Save Changes" : "Create Course"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-3 rounded-xl text-sm font-medium text-muted bg-edge border-none cursor-pointer hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-foreground flex items-center gap-1">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {hint && <span className="text-xs text-muted -mt-0.5">{hint}</span>}
      {children}
    </div>
  );
}
