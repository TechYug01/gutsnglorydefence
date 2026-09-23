"use client";

import { SignOutButton } from "@clerk/nextjs";
import { AlertTriangle, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card border border-[rgba(255,0,0,0.15)] rounded-2xl p-8 max-w-md w-full text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {/* Warning Icon */}
        <div className="mx-auto w-16 h-16 bg-[rgba(255,0,0,0.1)] rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-[#FF453A]" />
        </div>

        <h1 className="font-heading font-extrabold text-2xl text-foreground mb-3 uppercase tracking-wide">
          Access Denied
        </h1>
        
        <p className="text-muted text-sm mb-8 leading-relaxed">
          You are currently signed into an account that does not have administrative privileges. 
          Please sign out and sign back in with an authorized admin account.
        </p>

        <div className="flex flex-col gap-3">
          <SignOutButton redirectUrl="/sign-in">
            <button className="w-full bg-[#FF453A] hover:bg-[#FF3333] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
              <LogOut size={18} />
              Sign Out Securely
            </button>
          </SignOutButton>

          <a 
            href="/" 
            className="w-full bg-edge hover:bg-[rgba(255,255,255,0.05)] text-muted hover:text-foreground font-semibold py-3 px-4 rounded-xl transition-colors duration-200 text-sm no-underline border border-edge flex items-center justify-center"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
