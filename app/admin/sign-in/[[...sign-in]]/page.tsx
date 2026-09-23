"use client";

import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  const isDark = true; // Admin panel is always dark

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 bg-background transition-colors duration-300">
      {/* Logo / branding */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gutsnglorylogo.jpeg"
            alt="Logo"
            className={`w-12 h-12 rounded-full object-cover ${
              isDark ? "shadow-[0_0_20px_rgba(200,169,81,0.4)]" : "shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
            }`}
          />
          <div className="flex flex-col items-center">
            <div className="font-heading font-extrabold text-lg tracking-wide text-gold">
              GUTS N GLORY
            </div>
            <div className="font-subheading text-[0.6rem] font-semibold uppercase text-muted flex justify-between w-full mt-[1px] px-[1.5px]">
              {"ADMIN PANEL".split("").map((l, i) => <span key={i}>{l === " " ? "\u00A0" : l}</span>)}
            </div>
          </div>
        </div>
      </div>

      <SignIn
        routing="hash"
        fallbackRedirectUrl="/"
        signUpUrl="/sign-up"
        appearance={{
          variables: {
            colorPrimary: "#C8A951",
            colorBackground: isDark ? "#1A1E16" : "#FFFFFF",
            colorNeutral: isDark ? "#F0EDE8" : "#1A1A1A",
            borderRadius: "12px",
            fontFamily: "'Inter', 'Outfit', sans-serif",
          },
          elements: {
            card: {
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
              boxShadow: isDark ? "0 8px 30px rgba(0,0,0,0.5)" : "0 8px 30px rgba(0,0,0,0.05)",
            },
            headerTitle: { color: isDark ? "#F0EDE8" : "#1A1A1A" },
            headerSubtitle: { color: isDark ? "#B8B4AC" : "#4A4A4A" },
            socialButtonsBlockButton: {
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
              color: isDark ? "#F0EDE8" : "#1A1A1A",
              backgroundColor: isDark ? "#141812" : "#F7F5F2",
            },
            socialButtonsBlockButtonText: { color: isDark ? "#F0EDE8" : "#1A1A1A" },
            dividerLine: { backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" },
            dividerText: { color: isDark ? "#7A7770" : "#7A7A7A" },
            formFieldLabel: { color: isDark ? "#B8B4AC" : "#4A4A4A" },
            formFieldInput: {
              backgroundColor: isDark ? "#141812" : "#FFFFFF",
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.15)",
              color: isDark ? "#F0EDE8" : "#1A1A1A",
            },
            footerActionText: { color: isDark ? "#B8B4AC" : "#4A4A4A" },
            footerActionLink: { color: "#C8A951" },
            formButtonPrimary: {
              backgroundColor: "#C8A951",
              color: "#1A1A1A",
              fontWeight: "700",
            },
          },
        }}
      />
    </div>
  );
}
