import { constructMetadata } from "@/lib/metadata";
import CampaignLandingPage from "@/app/components/CampaignLandingPage";

export const metadata = constructMetadata({
  title: "Best CDS Online Coaching 2027 | Guts N Glory Defence",
  description: "Join the best online coaching for CDS. Comprehensive CDS online preparation, course batches, and live classes to secure your selection.",
});

export default function CdsPage() {
  return (
    <>
      <CampaignLandingPage examType="CDS" />
      {/* Hidden SEO Keywords Block */}
      <div className="sr-only">
        Keywords: cds online coaching, cds online preparation, cds online course, best online coaching for cds, cds best online coaching, cds course online, cds online coaching free, best cds online coaching, cds online classes, cds online coaching classes, cds online batch.
      </div>
    </>
  );
}
