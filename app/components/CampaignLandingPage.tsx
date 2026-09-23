"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  CheckCircle2,
  Users,
  Target,
  Clock,
  MessageCircle,
  ChevronDown,
  Award,
  PlayCircle,
  TrendingUp,
  Shield,
  Star,
  Menu,
  X,
  ArrowRight,
  MonitorPlay,
  ClipboardList,
  BookMarked,
  BrainCircuit,
  MessageSquare,
  BarChart,
  CalendarDays,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- DATA ---

const getFaqData = (examType: "AFCAT" | "CDS") => [
  {
    question: `What is ${examType} 1 2027?`,
    answer: `${examType} 1 2027 refers to the first ${examType === "AFCAT" ? "Air Force Common Admission Test" : "Combined Defence Services Examination"} cycle of 2027. Candidates should check the official notification for the applicable eligibility criteria, branches, vacancies, dates and selection process.`,
  },
  {
    question: `When should I start preparing for ${examType} 1 2027?`,
    answer:
      "Candidates can begin with fundamentals, gradually move to topic-wise practice and then increase mock-test and revision frequency closer to the examination.",
  },
  {
    question: "Is this course for beginners?",
    answer:
      "Yes, our courses are structured from the ground up. We start with fundamental concepts and progressively move towards advanced, exam-level problem solving, making it perfect for both beginners and repeaters.",
  },
  {
    question: "Are classes live or recorded?",
    answer:
      "The course includes a hybrid of both. You will get access to daily live interactive classes, along with high-quality recorded lectures for flexible revision anytime.",
  },
  {
    question: "Will I get study material?",
    answer:
      "Absolutely. Comprehensive topic-wise notes, PDF summaries, and previous-year question compilations are provided for all subjects in the syllabus.",
  },
  {
    question: "Are mock tests included?",
    answer:
      "Yes, the program includes full-length mock tests designed strictly according to the latest examination pattern, along with detailed performance analytics.",
  },
  {
    question: "Is doubt support available?",
    answer:
      "Yes, we have dedicated doubt-clearing sessions and community groups where you can interact directly with mentors and peers to resolve any queries.",
  },
  {
    question: `Can I prepare for ${examType} 1 2027?`,
    answer:
      "There is a significant overlap in subjects like English, General Knowledge, and Basic Math,  You can prepare together if you plan your schedule to cover the unique portions of both.",
  },
];

const WHY_US_DATA = [
  {
    title: "01 — Structured Preparation",
    desc: "Follow a planned preparation journey instead of studying randomly.",
    icon: <CalendarDays className="w-6 h-6" />,
  },
  {
    title: "02 — Exam-Focused Learning",
    desc: "Lessons and practice are aligned with the relevant examination syllabus and question patterns.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    title: "03 — Complete Subject Coverage",
    desc: "Cover the subjects required for your chosen examination in one structured program.",
    icon: <BookMarked className="w-6 h-6" />,
  },
  {
    title: "04 — Practice & Mock Tests",
    desc: "Regular practice and mock tests help candidates measure progress and identify areas requiring more work.",
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    title: "05 — Previous-Year Questions",
    desc: "Use previous-year questions to understand the type and level of questions asked in the examination.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "06 — Expert Guidance",
    desc: "Learn through structured guidance from experienced educators and defence-exam mentors.",
    icon: <Users className="w-6 h-6" />,
  },
];

const WHAT_YOU_GET = [
  { title: "Live Classes", icon: <MonitorPlay className="w-6 h-6" /> },
  { title: "Recorded Lectures", icon: <Video className="w-6 h-6" /> },
  { title: "Study Material", icon: <BookOpen className="w-6 h-6" /> },
  { title: "Practice Questions", icon: <BrainCircuit className="w-6 h-6" /> },
  { title: "Previous-Year Papers", icon: <FileText className="w-6 h-6" /> },
  { title: "Mock Tests", icon: <ClipboardList className="w-6 h-6" /> },
  { title: "Doubt Sessions", icon: <MessageSquare className="w-6 h-6" /> },
  { title: "Performance Tracking", icon: <BarChart className="w-6 h-6" /> },
  { title: "Exam Strategy", icon: <Target className="w-6 h-6" /> },
];

