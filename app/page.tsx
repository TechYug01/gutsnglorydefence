import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({ title: "Guts N Glory Defence — Forge Your Path To Glory" });
import Link from "next/link";
import { BookOpen, CheckCircle2, Play, Users, Trophy, Medal, Brain, Target, LineChart, Shield } from "lucide-react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════
   GUTS N GLORY — LANDING PAGE (Server Component)
   Courses fetched live from MongoDB
   ═══════════════════════════════════════════════════ */

import CourseCard, { Course } from "./components/CourseCard";

async function getFeaturedCourses(): Promise<Course[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/courses?limit=5&sort=popular`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.courses ?? [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const courses = await getFeaturedCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <CoursesSection courses={courses} />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 169, 81, 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[15%] -left-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(74, 138, 38, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(200,169,81,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-[1] max-w-[900px] mx-auto px-6 pt-32 pb-24 text-center">
        <div className="animate-fade-in inline-flex items-center gap-2 bg-[rgba(200,169,81,0.1)] border border-[rgba(200,169,81,0.2)] rounded-full px-5 py-[0.45rem] mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A951] animate-pulse-glow" />
          <span className="text-[0.8rem] font-semibold text-[#C8A951] tracking-[1px] uppercase">
            India&apos;s Premier Defence Institute
          </span>
        </div>

        <h1 className="animate-fade-in-up font-heading font-black leading-[1.1] text-white mb-6 text-[clamp(2.5rem,6vw,4.5rem)]">
          Forge Your Path{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C8A951, #E0C86E, #C8A951)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            To Glory
          </span>
        </h1>

        <p className="animate-fade-in-up stagger-2 opacity-0 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-white/65 max-w-[620px] mx-auto mb-10">
          Expert coaching for NDA, CDS, AFCAT &amp; all defence examinations.
          Join thousands of successful cadets who turned their dream of serving
          the nation into reality.
        </p>

        <div className="animate-fade-in-up stagger-3 opacity-0 flex flex-wrap gap-4 justify-center">
          <Link
            href="/paid-courses"
            className="inline-flex items-center gap-2 font-bold text-base px-8 py-3.5 rounded-full no-underline transition-all duration-300 hover:-translate-y-0.5 text-[#1A1A1A]"
            style={{
              background: "linear-gradient(135deg, #C8A951, #D4B85E)",
              boxShadow: "0 4px 20px rgba(200,169,81,0.3)",
            }}
          >
            Explore Courses
            <CheckCircle2 size={16} className="text-gold" />
          </Link>
        </div>

        <div className="animate-fade-in stagger-5 opacity-0 flex flex-wrap gap-8 justify-center mt-14">
          {[
            "NDA Coaching",
            "CDS Preparation",
            "AFCAT Training",
            "SSB Interview",
          ].map((tag) => (
            <span
              key={tag}
              className="text-[0.8rem] font-medium text-white/40 flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6L5 9L10 3"
                  stroke="#C8A951"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-[0.65rem] text-white/30 tracking-[2px] uppercase">
          Scroll
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect
            x="1"
            y="1"
            width="14"
            height="22"
            rx="7"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="8" r="2" fill="rgba(200,169,81,0.6)">
            <animate
              attributeName="cy"
              values="8;16;8"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </section>
  );
}

/* ─── Stats Bar ──────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: "2000+", label: "Candidates Trained" },
    { value: "15+", label: "Combined Years of Experience" },
    { value: "87%", label: "Selection Rate" },
    { value: "100%", label: "Screen-In Rate" },
  ];

  return (
    <section className="bg-surface border-b border-edge">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1.5">
            <span
              className="font-heading text-4xl font-black"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-gold), var(--accent-secondary-hover))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {stat.value}
            </span>
            <span className="text-[0.85rem] font-medium text-muted uppercase tracking-[1px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Features Section ───────────────────────────── */
function FeaturesSection() {
  const features = [
    {
      icon: <Medal size={32} className="text-gold" />,
      title: "EXPERIENCE THAT COMES FROM THE GROUND",
      desc: "Learn from experienced defence professionals who understand the SSB process beyond books and theory.",
    },
    {
      icon: <Brain size={32} className="text-gold" />,
      title: "PSYCHOLOGY-FIRST APPROACH",
      desc: "Understand how the Psychology Tests, GTO Tasks and Interview actually assess you — and learn how to present your genuine personality effectively.",
    },
    {
      icon: <Target size={32} className="text-gold" />,
      title: "REAL SSB-ORIENTED TRAINING",
      desc: "Practice with structured exercises, realistic situations, mock interviews and GTO activities designed around the actual SSB environment.",
    },
    {
      icon: <Users size={32} className="text-gold" />,
      title: "PERSONALISED MENTORSHIP",
      desc: "Identify your strengths, weaknesses and recurring mistakes with individual feedback that helps you improve—not just practise more.",
    },
    {
      icon: <LineChart size={32} className="text-gold" />,
      title: "PERFORMANCE-BASED FEEDBACK",
      desc: "Know exactly where you stand. Track your performance, understand your mistakes and work systematically on the areas holding you back.",
    },
    {
      icon: <Shield size={32} className="text-gold" />,
      title: "MINDSET, CONFIDENCE & OFFICER-LIKE QUALITIES",
      desc: "SSB is not about acting like an officer. It's about developing the confidence, clarity, responsibility and leadership qualities that come naturally.",
    },
  ];

  return (
    <section id="features" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
            Why Choose Guts N Glory
          </span>
          <h2 className="font-heading font-extrabold text-foreground leading-tight mb-4 text-[clamp(1.75rem,4vw,2.75rem)] uppercase">
            What Makes <span className="text-gold">Guts N Glory</span> Different
          </h2>
          <p className="text-[1.1rem] leading-relaxed text-muted max-w-[700px] mx-auto mt-4">
            We don&apos;t teach you how to &quot;act&quot; like an officer. We help you become one.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-card border border-edge rounded-2xl p-8 transition-all duration-300 cursor-default shadow-sm hover:bg-card-hover hover:border-gold hover:shadow-[var(--shadow-glow)] hover:-translate-y-1"
            >
              <div className="text-3xl mb-5">{f.icon}</div>
              <h3 className="font-heading text-[1.15rem] font-bold text-foreground mb-2.5">
                {f.title}
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-muted">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-bold text-gold uppercase tracking-widest mb-2">
            OUR MISSION IS SIMPLE - TO TURN ASPIRANTS INTO OFFICERS.
          </p>
          <p className="text-md font-medium text-muted uppercase tracking-wider flex items-center justify-center gap-3">
            <span>★</span> YOUR DREAM. OUR COMMITMENT. <span>★</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Courses Section (live from DB) ─────────────── */
function CoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="py-20 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <div>
            <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
              Our Programs
            </span>
            <h2 className="font-heading font-extrabold text-foreground leading-tight text-[clamp(1.75rem,4vw,2.75rem)]">
              Popular <span className="text-gold">Courses</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <Link
              href="/free-courses"
              className="text-sm font-medium text-secondary no-underline hover:text-gold transition-colors"
            >
              Free Courses →
            </Link>
            <Link
              href="/paid-courses"
              className="text-sm font-medium text-secondary no-underline hover:text-gold transition-colors"
            >
              View All →
            </Link>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4 text-gold"><BookOpen size={48} /></div>
            <p className="text-muted">No courses yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}



/* ─── Testimonials ───────────────────────────────── */
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Cadet Arjun Sharma",
      rank: "NDA — 153rd Course",
      text: "Guts N Glory transformed my preparation completely. The structured approach and personal mentoring helped me clear NDA in my first attempt!",
      initials: "AS",
    },
    {
      name: "Lt. Priya Deshmukh",
      rank: "CDS — OTA Chennai",
      text: "The test series were incredibly accurate. Almost 60% of the questions in my actual exam were of similar patterns. Highly recommended!",
      initials: "PD",
    },
    {
      name: "Flt. Lt. Rahul Verma",
      rank: "AFCAT — 2024 Batch",
      text: "From mock interviews to written exam prep, every aspect was covered meticulously. The mentors here truly understand what it takes to get selected.",
      initials: "RV",
    },
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">
            Success Stories
          </span>
          <h2 className="font-heading font-extrabold text-foreground text-[clamp(1.75rem,4vw,2.75rem)]">
            Voices of <span className="text-gold">Victory</span>
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative bg-card border border-edge rounded-2xl p-8 transition-all duration-300 shadow-sm hover:bg-card-hover hover:border-gold hover:shadow-[var(--shadow-glow)] hover:-translate-y-1"
            >
              <p className="text-[0.95rem] leading-relaxed text-secondary mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-[0.85rem] text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-primary), var(--accent-gold))",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[0.9rem] text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-gold font-medium">{t.rank}</div>
                </div>
              </div>
              <div className="absolute top-6 right-6 flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <svg
                    key={j}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="var(--accent-gold)"
                  >
                    <path d="M7 1L8.8 4.6L13 5.2L10 8.1L10.6 12.3L7 10.4L3.4 12.3L4 8.1L1 5.2L5.2 4.6L7 1Z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────── */
function CTASection() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="relative z-[1] max-w-[700px] mx-auto text-center">
        <h2 className="font-heading font-black text-white leading-tight mb-5 text-[clamp(1.75rem,4vw,3rem)]">
          Ready to Serve{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #C8A951, #E0C86E)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Nation?
          </span>
        </h2>
        <p className="text-[1.1rem] leading-relaxed text-white/60 max-w-[520px] mx-auto mb-10">
          Download our app and start your journey towards a glorious career in
          the Indian Armed Forces.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.eouvpc.ozimnc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-6 py-3.5 no-underline transition-all duration-300 hover:bg-white/[0.18] hover:-translate-y-0.5 hover:border-[rgba(200,169,81,0.4)]"
          >
            <Play size={24} className="ml-1 text-black" fill="black" />
            <div className="leading-tight text-left">
              <span className="text-[0.6rem] text-white/50 block">
                GET IT ON
              </span>
              <span className="text-base text-white font-semibold">
                Google Play
              </span>
            </div>
          </a>
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-6 py-3.5 no-underline transition-all duration-300 hover:bg-white/[0.18] hover:-translate-y-0.5 hover:border-[rgba(200,169,81,0.4)]"
          >
            <svg width="22" height="26" viewBox="0 0 18 22" fill="white">
              <path d="M14.94 0C14.06 0.08 13.03 0.63 12.42 1.35C11.87 1.99 11.39 2.96 11.56 3.9C12.53 3.93 13.53 3.36 14.11 2.63C14.66 1.94 15.08 0.97 14.94 0Z" />
              <path d="M17.78 7.57C17.05 6.65 16.01 6.11 15.03 6.11C13.72 6.11 13.15 6.73 12.14 6.73C11.1 6.73 10.36 6.12 9.22 6.12C8.13 6.12 6.95 6.78 6.21 7.92C5.14 9.59 5.35 12.71 7.13 15.54C7.78 16.57 8.65 17.72 9.79 17.73C10.81 17.74 11.13 17.07 12.42 17.06C13.71 17.05 14 17.74 15.02 17.73C16.16 17.72 17.08 16.44 17.73 15.41C18.19 14.68 18.37 14.31 18.72 13.49C15.52 12.28 15.01 7.73 17.78 7.57Z" />
            </svg>
            <div className="leading-tight text-left">
              <span className="text-[0.6rem] text-white/50 block">
                Download on the
              </span>
              <span className="text-base text-white font-semibold">
                App Store
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
