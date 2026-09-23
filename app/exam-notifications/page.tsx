import { BellRing } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({ title: "Exam Notifications | Guts N Glory Defence" });
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export default async function ExamNotificationsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 pb-12 px-6 text-center bg-surface border-b border-edge">
        <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
          Stay Updated
        </span>
        <h1 className="font-heading font-black text-foreground leading-tight mb-4 text-3xl md:text-5xl uppercase tracking-tighter">
          Exam <span className="text-gold">Notifications</span>
        </h1>
        <p className="text-[1rem] text-muted max-w-[480px] mx-auto">
          Never miss an exam date. Get the latest notifications for NDA, CDS, AFCAT, CAPF, and more.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-card border border-edge rounded-2xl p-12">
          <div className="flex justify-center mb-6 text-gold"><BellRing size={56} /></div>
          <h2 className="font-heading text-xl font-bold text-foreground mb-3">Coming Soon</h2>
          <p className="text-muted text-sm max-w-md mx-auto">
            We&apos;re building a comprehensive exam notification system with important dates,
            eligibility criteria, and application deadlines — all in one dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