const TESTIMONIALS = [
  {
    name: "Rajat Sharma",
    exam: "CDS 1",
    batch: "2024 Batch",
    text: "The structured approach really helped me focus on what matters. The mock tests were very close to the actual exam level. Highly recommend to any serious aspirant.",
  },
  {
    name: "Priya Singh",
    exam: "AFCAT 1",
    batch: "2024 Batch",
    text: "The reasoning and military aptitude modules are fantastic. Faculty support is amazing, and my doubts were cleared promptly. Cleared my written exam in the first attempt!",
  },
  {
    name: "Amit Kumar",
    exam: "CDS & AFCAT",
    batch: "2023 Batch",
    text: "Guts N Glory gave me the exact strategy I needed. The previous year question breakdowns helped me understand the UPSC pattern deeply. Truly the best guidance.",
  },
];

const FACULTY = [
  {
    name: "Vikram Singh",
    subject: "General Studies & Strategy",
    bio: "Ex-Defence personnel with 8+ years of teaching experience. Mastered the art of decoding UPSC GS papers.",
    stats: "8+ Yrs Exp | GS Expert | 1000+ Classes",
  },
  {
    name: "Neha Sharma",
    subject: "English Comprehension",
    bio: "Specialist in English grammar and vocabulary for defence exams. Known for simplifying complex rules.",
    stats: "5+ Yrs Exp | English Expert | 800+ Classes",
  },
  {
    name: "Rahul Desai",
    subject: "Mathematics & Aptitude",
    bio: "Math wizard who simplifies arithmetic and advanced math with quick, time-saving techniques.",
    stats: "7+ Yrs Exp | Math Expert | 1200+ Classes",
  },
];

// --- COMPONENTS ---


