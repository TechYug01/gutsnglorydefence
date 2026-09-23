"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Search, Sun, Moon, Menu, X, User, Calendar, BookOpen, Bell, Link2, PlaySquare } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { useUser, UserButton } from "@clerk/nextjs";

interface SearchResult {
  _id: string;
  title: string;
  price: number;
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [caOpen, setCaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const pathname = usePathname();

  const moreRef = useRef<HTMLDivElement>(null);
  const caRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (caRef.current && !caRef.current.contains(e.target as Node)) setCaOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Debounced search
  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setSearchResults([]); return; }
    setSearchLoading(true);
    try {
      const res = await fetch(`/api/courses/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSearchResults(data.results ?? []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchQuery(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => doSearch(val), 300);
  }

  // ── Nav item definitions ──────────────────────────
  // Primary items always visible on desktop
  const primaryLinks = [
    { label: "Home", href: "/" },
    { label: "SSB", href: "#ssb" },
    { label: "Paid Courses", href: "/paid-courses" },
    { label: "Free Courses", href: "/free-courses" },
    { label: "Test Series", href: "/test-series", protected: true },
    { label: "Ebooks", href: "/ebooks", protected: true },
  ];

  // These show on wide screens, but move to "More" on medium screens
  const overflowLinks = [
    { label: "Blog", href: "http://blog.localhost:3000", external: true },
  ];

  // Current Affairs dropdown items
  const caLinks = [
    { label: "Daily Current Affairs", href: "/current-affairs", icon: CalendarIcon },
    { label: "Monthly CA Magazine", href: "#monthly-ca", icon: BookIcon },
  ];

  // More dropdown items
  const moreLinks = [
    { label: "Exam Notifications", href: "/exam-notifications", icon: BellIcon, protected: true },
    { label: "Quick Links", href: "#quick-links", icon: LinkIcon },
    { label: "Featured Videos", href: "#featured-videos", icon: VideoIcon },
  ];

  // All nav items for mobile drawer
  const allMobileLinks = [
    ...primaryLinks,
    ...overflowLinks,
  ];

  const isHome = pathname === "/";
  // In light mode, non-home pages have a light background initially, so we need dark text.
  // When scrolled, we always use the theme's text color.
  const needDarkText = theme === "light" && !isHome;
  const navText = (scrolled || mobileOpen || needDarkText) ? "text-secondary" : "text-white/80";
  const navHoverBg = (scrolled || mobileOpen || needDarkText) ? "hover:bg-card-hover" : "hover:bg-white/10";
  const showDropdown = searchFocused && (searchResults.length > 0 || searchLoading);

  const dropdownBtnClass = (open: boolean) =>
    `px-3 py-2 rounded-xl text-sm font-medium border-none cursor-pointer flex items-center gap-1 transition-all duration-200 font-[inherit] whitespace-nowrap hover:text-gold ${
      open ? `text-gold ${navHoverBg.replace("hover:", "")}` : `${navText} bg-transparent ${navHoverBg}`
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[1000] transition-all duration-300 ${
          (scrolled || mobileOpen)
            ? "bg-[var(--bg-navbar)] backdrop-blur-xl border-b border-edge py-2"
            : "border-b border-transparent py-3"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center justify-between gap-3">
          {/* ── Logo ──────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
            <Image
              src="/gutsnglorylogo.jpeg"
              alt="Guts N Glory Logo"
              width={56}
              height={56}
              quality={95}
              className="rounded-full object-cover shadow-[var(--shadow-glow)] w-[40px] h-[40px]"
              priority
            />
            <div className="flex flex-col items-stretch leading-none w-max mt-0.5">
              <span className="font-heading font-extrabold text-[1rem] text-gold tracking-wide text-center">
                GUTS N GLORY
              </span>
              <span
                className={`font-subheading text-[0.55rem] font-semibold uppercase flex justify-between w-full mt-[1px] px-[1.5px] ${
                  (scrolled || mobileOpen || needDarkText) ? "text-muted" : "text-white/50"
                }`}
              >
                {"DEFENCE".split("").map((l, i) => <span key={i}>{l}</span>)}
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ──────────────────────── */}
          <div className="desktop-nav items-center gap-0.5">
            {/* Primary links — always visible */}
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-medium no-underline whitespace-nowrap transition-all duration-200 hover:text-gold ${navText} ${navHoverBg}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Overflow links — hidden on medium screens via CSS */}
            {overflowLinks.map((link: any) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className={`nav-overflow-item px-3 py-2 rounded-xl text-sm font-medium no-underline whitespace-nowrap transition-all duration-200 hover:text-gold ${navText} ${navHoverBg}`}
              >
                {link.label}
              </Link>
            ))}

            {/* ── Current Affairs Dropdown ────────── */}
            <div ref={caRef} className="relative nav-overflow-item">
              <button
                onClick={() => { setCaOpen(!caOpen); setMoreOpen(false); }}
                className={dropdownBtnClass(caOpen)}
              >
                Current Affairs
                <ChevronIcon open={caOpen} />
              </button>
              {caOpen && (
                <div className="animate-fade-in-down absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[var(--bg-navbar)] backdrop-blur-xl border border-edge rounded-2xl p-2 min-w-[220px] shadow-lg z-50">
                  {caLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setCaOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-secondary no-underline transition-all duration-200 hover:text-gold ${navHoverBg}`}
                    >
                      <link.icon />
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── More Dropdown ──────────────────── */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => { setMoreOpen(!moreOpen); setCaOpen(false); }}
                className={dropdownBtnClass(moreOpen)}
              >
                More
                <ChevronIcon open={moreOpen} />
              </button>
              {moreOpen && (
                <div className="animate-fade-in-down absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[var(--bg-navbar)] backdrop-blur-xl border border-edge rounded-2xl p-2 min-w-[220px] shadow-lg z-50">
                  {/* Show overflow items here on medium screens */}
                  <div className="nav-overflow-spillover">
                    {overflowLinks.map((link: any) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-secondary no-underline transition-all duration-200 hover:text-gold ${navHoverBg}`}
                      >
                        <BookIcon />
                        {link.label}
                      </Link>
                    ))}
                    {/* Current Affairs sub-items in spillover */}
                    <div className="px-3.5 pt-2 pb-1 text-[0.65rem] font-semibold text-muted uppercase tracking-[1.5px]">Current Affairs</div>
                    {caLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-secondary no-underline transition-all duration-200 hover:text-gold ${navHoverBg}`}
                      >
                        <link.icon />
                        {link.label}
                      </Link>
                    ))}
                    <div className="h-px bg-edge my-1" />
                  </div>
                  {moreLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-secondary no-underline transition-all duration-200 hover:text-gold ${navHoverBg}`}
                    >
                      <link.icon />
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right Actions ─────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search bar */}
            <div ref={searchRef} className="desktop-search hidden md:flex relative items-center">
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-[0.4rem] transition-all duration-300 w-[160px] focus-within:w-52 ${
                  (scrolled || needDarkText)
                    ? "bg-edge border border-transparent focus-within:bg-card focus-within:border-gold focus-within:shadow-[var(--shadow-glow)]"
                    : "bg-white/10 border border-white/10 focus-within:bg-white/20 focus-within:border-white/30"
                }`}
              >
                <SearchIcon className={(scrolled || mobileOpen || needDarkText) ? "text-muted" : "text-white/50"} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search courses..."
                  className={`bg-transparent border-none outline-none text-[0.8rem] w-full font-[inherit] ${
                    (scrolled || mobileOpen || needDarkText)
                      ? "text-foreground placeholder:text-muted"
                      : "text-white placeholder:text-white/50"
                  }`}
                />
                {searchLoading && (
                  <div className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin shrink-0 opacity-50" />
                )}
              </div>

              {/* Search dropdown */}
              {showDropdown && (
                <div className="absolute top-[calc(100%+8px)] right-0 bg-card border border-edge rounded-2xl overflow-hidden shadow-xl min-w-[260px] z-50">
                  {searchLoading ? (
                    <div className="px-4 py-3 text-sm text-muted">Searching…</div>
                  ) : (
                    searchResults.map((result) => (
                      <Link
                        key={result._id}
                        href={result.price === 0 ? "/free-courses" : "/paid-courses"}
                        onClick={() => { setSearchQuery(""); setSearchFocused(false); setSearchResults([]); }}
                        className="flex items-center justify-between px-4 py-3 hover:bg-card-hover no-underline transition-colors border-b border-edge last:border-b-0"
                      >
                        <span className="text-sm text-foreground font-medium line-clamp-1 flex-1">
                          {result.title}
                        </span>
                        <span className={`text-xs font-bold ml-3 shrink-0 ${result.price === 0 ? "text-[#6ABF40]" : "text-gold"}`}>
                          {result.price === 0 ? "Free" : `₹${result.price}`}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-[36px] h-[36px] rounded-full border border-transparent cursor-pointer flex items-center justify-center transition-all duration-300 shrink-0 hover:bg-gold hover:text-[#1A1A1A] hover:shadow-[var(--shadow-glow)] ${
                (scrolled || mobileOpen || needDarkText)
                  ? "bg-edge text-secondary"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Login / User Button */}
            {!isSignedIn ? (
              <Link
                href="/sign-in"
                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-[0.4rem] rounded-full text-sm font-semibold no-underline transition-all duration-200 shrink-0 ${
                  (scrolled || mobileOpen || needDarkText)
                    ? "bg-gold text-[#1A1A1A] hover:shadow-[var(--shadow-glow)]"
                    : "bg-white/15 text-white border border-white/20 hover:bg-white/25"
                }`}
              >
                <UserIcon />
                Login
              </Link>
            ) : (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-[36px] h-[36px]",
                  },
                }}
              />
            )}

            {/* Mobile Hamburger */}
            <button
              className={`mobile-hamburger cursor-pointer flex items-center justify-center hover:text-gold transition-all duration-200 shrink-0 ${(scrolled || mobileOpen || needDarkText) ? "text-secondary" : "text-white"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ───────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/50"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="animate-slide-in-right absolute top-0 right-0 bottom-0 w-[min(300px,80vw)] bg-card border-l border-edge overflow-y-auto flex flex-col"
            style={{ paddingTop: "72px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile search */}
            <div className="mx-4 mb-3">
              <div className="flex items-center gap-2 bg-surface border border-edge rounded-xl px-3 py-2">
                <SearchIcon className="text-muted" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="bg-transparent border-none outline-none text-[0.8rem] text-foreground w-full font-[inherit] placeholder:text-muted"
                />
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-col px-2">
              {allMobileLinks.map((link: any) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-[0.875rem] font-medium text-foreground no-underline transition-all duration-200 hover:text-gold hover:bg-card-hover"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Current Affairs section */}
            <div className="h-px bg-edge mx-4 my-2" />
            <p className="text-[0.65rem] font-semibold text-muted uppercase tracking-[2px] px-5 py-1">Current Affairs</p>
            <div className="flex flex-col px-2">
              {caLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-[0.875rem] font-medium text-foreground no-underline transition-all duration-200 hover:text-gold hover:bg-card-hover"
                >
                  <link.icon />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* More section */}
            <div className="h-px bg-edge mx-4 my-2" />
            <p className="text-[0.65rem] font-semibold text-muted uppercase tracking-[2px] px-5 py-1">More</p>
            <div className="flex flex-col px-2">
              {moreLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-[0.875rem] font-medium text-foreground no-underline transition-all duration-200 hover:text-gold hover:bg-card-hover"
                >
                  <link.icon />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Spacer to push login to bottom */}
            <div className="flex-1" />

            {/* Mobile login */}
            <div className="border-t border-edge p-3">
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[0.875rem] font-semibold text-inverse no-underline bg-gold transition-all duration-200 hover:opacity-90"
                >
                  <UserIcon />
                  Login / Sign Up
                </Link>
              ) : (
                <div className="px-3 py-2 flex items-center gap-3">
                  <UserButton />
                  <span className="text-sm text-muted">Account</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══ Icons ═══════════════════════════════════════ */

function ChevronIcon({ open }: { open: boolean }) { return <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />; }

function SearchIcon({ className = "" }: { className?: string }) { return <Search size={16} className={`shrink-0 ${className}`} />; }

function SunIcon() { return <Sun size={18} />; }

function MoonIcon() { return <Moon size={18} />; }

function HamburgerIcon() { return <Menu size={18} />; }

function CloseIcon() { return <X size={16} />; }

function UserIcon() { return <User size={15} className="shrink-0" />; }

function CalendarIcon() { return <Calendar size={16} className="text-gold" />; }

function BookIcon() { return <BookOpen size={16} className="text-gold" />; }

function BellIcon() { return <Bell size={16} className="text-gold" />; }

function LinkIcon() { return <Link2 size={16} className="text-gold" />; }

function VideoIcon() { return <PlaySquare size={16} className="text-gold" />; }
