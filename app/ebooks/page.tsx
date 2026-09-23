import { Folder, DownloadCloud } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({ title: "Premium Ebooks | Guts N Glory Defence" });
import { getEbooks } from "@/lib/gdrive";

// Revalidate this page every hour (3600 seconds) so new PDFs show up automatically without hitting GDrive API limits
// Revalidate this page every hour (3600 seconds) so new PDFs show up automatically without hitting GDrive API limits
export const revalidate = 3600;

export default async function EbooksPage() {
  const files = await getEbooks();

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-[10%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 169, 81, 0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
            Library
          </span>
          <h1 className="font-heading font-extrabold text-[clamp(2rem,5vw,3.5rem)] text-foreground mb-4 uppercase">
            Study <span className="text-gold">Materials</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Stay updated with the latest happenings. Read our daily exclusive ebooks for your defence exam preparation.
          </p>
        </div>

        {files.length === 0 ? (
          <div className="bg-surface border border-edge rounded-2xl p-12 text-center shadow-lg">
            <div className="w-16 h-16 bg-[rgba(200,169,81,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Folder className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">No Ebooks found yet</h3>
            <p className="text-muted">
              We haven't uploaded any ebooks. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {files.map((file) => {
              const dateObj = new Date(file.createdTime);
              const dateStr = dateObj.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              const title = file.name.replace(/\.pdf$/i, "");

              return (
                <a
                  key={file.id}
                  href={file.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-card border border-edge rounded-2xl p-6 transition-all duration-300 hover:bg-card-hover hover:border-gold hover:-translate-y-1 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(255,0,0,0.1)] flex items-center justify-center shrink-0 border border-[rgba(255,0,0,0.15)]">
                      <DownloadCloud className="w-6 h-6 text-[#FF453A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-foreground text-lg mb-1 truncate group-hover:text-gold transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-muted font-medium mb-3">
                        {dateStr}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold tracking-wide uppercase">
                        Read PDF
                        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