function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      animate(count, to, { duration });
    }
  }, [count, isInView, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    {subtitle && (
      <span className="text-gold font-semibold tracking-wider uppercase text-sm mb-3 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter text-foreground mb-6">{title}</h2>
    <div className="w-24 h-1.5 bg-gold mx-auto rounded-full" />
  </motion.div>
);

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gold/20 rounded-2xl mb-4 overflow-hidden bg-surface/50 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none"
      >
        <span className="font-semibold text-base md:text-lg text-foreground pr-8">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gold transition-transform duration-300 flex-shrink-0",
            isOpen && "transform rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-muted leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CampaignLandingPageProps {
  examType: "AFCAT" | "CDS";
}

function LeadForm({ defaultCourse }: { defaultCourse: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      course: formData.get("course"),
    };

    try {
      const res = await fetch("/api/campaign-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 relative z-10">
        <div className="w-20 h-20 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted">
          Your details have been submitted. Our counsellor will contact you
          shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-8 text-gold underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted ml-1">
            Full Name
          </label>
          <input
            required
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full bg-background border border-gold/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-muted ml-1">
            Email Address
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="example@example.com"
            className="w-full bg-background border border-gold/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-muted ml-1">
          Mobile Number
        </label>
        <input
          required
          type="tel"
          name="mobile"
          placeholder="+91-9876543210"
          className="w-full bg-background border border-gold/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-muted ml-1">
          Select Course
        </label>
        <select
          required
          name="course"
          defaultValue={defaultCourse}
          className="w-full bg-background border border-gold/20 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-gold transition-colors appearance-none"
        >
          <option value="CDS 1 2027">CDS 1 2027</option>
          <option value="AFCAT 1 2027">AFCAT 1 2027</option>
        </select>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full px-8 py-4 mt-4 rounded-xl font-black text-black transition-all bg-gold hover:bg-gold-hover shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Reserve Your Seat"}
      </button>
    </form>
  );
}

export default function CampaignLandingPage({
  examType,
}: CampaignLandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappMsg = `Hi Guts N Glory Defence, I am interested in the ${examType} 1 2027 course. Please share the syllabus, batch details, fees and enrollment process.`;
  const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMsg)}`; // Replace with actual number

  return (
    <div className="min-h-screen bg-card selection:bg-yellow-500/30 font-sans text-[#F0EDE8]">
      {/* HEADER */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
          (isScrolled || mobileMenuOpen)
            ? "bg-[var(--bg-navbar)] backdrop-blur-xl border-gold/20 shadow-sm py-4"
            : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src="/gutsnglorylogo.jpeg"
              alt="Guts N Glory Defence"
              width={40}
              height={40}
              quality={95}
              unoptimized
              priority
              className="rounded-full object-cover shadow-sm"
            />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Guts N Glory{" "}
              <span className="text-gold dark:text-yellow-500">
                Defence
              </span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-700 dark:text-muted">
            <a
              href="#courses"
              className="hover:text-gold-hover transition-colors"
            >
              Courses
            </a>
            <a
              href="#why-us"
              className="hover:text-gold-hover transition-colors"
            >
              Why Us
            </a>
            <a
              href="#faculty"
              className="hover:text-gold-hover transition-colors"
            >
              Faculty
            </a>
            <a
              href="#testimonials"
              className="hover:text-gold-hover transition-colors"
            >
              Testimonials
            </a>
            <a href="#faq" className="hover:text-gold-hover transition-colors">
              FAQs
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#enroll-form"
              className="px-6 py-2.5 rounded-full font-semibold text-sm bg-gold hover:bg-gold-hover text-foreground transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] active:scale-95"
            >
              ENROL NOW
            </a>
          </div>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        
        {/* Mobile Menu Slider */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[min(300px,80vw)] bg-card z-[70] shadow-2xl flex flex-col border-l border-edge lg:hidden overflow-y-auto"
              >
                {/* Header with close */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-edge">
                  <span className="text-sm font-bold text-gold uppercase tracking-[2px]">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-muted hover:text-gold hover:bg-card-hover transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex flex-col gap-1 px-3 py-4">
                  {[
                    { label: "Courses", href: "#courses" },
                    { label: "Why Us", href: "#why-us" },
                    { label: "Faculty", href: "#faculty" },
                    { label: "Testimonials", href: "#testimonials" },
                    { label: "FAQs", href: "#faq" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 rounded-xl text-[0.9rem] font-medium text-foreground no-underline transition-all duration-200 hover:text-gold hover:bg-card-hover hover:pl-5"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* CTA */}
                <div className="p-4 border-t border-edge">
                  <a
                    href="#enroll-form"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-inverse no-underline bg-gold shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-200 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] active:scale-[0.98]"
                  >
                    ENROL NOW <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-gold/10/10 dark:border-white/10 backdrop-blur-md mb-8 text-sm font-semibold text-gold"
          >
            <Shield className="w-4 h-4" />
            <span>{examType} 1 2027 Preparation Courses</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Your 2027 Defence Exam <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
              Preparation Starts Now.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Prepare systematically for {examType} 1 2027 with structured courses
            designed around the written examination syllabus, concept building,
            practice, mock tests and exam-focused preparation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#courses"
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-foreground bg-gold hover:bg-gold-hover transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] active:scale-95 flex items-center justify-center gap-2"
            >
              Explore Courses <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-foreground bg-surface hover:bg-card-hover hover:bg-card-hover transition-all active:scale-95 flex items-center justify-center gap-2 border border-transparent border-edge"
            >
              <MessageCircle className="w-5 h-5" /> Talk to a Mentor
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-gold/20 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted dark:text-muted"
          >
            <span>CDS 1 2027</span>
            <span className="hidden sm:block">•</span>
            <span>{examType} 1 2027</span>
            <span className="hidden sm:block">•</span>
            <span>Online Classes</span>
            <span className="hidden sm:block">•</span>
            <span>Mock Tests</span>
            <span className="hidden sm:block">•</span>
            <span>Practice</span>
            <span className="hidden sm:block">•</span>
            <span>Exam Strategy</span>
          </motion.div>
        </div>
      </section>

      {/* BATCH COUNTDOWN */}
      <section className="py-8 bg-surface border-y border-gold/30">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-foreground/20 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-foreground font-bold tracking-wider text-sm mb-1 uppercase">
                Next Batch Starts Soon
              </h3>
              <p className="text-secondary text-sm md:text-base font-medium">{examType} 1 2027</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-foreground/20" />
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-foreground font-semibold text-lg">
              Limited Batch Seats
            </span>
            <a
              href="#enroll-form"
              className="px-6 py-2 bg-gold text-black font-black rounded-full hover:bg-gold-hover transition-all shadow-[0_0_15px_rgba(250,204,21,0.3)]"
            >
              Reserve Your Seat &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR COURSE */}
      <section id="courses" className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title={`Complete ${examType} 1 2027 Course`} />

          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {examType === "CDS" && (
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-surface rounded-3xl border border-gold/20 p-5 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all flex flex-col"
              >
                <div className="mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold font-bold text-sm mb-4 inline-block">
                    UPSC EXAM
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    CDS 1 2027
                    <br />
                    Complete Preparation
                  </h3>
                  <p className="text-muted">
                    Prepare for UPSC CDS 1 2027 with structured, exam-focused
                    preparation.
                  </p>
                </div>

                <div className="space-y-6 flex-grow">
                  <div>
                    <h4 className="font-bold text-foreground border-b border-gold/20 pb-2 mb-3">
                      What the course covers:
                    </h4>
                    <ul className="space-y-4">
                      <li>
                        <span className="font-semibold text-gold block mb-1">
                          English
                        </span>
                        <span className="text-sm text-muted">
                          Grammar, Vocabulary, Reading Comprehension, Sentence
                          Arrangement, Error Detection, Previous-Year Questions
                        </span>
                      </li>
                      <li>
                        <span className="font-semibold text-gold block mb-1">
                          General Knowledge
                        </span>
                        <span className="text-sm text-muted">
                          Current Affairs, History, Geography, Polity, Economy,
                          General Science, Defence & National Affairs
                        </span>
                      </li>
                      <li>
                        <span className="font-semibold text-gold block mb-1">
                          Elementary Mathematics
                        </span>
                        <span className="text-sm text-muted">
                          Arithmetic, Algebra, Geometry, Trigonometry,
                          Mensuration, Statistics, Previous-Year Questions
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-card/50 p-6 rounded-2xl">
                    <h4 className="font-bold text-foreground mb-4">
                      Course Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm font-medium text-slate-700 dark:text-muted">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Live
                        Classes
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Recorded
                        Lectures
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Study
                        Material
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Topic-wise
                        Practice
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" />{" "}
                        Previous-Year Qs
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Mock Tests
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Doubt
                        Support
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Exam
                        Strategy
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#enroll-form"
                  className="mt-8 w-full block text-center px-6 py-4 rounded-xl font-bold text-foreground bg-surface text-gold border border-gold/30 hover:bg-gold hover:text-inverse transition-colors"
                >
                  View CDS 1 2027 Course
                </a>
              </motion.div>
            )}

            {examType === "AFCAT" && (
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-surface rounded-3xl border border-gold/20 p-5 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all flex flex-col"
              >
                <div className="mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold dark:text-yellow-400 font-bold text-sm mb-4 inline-block">
                    IAF EXAM
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    {examType} 1 2027
                    <br />
                    Complete Preparation
                  </h3>
                  <p className="text-muted">
                    Prepare for {examType} 1 2027 with structured lessons,
                    practice, mock tests and exam-oriented guidance.
                  </p>
                </div>

                <div className="space-y-6 flex-grow">
                  <div>
                    <h4 className="font-bold text-foreground border-b border-gold/20 pb-2 mb-3">
                      Course modules:
                    </h4>
                    <ul className="space-y-4">
                      <li>
                        <span className="font-semibold text-gold dark:text-yellow-400 block mb-1">
                          English
                        </span>
                        <span className="text-sm text-muted">
                          Grammar, Vocabulary, Comprehension, Sentence Formation
                        </span>
                      </li>
                      <li>
                        <span className="font-semibold text-gold dark:text-yellow-400 block mb-1">
                          General Awareness
                        </span>
                        <span className="text-sm text-muted">
                          Current Affairs, History, Geography, Polity, Defence
                          Awareness, General Science
                        </span>
                      </li>
                      <li>
                        <span className="font-semibold text-gold dark:text-yellow-400 block mb-1">
                          Numerical Ability
                        </span>
                        <span className="text-sm text-muted">
                          Arithmetic, Percentage, Ratio & Proportion, Profit &
                          Loss, Time & Work, Speed, Time & Distance, Data
                          Interpretation
                        </span>
                      </li>
                      <li>
                        <span className="font-semibold text-gold dark:text-yellow-400 block mb-1">
                          Reasoning & Military Aptitude
                        </span>
                        <span className="text-sm text-muted">
                          Verbal Reasoning, Non-Verbal Reasoning, Logical
                          Reasoning, Spatial Ability, Military Aptitude
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-card/50 p-6 rounded-2xl mt-auto">
                    <h4 className="font-bold text-foreground mb-4">
                      Course Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm font-medium text-slate-700 dark:text-muted">
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Live
                        Classes
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Recorded
                        Lectures
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Study
                        Material
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Topic-wise
                        Practice
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" />{" "}
                        Previous-Year Qs
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Mock Tests
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Doubt
                        Support
                      </span>
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gold" /> Exam
                        Strategy
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#enroll-form"
                  className="mt-8 w-full block text-center px-6 py-4 rounded-xl font-bold text-foreground bg-surface text-gold border border-gold/30 hover:bg-gold hover:text-inverse transition-colors"
                >
                  Enroll in {examType} 1 2027
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-12 md:py-24 bg-background relative border-y border-gold/10 overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              Complete Toolkit
            </span>
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter text-foreground mb-6">
              Everything You Need for Your <br className="hidden md:block" />{" "}
              2027 Defence Exam Preparation
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full opacity-50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {WHAT_YOU_GET.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-card p-5 md:p-6 rounded-3xl border border-gold/20 hover:border-gold/60 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(212,184,94,0.15)] flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-5 border border-gold/30 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-[0_0_15px_rgba(212,184,94,0.15)]">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base md:text-lg text-foreground mb-2 relative z-10 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed relative z-10">
                  Comprehensive and expertly curated to accelerate your
                  preparation journey.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Why Choose Guts N Glory Defence?" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {WHY_US_DATA.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-surface/50 border border-gold/20 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-yellow-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-foreground transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="py-12 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Meet Your Defence Exam Mentors"
            subtitle="EXPERT FACULTY"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {FACULTY.map((faculty, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-surface border border-gold/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-48 bg-surface relative overflow-hidden flex items-center justify-center">
                  <Users className="w-20 h-20 text-muted text-muted group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-foreground">
                    <h3 className="text-lg font-bold">{faculty.name}</h3>
                    <p className="text-gold font-medium text-sm">
                      {faculty.subject}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted text-sm mb-4 line-clamp-3">
                    {faculty.bio}
                  </p>
                  <div className="pt-4 border-t border-slate-100 dark:border-gold/10 text-xs font-semibold tracking-wider text-muted uppercase">
                    {faculty.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / SOCIAL PROOF */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-surface text-gold">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter mb-4">
              Our Students. Their Journey.
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              A legacy of structured preparation and dedicated guidance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-2xl md:text-4xl font-extrabold mb-2 text-foreground"><Counter to={2000} duration={2} />+</motion.div>
              <div className="text-secondary text-sm md:text-base font-medium">
                Candidates Trained
              </div>
            </div>
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-2xl md:text-4xl font-extrabold mb-2 text-foreground"><Counter to={150} duration={2} />+</motion.div>
              <div className="text-secondary text-sm md:text-base font-medium">
                Mock Tests Conducted
              </div>
            </div>
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-2xl md:text-4xl font-extrabold mb-2 text-foreground"><Counter to={8} duration={2} />+</motion.div>
              <div className="text-secondary text-sm md:text-base font-medium">
                Years of Teaching Experience
              </div>
            </div>
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-xl md:text-4xl font-extrabold mb-2 text-foreground">
                Dedicated
              </motion.div>
              <div className="text-secondary text-sm md:text-base font-medium">Expert Mentorship</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Success Stories" />

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-surface border border-gold/20 p-5 md:p-8 rounded-2xl md:rounded-3xl relative"
              >
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-gold">
                      {testimonial.exam} • {testimonial.batch}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="CLEAR YOUR DOUBTS"
          />

          <div className="space-y-1">
            {getFaqData(examType).map((faq, idx) => (
              <AccordionItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ENROLLMENT FORM */}
      <section
        id="enroll-form"
        className="py-12 md:py-24 relative overflow-hidden bg-background border-t border-gold/10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-foreground mb-6">
              Enroll in {examType} 1 2027 Course
            </h2>
            <p className="text-base md:text-lg text-muted">
              Fill out the form below to reserve your seat and access the most
              structured {examType} preparation course.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card p-5 md:p-10 rounded-3xl border border-gold/20 shadow-2xl relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/20 blur-[60px] rounded-full pointer-events-none" />

            <LeadForm defaultCourse={`${examType} 1 2027`} />
          </motion.div>

          <p className="text-muted font-medium text-center mt-10">
            Have Questions?{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:text-gold-hover underline underline-offset-4"
            >
              WhatsApp Us &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--bg-footer)] py-8 md:py-12 text-muted border-t border-gold/10 text-center text-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image
              src="/gutsnglorylogo.jpeg"
              alt="Guts N Glory Defence"
              width={32}
              height={32}
              quality={95}
              unoptimized
              priority
              className="rounded-full object-cover opacity-90"
            />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Guts N Glory <span className="text-gold">Defence</span>
            </span>
          </div>
          <p className="mb-4 max-w-md mx-auto">
            Dedicated to providing structured and exam-oriented preparation for
            Defence aspirants across India.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Guts N Glory Defence. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* STICKY WHATSAPP BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-foreground font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden md:inline">Talk to a Course Counsellor</span>
      </a>
    </div>
  );
}
