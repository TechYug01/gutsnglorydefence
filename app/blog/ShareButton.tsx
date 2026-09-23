"use client";
import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Guts N Glory`,
          url: window.location.href
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-edge hover:bg-[rgba(200,169,81,0.2)] hover:text-gold transition-colors rounded-xl font-medium text-sm text-foreground"
    >
      <Share2 size={16} />
      Share Blog
    </button>
  );
}
