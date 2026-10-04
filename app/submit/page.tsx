"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";

function SubmitContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("url");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!redirectUrl) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = redirectUrl;
    }
  }, [countdown, redirectUrl]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mb-8 animate-pulse shadow-xl shadow-green-500/10">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4 uppercase tracking-tight">
        Thank You!
      </h1>
      <p className="text-lg md:text-xl text-[#4A4A4A] max-w-lg mb-8 leading-relaxed">
        Your details have been successfully submitted. We are redirecting you to the payment portal to complete your enrollment.
      </p>

      {redirectUrl ? (
        <>
          <div className="bg-white px-8 py-4 rounded-2xl shadow-lg border border-black/5 mb-8">
            <span className="text-3xl font-bold text-gold">{countdown}</span>
            <span className="text-[#7A7A7A] ml-2 font-medium">seconds remaining</span>
          </div>

          <a 
            href={redirectUrl}
            className="flex items-center gap-2 text-gold font-bold hover:text-gold-hover transition-colors group"
          >
            Click here if you are not redirected automatically
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </>
      ) : (
        <a 
          href="/"
          className="px-8 py-4 bg-gold hover:bg-gold-hover text-[#1A1A1A] font-black rounded-xl transition-all shadow-lg hover:shadow-xl"
        >
          Return to Home
        </a>
      )}
    </div>
  );
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-gold border-t-transparent rounded-full" /></div>}>
      <SubmitContent />
    </Suspense>
  );
}
