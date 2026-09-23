import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Guts N Glory Defence Academy",
  description: "Terms and conditions governing the use of Guts N Glory Defence Academy's website and services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
          Legal
        </span>
        <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black text-foreground leading-tight mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-[0.9rem] text-muted">Last updated: July 2026</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        <LegalSection title="1. Acceptance of Terms">
          By accessing and using the Guts N Glory Defence Academy website and mobile application, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
        </LegalSection>

        <LegalSection title="2. Description of Services">
          Guts N Glory Defence Academy provides online educational services including but not limited to video courses, live classes, test series, ebooks, and study materials aimed at preparing aspirants for defence examinations such as NDA, CDS, AFCAT, and SSB interviews.
        </LegalSection>

        <LegalSection title="3. User Accounts">
          To access certain features, you must register and maintain an active account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
        </LegalSection>

        <LegalSection title="4. Course Access & Licensing">
          Upon purchasing a course, you are granted a non-exclusive, non-transferable, limited license to access the course content for the duration specified. You may not share, redistribute, resell, or publicly display any course content without prior written consent.
        </LegalSection>

        <LegalSection title="5. Payment Terms">
          All prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise. Payments are processed securely through our authorized payment gateway partners. We reserve the right to modify pricing at any time.
        </LegalSection>

        <LegalSection title="6. Intellectual Property">
          All content, trademarks, logos, and materials provided through our platform are the intellectual property of Guts N Glory Defence Academy. Unauthorized reproduction or distribution is strictly prohibited and may result in legal action.
        </LegalSection>

        <LegalSection title="7. Limitation of Liability">
          While we strive to provide accurate and up-to-date content, Guts N Glory Defence Academy does not guarantee specific examination results. Our liability is limited to the amount paid for the relevant service.
        </LegalSection>

        <LegalSection title="8. Governing Law">
          These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
        </LegalSection>

        <LegalSection title="9. Contact Information">
          For any questions regarding these Terms &amp; Conditions, please contact us at legal@gutsnglory.in or through our official support channels.
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
