import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — Guts N Glory Defence Academy",
  description: "Refund and cancellation policy for courses and services purchased from Guts N Glory Defence Academy.",
};

export default function RefundsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
          Legal
        </span>
        <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black text-foreground leading-tight mb-4">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="text-[0.9rem] text-muted">Last updated: July 2026</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        <LegalSection title="1. Refund Eligibility">
          You may request a refund within 7 days of purchasing a course, provided you have not accessed more than 20% of the course content. Refund requests made after this period or after significant content consumption will not be entertained.
        </LegalSection>

        <LegalSection title="2. How to Request a Refund">
          To initiate a refund, email us at refunds@gutsnglory.in with your order ID, registered email address, and reason for the refund. Our team will review your request and respond within 3–5 business days.
        </LegalSection>

        <LegalSection title="3. Refund Processing">
          Approved refunds will be processed within 7–10 business days. The refund will be credited to the original payment method used during purchase. Bank processing times may vary.
        </LegalSection>

        <LegalSection title="4. Non-Refundable Items">
          The following are non-refundable: test series once activated, ebooks after download, live class sessions already attended, and any promotional or discounted purchases unless otherwise stated.
        </LegalSection>

        <LegalSection title="5. Course Cancellation by Us">
          In the rare event that we cancel a course, all enrolled students will receive a full refund or the option to transfer to an equivalent course. We will notify affected students at least 7 days in advance.
        </LegalSection>

        <LegalSection title="6. Subscription Cancellation">
          If you are on a subscription plan, you may cancel at any time through your account settings. Cancellation takes effect at the end of the current billing cycle. No partial refunds are given for unused periods.
        </LegalSection>

        <LegalSection title="7. Technical Issues">
          If you experience persistent technical issues that prevent you from accessing purchased content, and our support team is unable to resolve them within a reasonable timeframe, you may be eligible for a full or partial refund at our discretion.
        </LegalSection>

        <LegalSection title="8. Disputes">
          If you are unsatisfied with the refund decision, you may escalate the matter by writing to grievance@gutsnglory.in. We aim to resolve all disputes amicably within 15 business days.
        </LegalSection>

        <LegalSection title="9. Contact Information">
          For all refund and cancellation inquiries, reach out to us at refunds@gutsnglory.in or call our helpline during business hours (Mon–Sat, 9 AM – 6 PM IST).
        </LegalSection>
      </div>
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-foreground mb-3">{title}</h2>
      <p className="text-[0.95rem] leading-[1.8] text-secondary">{children}</p>
    </div>
  );
}
