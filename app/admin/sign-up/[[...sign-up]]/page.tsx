"use client";
import { ShieldAlert } from "lucide-react";

import { useEffect } from "react";

import Link from "next/link";

export default function AdminSignUpRestrictedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card border border-[rgba(255,0,0,0.15)] rounded-2xl p-8 max-w-md w-full text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {/* Warning Icon */}
        <div className="mx-auto w-16 h-16 bg-[rgba(255,0,0,0.1)] rounded-full flex items-center justify-center mb-6">
          <ShieldAlert size={32} className="text-[#FF453A]" />
        </div>

        <h1 className="font-heading font-extrabold text-2xl text-foreground mb-3 uppercase tracking-wide">
          Access Denied
        </h1>
        
        <p className="text-muted text-sm mb-8 leading-relaxed">
          Public registration is disabled for the admin panel. You do not have access to create an administrative account.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            href="/sign-in"
            className="w-full bg-[#C8A951] hover:bg-[#D4B96A] text-[#1A1A1A] font-bold py-3 px-4 rounded-xl transition-colors duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            Sign In Again
          </Link>
        </div>
      </div>
    </div>
  );
}
