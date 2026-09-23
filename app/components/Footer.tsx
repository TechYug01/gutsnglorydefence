import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#careers" },
  ];

  const courseLinks = [
    { label: "NDA Course", href: "#nda" },
    { label: "CDS Course", href: "#cds" },
    { label: "AFCAT Course", href: "#afcat" },
    { label: "SSB Interview", href: "#ssb" },
    { label: "Free Resources", href: "#free-courses" },
    { label: "Current Affairs", href: "/current-affairs" },
  ];

  const socialLinks = [
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ),

    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="1" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="12" cy="4" r="0.5" fill="currentColor" />
        </svg>
      ),

    },
    {
      label: "Telegram",
      href: "https://telegram.org",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M14.5 2L1 7.5L5.5 9L12.5 4.5L7 10.5L13 13L14.5 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ),

    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 1L6.5 8.5L1 15H3L7.5 10L11 15H15L9.5 7L14.5 1H12.5L8.5 5.5L5.5 1H1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      ),

    },
  ];

  return (
    <footer className="bg-[var(--bg-footer)] border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12 mb-14">
          {/* Brand column */}
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2.5 mb-5">
              <Image
                src="/gutsnglorylogo.jpeg"
                alt="Guts N Glory Logo"
                width={56}
                height={56}
                quality={95}
                className="rounded-full object-cover w-10 h-10 shadow-[0_0_20px_rgba(200,169,81,0.3)]"
              />
              <div className="flex flex-col items-stretch leading-none w-max mt-0.5">
                <div className="font-heading font-extrabold text-[1rem] text-[#C8A951] tracking-wide text-center">
                  GUTS N GLORY
                </div>
                <div className="font-subheading text-[0.55rem] font-semibold text-[#7A7770] uppercase flex justify-between w-full mt-[1px] px-[1.5px]">
                  {"DEFENCE".split("").map((l, i) => <span key={i}>{l}</span>)}
                </div>
              </div>
            </div>
            <p className="text-[0.85rem] leading-relaxed text-[#7A7770] mb-5">
              Welcome to India&apos;s Premier institution established with the
              sole aim to initiate, enable and empower individuals to grow up to
              be extraordinary professionals.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-[#7A7770] transition-all duration-200 hover:bg-[rgba(200,169,81,0.15)] hover:text-[#C8A951]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-[0.9rem] text-[#F0EDE8] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-[#C8A951]" />
              Quick Links
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A7770] no-underline transition-all duration-200 hover:text-[#C8A951] hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-heading font-bold text-[0.9rem] text-[#F0EDE8] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-[#C8A951]" />
              Courses
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {courseLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A7770] no-underline transition-all duration-200 hover:text-[#C8A951] hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Download */}
          <div>
            <h4 className="font-heading font-bold text-[0.9rem] text-[#F0EDE8] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-[#C8A951]" />
              Legal
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5 mb-6">
              {[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Refund Policy", href: "/refunds" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7A7770] no-underline transition-all duration-200 hover:text-[#C8A951] hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Download badges */}
            <p className="text-[0.7rem] font-semibold text-[#5A5A5A] uppercase tracking-[1.5px] mb-3">
              Download the App
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.eouvpc.ozimnc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl px-3.5 py-2 no-underline transition-all duration-200 hover:border-[rgba(200,169,81,0.3)] hover:shadow-[0_0_15px_rgba(200,169,81,0.1)]"
              >
                <svg width="18" height="20" viewBox="0 0 20 22" fill="none">
                  <path
                    d="M1.57 0.39C1.22 0.75 1 1.33 1 2.07V19.93C1 20.67 1.22 21.25 1.57 21.61L1.65 21.69L11.74 11.6V11.4L1.65 1.31L1.57 0.39Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M15.1 14.97L11.74 11.6V11.4L15.1 8.04L15.2 8.1L19.17 10.38C20.28 11 20.28 12 19.17 12.63L15.2 14.91L15.1 14.97Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M15.2 14.91L11.74 11.5L1.57 21.61C1.99 22.06 2.7 22.11 3.51 21.66L15.2 14.91Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M15.2 8.1L3.51 1.34C2.7 0.89 1.99 0.94 1.57 1.39L11.74 11.5L15.2 8.1Z"
                    fill="#34A853"
                  />
                </svg>
                <div className="leading-tight">
                  <span className="text-[0.5rem] text-[#5A5A5A] block">
                    GET IT ON
                  </span>
                  <span className="text-[0.8rem] text-[#D0CCC5] font-medium">
                    Google Play
                  </span>
                </div>
              </a>

              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl px-3.5 py-2 no-underline transition-all duration-200 hover:border-[rgba(200,169,81,0.3)] hover:shadow-[0_0_15px_rgba(200,169,81,0.1)]"
              >
                <svg width="16" height="20" viewBox="0 0 18 22" fill="#D0CCC5">
                  <path d="M14.94 0C14.06 0.08 13.03 0.63 12.42 1.35C11.87 1.99 11.39 2.96 11.56 3.9C12.53 3.93 13.53 3.36 14.11 2.63C14.66 1.94 15.08 0.97 14.94 0Z" />
                  <path d="M17.78 7.57C17.05 6.65 16.01 6.11 15.03 6.11C13.72 6.11 13.15 6.73 12.14 6.73C11.1 6.73 10.36 6.12 9.22 6.12C8.13 6.12 6.95 6.78 6.21 7.92C5.14 9.59 5.35 12.71 7.13 15.54C7.78 16.57 8.65 17.72 9.79 17.73C10.81 17.74 11.13 17.07 12.42 17.06C13.71 17.05 14 17.74 15.02 17.73C16.16 17.72 17.08 16.44 17.73 15.41C18.19 14.68 18.37 14.31 18.72 13.49C15.52 12.28 15.01 7.73 17.78 7.57Z" />
                </svg>
                <div className="leading-tight">
                  <span className="text-[0.5rem] text-[#5A5A5A] block">
                    Download on the
                  </span>
                  <span className="text-[0.8rem] text-[#D0CCC5] font-medium">
                    App Store
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-6 flex flex-wrap items-center justify-center   gap-3">
          <span className="text-[0.8rem] text-[#5A5A5A]">
            © {new Date().getFullYear()} Guts N Glory Defence. All
            rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
