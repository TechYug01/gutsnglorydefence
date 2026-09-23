"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCourseButton({ id, title }: { id: string; title: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete course.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs font-semibold px-3 py-1.5 rounded-lg text-red-400 border border-red-400/20 bg-red-400/5 hover:bg-red-400/15 transition-colors disabled:opacity-50 cursor-pointer"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
