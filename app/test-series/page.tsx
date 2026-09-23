import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({ title: "Test Series | Guts N Glory Defence" });
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export default async function TestSeriesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 pb-12 px-6 text-center bg-surface border-b border-edge">
        <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
          Mock Tests
        </span>
        <h1 className="font-heading font-black text-foreground leading-tight mb-4 text-[clamp(2rem,4vw,3rem)]">
          Test <span className="text-gold">Series</span>
        </h1>
        <p className="text-[1rem] text-muted max-w-[480px] mx-auto">
          Comprehensive mock tests patterned on actual defence exams with detailed analytics and performance tracking.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-card border border-edge rounded-2xl p-12">
          <div className="text-5xl mb-6">🎯</div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">Coming Soon</h2>
          <p className="text-muted text-sm max-w-md mx-auto">
            We&apos;re preparing comprehensive test series for NDA, CDS, AFCAT, and SSB.
            Stay tuned for timed practice tests with instant scoring and performance comparison.
          </p>
        </div>
      </div>
    </div>
  );
}
