"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/app/context/ThemeContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ConditionalLayout({ 
  children, 
  isAdminDomain = false, 
  isBlogDomain = false,
  
}: { 
  children: React.ReactNode, 
  isAdminDomain?: boolean, 
  isBlogDomain?: boolean,
   
}) {
  const pathname = usePathname();
  const isAdmin = isAdminDomain || pathname?.startsWith("/admin");
  const isBlog = isBlogDomain || pathname?.startsWith("/blog");
  const isCampaign = pathname?.startsWith("/cds") || pathname?.startsWith("/afcat");

  if (isAdmin) {
    return <>{children}</>;
  }
  
  if (isBlog || isCampaign) {
    return (
      <ThemeProvider>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </ThemeProvider>
    );
  }

  // Public site: full layout
  return (
    <ThemeProvider>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
