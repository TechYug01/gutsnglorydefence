import { constructMetadata } from "@/lib/metadata";
import CampaignLandingPage from "@/app/components/CampaignLandingPage";

export const metadata = constructMetadata({
  title: "Best CDS Online Coaching 2027 | Guts N Glory Defence",
  description:
    "Join the best online coaching for CDS. Comprehensive CDS online preparation, course batches, and live classes to secure your selection.",
  noindex: true,
});

export default function CdsPage() {
  return (
    <>
      <CampaignLandingPage examType="CDS" />
      {/* Hidden SEO Keywords Block */}
      <div className="sr-only">
        Keywords: cds exam online coaching, cds course online, cds online
        course, best online coaching for cds, cds best online coaching, cds
        online classes, cds online coaching fees, best online platform for cds
        preparation, cds exam preparation online, cds classes online, best
        online coaching for cds ota, best platform for cds preparation, best
        online coaching for cds exam, best coaching for cds online
      </div>
    </>
  );
}
