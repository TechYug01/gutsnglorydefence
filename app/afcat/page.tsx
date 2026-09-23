import { constructMetadata } from "@/lib/metadata";
import CampaignLandingPage from "@/app/components/CampaignLandingPage";

export const metadata = constructMetadata({
  title: "Best AFCAT Online Coaching 2027 | Guts N Glory Defence",
  description: "Join the best online coaching for AFCAT. Comprehensive AFCAT online preparation, course batches, and live classes to secure your selection.",
});

export default function AfcatPage() {
  return (
    <>
      <CampaignLandingPage examType="AFCAT" />
      {/* Hidden SEO Keywords Block */}
      <div className="sr-only">
        Keywords: afcat online coaching, afcat online preparation, afcat online course, best online coaching for afcat, afcat best online coaching, afcat course online, afcat online coaching free, best afcat online coaching, afcat online classes, afcat online coaching classes, afcat online batch.
      </div>
    </>
  );
}
