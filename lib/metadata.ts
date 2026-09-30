import type { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

export function constructMetadata({
  title = "Guts N Glory Defence — Forge Your Path To Glory",
  description = "Premier defence coaching for NDA, CDS, AFCAT & all defence examinations. Expert instructors, live classes, comprehensive test series, and proven results.",
  image = "/gutsnglorylogo.jpeg",
  noindex = false,
}: SEOProps = {}): Metadata {
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.gutsnglorydefence.in",
    ),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@gutsnglory",
    },
    ...(noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
