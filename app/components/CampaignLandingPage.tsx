"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
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
  Sun,
  Moon,
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

const getWhyUsData = (examType: string) => [
  {
    title: `01 Proven ${examType} Maths Expertise`,
    desc: `Learn from Kaushal Sir – Maths Commander, who has helped 5,000+ students crack the ${examType} exam.`,
    icon: <CalendarDays className="w-6 h-6 text-gold" />,
  },
  {
    title: `02 Complete ${examType} 2027 Coaching`,
    desc: `Get comprehensive ${examType} coaching for Maths, English and General Studies under one program.`,
    icon: <Target className="w-6 h-6 text-gold" />,
  },
  {
    title: `03 ${examType} PYQ-Based Preparation`,
    desc: `Master important concepts with ${examType} Previous-Year Questions (PYQs) and exam-focused practice.`,
    icon: <BookMarked className="w-6 h-6 text-gold" />,
  },
  {
    title: `04 Complete ${examType} Study Material`,
    desc: `Access ${examType} notes, study material and revision resources for structured preparation.`,
    icon: <ClipboardList className="w-6 h-6 text-gold" />,
  },
  {
    title: `05 ${examType} Mock Tests & Practice`,
    desc: `Improve speed, accuracy and exam performance with regular ${examType} practice and mock tests.`,
    icon: <FileText className="w-6 h-6 text-gold" />,
  },
  {
    title: "06 Written Exam to SSB Guidance",
    desc: `Get a complete ${examType} preparation approach, supporting your journey from the written exam towards SSB preparation.`,
    icon: <Users className="w-6 h-6 text-gold" />,
  },
];

const getWhatYouGet = (examType: string) => [
  {
    title: "Live Classes",
    desc: "Live Classes with Kaushal Sir, Maths Commander, 5000+ Student Success so far.",
    icon: <MonitorPlay className="w-6 h-6 text-gold" />,
  },
  {
    title: "Recorded Lectures",
    desc: "Every Class will be recorded on the app and students will be having 9 months of validity",
    icon: <Video className="w-6 h-6 text-gold" />,
  },
  {
    title: "Study Material",
    desc: `Get structured notes and study resources for Maths, GS and English for ${examType} 1 2027`,
    icon: <BookOpen className="w-6 h-6 text-gold" />,
  },
  {
    title: "Practice Questions",
    desc: `Build speed and accuracy with ${examType}-focused practice questions.`,
    icon: <BrainCircuit className="w-6 h-6 text-gold" />,
  },
  {
    title: "Previous-Year Papers",
    desc: `Understand the exam pattern through ${examType} previous-year questions and papers.`,
    icon: <FileText className="w-6 h-6 text-gold" />,
  },
  {
    title: "Mock Tests",
    desc: `Experience exam-like ${examType} mock tests and assess your preparation.`,
    icon: <ClipboardList className="w-6 h-6 text-gold" />,
  },
  {
    title: "Doubt Sessions",
    desc: "Get your concepts clarified through dedicated doubt-solving sessions.",
    icon: <MessageSquare className="w-6 h-6 text-gold" />,
  },
  {
    title: "Performance Tracking",
    desc: "Track your progress and identify strengths and improvement areas.",
    icon: <BarChart className="w-6 h-6 text-gold" />,
  },
  {
    title: "Exam Strategy",
    desc: `Learn smart preparation, time management and exam-taking strategies for ${examType} 2027.`,
    icon: <Target className="w-6 h-6 text-gold" />,
  },
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
  {
    name: "Neha Rajput",
    exam: "AFCAT 1",
    batch: "2023 Batch",
    text: "The detailed notes and targeted practice sessions were a game-changer. I passed my written exam purely by following their exact roadmap.",
  },
  {
    name: "Vivek Choudhary",
    exam: "CDS 2",
    batch: "2023 Batch",
    text: "Maths was my biggest weakness, but Kaushal Sir's shortcuts made it so easy. I not only cleared the written exam but scored really well.",
  },
];

