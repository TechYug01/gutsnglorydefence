import type { Metadata } from "next";
import { Outfit, Inter, Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ConditionalLayout from "@/app/components/ConditionalLayout";
import { headers } from "next/headers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const host = headerStore.get("host") || "";
  const isAdminDomain = host.startsWith("admin.");
  const isBlogDomain = host.startsWith("blog.");
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${outfit.variable} ${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body>
        {isBlogDomain ? (
          <ConditionalLayout isBlogDomain={true}>{children}</ConditionalLayout>
        ) : (
          <ClerkProvider afterSignOutUrl="/sign-in">
            <ConditionalLayout isAdminDomain={isAdminDomain} >{children}</ConditionalLayout>
          </ClerkProvider>
        )}
      </body>
    </html>
  );
}
