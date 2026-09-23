import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Guts N Glory Defence Academy",
  description: "Privacy policy explaining how Guts N Glory Defence Academy collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 pt-32 pb-20">
      {/* Header */}
      <div className="mb-12">
        <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
          Legal
        </span>
        <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black text-foreground leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-[0.9rem] text-muted">Last updated: July 2026</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        <LegalSection title="1. Information We Collect">
          We collect personal information that you voluntarily provide when registering for an account, purchasing courses, or contacting us. This may include your name, email address, phone number, payment details, and educational background.
        </LegalSection>

        <LegalSection title="2. How We Use Your Information">
          Your information is used to provide and improve our services, process transactions, send important notifications about your courses, personalize your learning experience, and communicate updates about new courses and features.
        </LegalSection>

        <LegalSection title="3. Data Security">
          We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information. However, no method of electronic transmission or storage is 100% secure.
        </LegalSection>

        <LegalSection title="4. Cookies & Tracking">
          Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings.
        </LegalSection>

        <LegalSection title="5. Third-Party Sharing">
          We do not sell your personal information to third parties. We may share data with trusted service providers (payment processors, analytics services) who assist us in operating our platform, subject to confidentiality agreements.
        </LegalSection>

        <LegalSection title="6. Data Retention">
          We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data by contacting our support team.
        </LegalSection>

        <LegalSection title="7. Your Rights">
          You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, contact us at privacy@gutsnglory.in.
        </LegalSection>

        <LegalSection title="8. Children&apos;s Privacy">
          Our services are intended for users aged 16 and above. We do not knowingly collect personal information from children under 16. If we become aware of such collection, we will promptly delete the data.
        </LegalSection>

        <LegalSection title="9. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or a prominent notice on our platform. Continued use after changes constitutes acceptance.
        </LegalSection>

        <LegalSection title="10. Contact Us">
          For privacy-related inquiries, please contact our Data Protection Officer at privacy@gutsnglory.in or write to us at our registered office address.
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