const FACULTY = [
  {
    name: "Kaushal Sir",
    subject: "Maths Commander",
    bio: "A dedicated CDS Maths mentor known for simplifying complex concepts with exam-focused techniques, shortcuts and strategic problem-solving.",
    stats: "8+ YRS EXP | MATHS EXPERT | 10,000+ CLASSES",
    image: "/Kaushal.jpeg",
  },
  {
    name: "Alok Kumar Mishra",
    subject: "SSB Mentor & Defence Expert",
    bio: "AIR 29 | SSB Recommended | NDA, CDS & AFCAT Cleared, bringing first-hand defence examination and SSB experience to student preparation.",
    stats: "5+ YRS EXP | SSB MENTOR | DEFENCE EXPERT",
    image: "/Alok.jpeg",
  },
  {
    name: "Apurva Ma’am",
    subject: "General Studies Coach",
    bio: "A dedicated GS mentor focused on building strong fundamentals, exam awareness and CDS-oriented preparation.",
    stats: "3+ YRS EXP | GS COACH | 3,000+ STUDENTS TRAINED",
    image: "/Apurva.jpeg",
  },
];

// --- COMPONENTS ---

function Counter({
  from = 0,
  to,
  duration = 2,
}: {
  from?: number;
  to: number;
  duration?: number;
}) {
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
  title: React.ReactNode;
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
      <span className="text-[#808000] font-semibold tracking-wider uppercase text-sm mb-3 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-[4px] text-[#1A1A1A] mb-6">
      {title}
    </h2>
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
    <div className="border border-gold/20 rounded-2xl mb-4 overflow-hidden bg-[#F0EDE8]/50 backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none"
      >
        <span className="font-semibold text-base md:text-lg text-[#1A1A1A] pr-8">
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
            <div className="px-6 pb-6 text-[#7A7A7A] leading-relaxed">{answer}</div>
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
    const redirectUrl = defaultCourse.includes("AFCAT")
      ? "https://gutsnglorydefence.in/new-courses/10-afcat-%281%29-2027"
      : "https://gutsnglorydefence.in/new-courses/9-cds-%281%29-2027";
    window.location.href = redirectUrl;

    return (
      <div className="text-center py-10 relative z-10">
        <div className="w-20 h-20 bg-gold/20 text-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
          Redirecting...
        </h3>
        <p className="text-[#7A7A7A]">
          Taking you to the course page. Please wait.
        </p>
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
          <label className="text-sm font-semibold text-[#7A7A7A] ml-1">
            Full Name
          </label>
          <input
            required
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full bg-[#FAF8F5] border border-gold/20 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#7A7A7A] ml-1">
            Email Address
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="example@example.com"
            className="w-full bg-[#FAF8F5] border border-gold/20 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#7A7A7A] ml-1">
          Mobile Number
        </label>
        <input
          required
          type="tel"
          name="mobile"
          placeholder="+91-9876543210"
          className="w-full bg-[#FAF8F5] border border-gold/20 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#7A7A7A] ml-1">
          Select Course
        </label>
        <select
          required
          name="course"
          defaultValue={defaultCourse}
          className="w-full bg-[#FAF8F5] border border-gold/20 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:border-gold transition-colors appearance-none"
        >
          <option value="CDS 1 2027">CDS 1 2027</option>
          <option value="AFCAT 1 2027">AFCAT 1 2027</option>
        </select>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full px-8 py-4 mt-4 rounded-xl font-black text-[#1A1A1A] transition-all bg-gold hover:bg-gold-hover shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
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
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Force light mode for these landing pages
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500); // Small delay so it's not jarring
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappMsg = `Hi Guts N Glory Defence, I am interested in the ${examType} 1 2027 course. Please share the syllabus, batch details, fees and enrollment process.`;
  const whatsappUrl = `https://wa.me/918319590298?text=${encodeURIComponent(whatsappMsg)}`; // Replace with actual number

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-500/30 font-sans text-[#1A1A1A]">
      {/* HEADER */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled || mobileMenuOpen
            ? "bg-[rgba(250,248,245,0.85)] backdrop-blur-xl border-gold/20 shadow-sm py-4"
            : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 md:px-12 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
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
            <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              GUTS N GLORY <span className="text-gold">DEFENCE</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-bold text-sm text-[#1A1A1A]">
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
            {/* Theme toggle removed to force light mode */}
            <a
              href="#enroll-form"
              className="px-6 py-2.5 rounded-full font-semibold text-sm bg-gold hover:bg-gold-hover text-[#1A1A1A] transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] active:scale-95"
            >
              ENROL NOW
            </a>
          </div>

          <button
            className="lg:hidden text-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
                className="fixed top-0 right-0 h-screen w-[min(300px,80vw)] bg-white z-[70] shadow-2xl flex flex-col border-l border-black/10 lg:hidden overflow-y-auto"
              >
                {/* Header with close */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
                  <span className="text-sm font-bold text-gold uppercase tracking-[2px]">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#F0EDE8] flex items-center justify-center text-[#7A7A7A] hover:text-gold hover:bg-[#F7F5F2] transition-all duration-200"
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
                      className="py-3 px-4 rounded-xl text-[0.9rem] font-medium text-[#1A1A1A] no-underline transition-all duration-200 hover:text-gold hover:bg-[#F7F5F2] hover:pl-5"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Theme Toggle removed to force light mode */}

                {/* CTA */}
                <div className="p-4 border-t border-black/10">
                  <a
                    href="#enroll-form"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white no-underline bg-gold shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-200 hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] active:scale-[0.98]"
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
        <Image
          src="/background.jpg"
          alt="Background Image"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          width={1920}
          height={1080}
        />
        {/* Overlay to fade the background */}
        <div className="absolute inset-0 bg-[#FAF8F5]/80 z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-gold/30 shadow-sm backdrop-blur-md mb-8 text-sm font-semibold text-[#808000]"
          >
            <Shield className="w-4 h-4" />
            <span>{examType} 1 2027 Preparation Course</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#1A1A1A] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 800 }}
          >
            Preparing for {examType} 1 2027?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-[#1A1A1A] max-w-3xl mx-auto mb-10 leading-relaxed "
            style={{ fontFamily: "var(--font-lato)", fontWeight: 400 }}
          >
            Start your journey with GUTS N GLORY DEFENCE and Prepare
            systematically for {examType} 1 2027 with structured courses
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
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-[#1A1A1A] bg-gold hover:bg-gold-hover transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] active:scale-95 flex items-center justify-center gap-2"
            >
              Explore Courses <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-[#1A1A1A] bg-white hover:bg-[#F0EDE8] transition-all active:scale-95 flex items-center justify-center gap-2 border border-black/10 shadow-md"
            >
              <MessageCircle className="w-5 h-5" /> Talk to a Mentor
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-gold/20 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-[#808000]"
          >
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
      <section className="py-8 bg-[#F0EDE8] border-y border-gold/30">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-foreground/20 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#1A1A1A]" />
            </div>
            <div>
              <h3 className="text-[#1A1A1A] font-bold tracking-wider text-sm mb-1 uppercase">
                Next Batch Starts Soon
              </h3>
              <p className="text-[#4A4A4A] text-sm md:text-base font-medium">
                {examType} 1 2027
              </p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-foreground/20" />
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-[#1A1A1A] font-semibold text-lg">
              Limited Batch Seats
            </span>
            <a
              href="#enroll-form"
              className="px-6 py-2 bg-gold text-[#1A1A1A] font-black rounded-full hover:bg-gold-hover transition-all shadow-[0_0_15px_rgba(250,204,21,0.3)]"
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

          <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
            <a
              href="#enroll-form"
              className="block relative w-full rounded-3xl overflow-hidden shadow-2xl group hover:shadow-yellow-500/20 transition-all border border-gold/20 hover:border-gold/50"
            >
              <img
                src={`/${examType}.PNG`}
                alt={`${examType} Course Creative`}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </a>

            <a
              href="#enroll-form"
              className="w-full block text-center px-6 py-4 rounded-xl font-bold text-[#1A1A1A] bg-gold shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transition-all"
            >
              Enroll in {examType} 1 2027 &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-12 md:py-24 bg-[#FAF8F5] relative border-y border-gold/10 overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block"></span>
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter text-[#1A1A1A] mb-6">
              WHAT WE OFFER
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full opacity-50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {getWhatYouGet(examType).map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white p-5 md:p-6 rounded-3xl border border-gold/20 hover:border-gold/60 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(212,184,94,0.15)] flex flex-col items-center sm:items-start text-center sm:text-left"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FACC15]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-5 border border-gold/30 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-[0_0_15px_rgba(212,184,94,0.15)]">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base md:text-lg text-[#1A1A1A] mb-2 relative z-10 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#7A7A7A] text-sm leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="WHY CHOOSE GUTS N GLORY"
            subtitle="If you have Guts, Glory will Follow…"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {getWhyUsData(examType).map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-[#F0EDE8]/50 border border-gold/20 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-yellow-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F0EDE8] flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-[#1A1A1A] transition-all duration-300 [&_svg]:transition-colors [&_svg]:duration-300 group-hover:[&_svg]:text-[#1A1A1A]">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#7A7A7A] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="MEET YOUR DEFENCE EXAM MENTORS"
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
                className="bg-[#F0EDE8] border border-gold/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-64 bg-[#F0EDE8] relative overflow-hidden flex items-center justify-center">
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="text-lg font-bold">{faculty.name}</h3>
                    <p className="text-gold font-medium text-sm">
                      {faculty.subject}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#7A7A7A] text-sm mb-4 line-clamp-3">
                    {faculty.bio}
                  </p>
                  <div className="pt-4 border-t border-slate-100 text-xs font-semibold tracking-wider text-[#7A7A7A] uppercase">
                    {faculty.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / SOCIAL PROOF */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-[#F0EDE8] text-gold">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] font-black uppercase tracking-tighter mb-4">
              OUR JOURNEY SO FAR
            </h2>
            <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto">
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
                className="text-2xl md:text-4xl font-extrabold mb-2 text-[#1A1A1A]"
              >
                <Counter to={5000} duration={2} />+
              </motion.div>
              <div className="text-[#4A4A4A] text-sm md:text-base font-medium">
                Candidates Trained
              </div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-2xl md:text-4xl font-extrabold mb-2 text-[#1A1A1A]"
              >
                <Counter to={500} duration={2} />+
              </motion.div>
              <div className="text-[#4A4A4A] text-sm md:text-base font-medium">
                Selections
              </div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-2xl md:text-4xl font-extrabold mb-2 text-[#1A1A1A]"
              >
                <Counter to={10000} duration={2} />+
              </motion.div>
              <div className="text-[#4A4A4A] text-sm md:text-base font-medium">
                Mocks Conducted
              </div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-2xl md:text-4xl font-extrabold mb-2 text-[#1A1A1A]"
              >
                <Counter to={15} duration={2} />+
              </motion.div>
              <div className="text-[#4A4A4A] text-sm md:text-base font-medium">
                Years of Combined
                <br />
                Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title={<span className="italic">Success Stories</span>}
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-[#F0EDE8] border border-gold/20 p-5 md:p-8 rounded-2xl md:rounded-3xl relative hover:border-gold/60 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(250,204,21,0.1)] transition-all duration-300"
              >
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-[#7A7A7A] mb-8 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-[#1A1A1A]">
                      {testimonial.name}
                    </h4>
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
      <section id="faq" className="py-12 md:py-24 bg-white">
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
        className="py-12 md:py-24 relative overflow-hidden bg-[#FAF8F5] border-t border-gold/10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-bold text-[#1A1A1A] mb-6">
              Enroll in {examType} 1 2027 Course
            </h2>
            <p className="text-base md:text-lg text-[#7A7A7A]">
              Fill out the form below to reserve your seat and access the most
              structured {examType} preparation course.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-5 md:p-10 rounded-3xl border border-gold/20 shadow-2xl relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/20 blur-[60px] rounded-full pointer-events-none" />

            <LeadForm defaultCourse={`${examType} 1 2027`} />
          </motion.div>

          <p className="text-[#7A7A7A] font-medium text-center mt-10">
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
      <footer className="bg-[#1A1A1A] py-8 md:py-12 text-[#7A7A7A] border-t border-gold/10 text-center text-sm">
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
            <span className="text-lg font-bold tracking-tight text-white">
              GUTS N GLORY <span className="text-gold">DEFENCE</span>
            </span>
          </div>
          <p className="mb-4 max-w-md mx-auto">
            Dedicated to providing structured and exam-oriented preparation for
            Defence aspirants across India.
          </p>
          <p>
            &copy; {new Date().getFullYear()} GUTS N GLORY DEFENCE. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* STICKY WHATSAPP BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold shadow-2xl hover:scale-105 transition-transform duration-300"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden md:inline">Talk to a Course Counsellor</span>
      </a>

      {/* POPUP ENROLLMENT FORM */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white p-6 md:p-8 rounded-3xl border border-gold/20 shadow-2xl overflow-y-auto max-h-[90vh] z-10"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#F0EDE8] text-[#7A7A7A] hover:text-gold hover:bg-[#F7F5F2] transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6 pt-2">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                  Enroll in {examType} 1 2027 Course
                </h2>
                <p className="text-sm text-[#7A7A7A]">
                  Reserve your seat and access the most structured {examType}{" "}
                  preparation course.
                </p>
              </div>

              <LeadForm defaultCourse={`${examType} 1 2027`} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
