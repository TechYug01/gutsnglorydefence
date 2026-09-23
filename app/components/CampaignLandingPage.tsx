'use client';
import Image from 'next/image';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DATA ---

const getFaqData = (examType: 'AFCAT' | 'CDS') => [
  {
    question: `What is ${examType} 1 2027?`,
    answer: `${examType} 1 2027 refers to the first ${examType === "AFCAT" ? "Air Force Common Admission Test" : "Combined Defence Services Examination"} cycle of 2027. Candidates should check the official notification for the applicable eligibility criteria, branches, vacancies, dates and selection process.`
  },
  {
    question: `When should I start preparing for ${examType} 1 2027?`,
    answer: "Candidates can begin with fundamentals, gradually move to topic-wise practice and then increase mock-test and revision frequency closer to the examination."
  },
  {
    question: "Is this course for beginners?",
    answer: "Yes, our courses are structured from the ground up. We start with fundamental concepts and progressively move towards advanced, exam-level problem solving, making it perfect for both beginners and repeaters."
  },
  {
    question: "Are classes live or recorded?",
    answer: "The course includes a hybrid of both. You will get access to daily live interactive classes, along with high-quality recorded lectures for flexible revision anytime."
  },
  {
    question: "Will I get study material?",
    answer: "Absolutely. Comprehensive topic-wise notes, PDF summaries, and previous-year question compilations are provided for all subjects in the syllabus."
  },
  {
    question: "Are mock tests included?",
    answer: "Yes, the program includes full-length mock tests designed strictly according to the latest examination pattern, along with detailed performance analytics."
  },
  {
    question: "Is doubt support available?",
    answer: "Yes, we have dedicated doubt-clearing sessions and community groups where you can interact directly with mentors and peers to resolve any queries."
  },
  {
    question: `Can I prepare for ${examType} 1 2027?`,
    answer: "There is a significant overlap in subjects like English, General Knowledge, and Basic Math,  You can prepare together if you plan your schedule to cover the unique portions of both."
  }
];

const WHY_US_DATA = [
  {
    title: "01 — Structured Preparation",
    desc: "Follow a planned preparation journey instead of studying randomly.",
    icon: <CalendarDays className="w-6 h-6" />
  },
  {
    title: "02 — Exam-Focused Learning",
    desc: "Lessons and practice are aligned with the relevant examination syllabus and question patterns.",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "03 — Complete Subject Coverage",
    desc: "Cover the subjects required for your chosen examination in one structured program.",
    icon: <BookMarked className="w-6 h-6" />
  },
  {
    title: "04 — Practice & Mock Tests",
    desc: "Regular practice and mock tests help candidates measure progress and identify areas requiring more work.",
    icon: <ClipboardList className="w-6 h-6" />
  },
  {
    title: "05 — Previous-Year Questions",
    desc: "Use previous-year questions to understand the type and level of questions asked in the examination.",
    icon: <FileText className="w-6 h-6" />
  },
  {
    title: "06 — Expert Guidance",
    desc: "Learn through structured guidance from experienced educators and defence-exam mentors.",
    icon: <Users className="w-6 h-6" />
  }
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
  }
];

const FACULTY = [
  {
    name: "Vikram Singh",
    subject: "General Studies & Strategy",
    bio: "Ex-Defence personnel with 8+ years of teaching experience. Mastered the art of decoding UPSC GS papers.",
    stats: "8+ Yrs Exp | GS Expert | 1000+ Classes"
  },
  {
    name: "Neha Sharma",
    subject: "English Comprehension",
    bio: "Specialist in English grammar and vocabulary for defence exams. Known for simplifying complex rules.",
    stats: "5+ Yrs Exp | English Expert | 800+ Classes"
  },
  {
    name: "Rahul Desai",
    subject: "Mathematics & Aptitude",
    bio: "Math wizard who simplifies arithmetic and advanced math with quick, time-saving techniques.",
    stats: "7+ Yrs Exp | Math Expert | 1200+ Classes"
  }
];

// --- COMPONENTS ---

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-16">
    {subtitle && (
      <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm mb-3 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
      {title}
    </h2>
    <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full" />
  </div>
);

const AccordionItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl mb-4 overflow-hidden bg-white dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
      >
        <span className="font-semibold text-lg text-slate-900 dark:text-slate-100 pr-8">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-emerald-500 transition-transform duration-300 flex-shrink-0",
            isOpen && "transform rotate-180"
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
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


interface CampaignLandingPageProps {
  examType: 'AFCAT' | 'CDS';
}

export default function CampaignLandingPage({ examType }: CampaignLandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMsg = `Hi Guts N Glory Defence, I am interested in the ${examType} 1 2027 course. Please share the syllabus, batch details, fees and enrollment process.`;
  const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMsg)}`; // Replace with actual number

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] selection:bg-emerald-500/30 font-sans text-slate-900 dark:text-slate-50">
      
      {/* HEADER */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm py-4" : "bg-transparent py-6"
      )}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/gutsnglorylogo.jpeg" alt="Guts N Glory Defence" width={40} height={40} className="rounded-full object-cover shadow-sm" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Guts N Glory <span className="text-emerald-600 dark:text-emerald-500">Defence</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-700 dark:text-slate-300">
            <a href="#courses" className="hover:text-emerald-500 transition-colors">Courses</a>
            <a href="#why-us" className="hover:text-emerald-500 transition-colors">Why Us</a>
            <a href="#faculty" className="hover:text-emerald-500 transition-colors">Faculty</a>
            <a href="#testimonials" className="hover:text-emerald-500 transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-emerald-500 transition-colors">FAQs</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-full font-semibold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95">
              ENROL NOW
            </a>
          </div>

          <button className="lg:hidden text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800 shadow-xl lg:hidden flex flex-col p-6 gap-4"
            >
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-800 dark:text-slate-200">Courses</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-800 dark:text-slate-200">Why Us</a>
              <a href="#faculty" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-800 dark:text-slate-200">Faculty</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-800 dark:text-slate-200">Testimonials</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-800 dark:text-slate-200">FAQs</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-4 px-6 py-3 text-center rounded-full font-semibold text-sm bg-emerald-500 text-white shadow-lg">
                ENROL NOW
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md mb-8 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
          >
            <Shield className="w-4 h-4" />
            <span>{examType} 1 2027 Preparation Courses</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            Your 2027 Defence Exam <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Preparation Starts Now.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Prepare systematically for {examType} 1 2027 with structured courses designed around the written examination syllabus, concept building, practice, mock tests and exam-focused preparation.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#courses" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 flex items-center justify-center gap-2">
              Explore Courses <ArrowRight className="w-5 h-5" />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center gap-2 border border-transparent dark:border-slate-700">
              <MessageCircle className="w-5 h-5" /> Talk to a Mentor
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500 dark:text-slate-400"
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
      <section className="py-8 bg-emerald-500 dark:bg-emerald-900/40 border-y border-emerald-600 dark:border-emerald-800/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-wider text-sm mb-1 uppercase">Next Batch Starts Soon</h3>
              <p className="text-emerald-100 font-medium">{examType} 1 2027</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/20" />
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-white font-semibold text-lg">Limited Batch Seats</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white text-emerald-600 dark:text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-colors shadow-lg">
              Reserve Your Seat &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR COURSE */}
      <section id="courses" className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title={`Complete ${examType} 1 2027 Course`} />
          
          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {examType === "CDS" && (
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all flex flex-col"
            >
              <div className="mb-6">
                <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-4 inline-block">UPSC EXAM</span>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">CDS 1 2027<br/>Complete Preparation</h3>
                <p className="text-slate-600 dark:text-slate-400">Prepare for UPSC CDS 1 2027 with structured, exam-focused preparation.</p>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">What the course covers:</h4>
                  <ul className="space-y-4">
                    <li>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">English</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Grammar, Vocabulary, Reading Comprehension, Sentence Arrangement, Error Detection, Previous-Year Questions</span>
                    </li>
                    <li>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">General Knowledge</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Current Affairs, History, Geography, Polity, Economy, General Science, Defence & National Affairs</span>
                    </li>
                    <li>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">Elementary Mathematics</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Arithmetic, Algebra, Geometry, Trigonometry, Mensuration, Statistics, Previous-Year Questions</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Course Features:</h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Live Classes</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Recorded Lectures</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Study Material</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Topic-wise Practice</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Previous-Year Qs</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Mock Tests</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Doubt Support</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Exam Strategy</span>
                  </div>
                </div>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 w-full block text-center px-6 py-4 rounded-xl font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                View CDS 1 2027 Course
              </a>
            </motion.div>
          )}

            {examType === "AFCAT" && (
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all flex flex-col"
            >
              <div className="mb-6">
                <span className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-bold text-sm mb-4 inline-block">IAF EXAM</span>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{examType} 1 2027<br/>Complete Preparation</h3>
                <p className="text-slate-600 dark:text-slate-400">Prepare for {examType} 1 2027 with structured lessons, practice, mock tests and exam-oriented guidance.</p>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">Course modules:</h4>
                  <ul className="space-y-4">
                    <li>
                      <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">English</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Grammar, Vocabulary, Comprehension, Sentence Formation</span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">General Awareness</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Current Affairs, History, Geography, Polity, Defence Awareness, General Science</span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">Numerical Ability</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Arithmetic, Percentage, Ratio & Proportion, Profit & Loss, Time & Work, Speed, Time & Distance, Data Interpretation</span>
                    </li>
                    <li>
                      <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">Reasoning & Military Aptitude</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Verbal Reasoning, Non-Verbal Reasoning, Logical Reasoning, Spatial Ability, Military Aptitude</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl mt-auto">
                   <h4 className="font-bold text-slate-900 dark:text-white mb-4">Course Features:</h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Live Classes</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Recorded Lectures</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Study Material</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Topic-wise Practice</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Previous-Year Qs</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Mock Tests</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Doubt Support</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-500" /> Exam Strategy</span>
                  </div>
                </div>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 w-full block text-center px-6 py-4 rounded-xl font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                View {examType} 1 2027 Course
              </a>
            </motion.div>
          )}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-20 bg-slate-900 dark:bg-[#070b14] text-white border-y border-slate-800">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Everything You Need for Your <br className="hidden md:block"/> 2027 Defence Exam Preparation</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {WHAT_YOU_GET.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  {item.icon}
                </div>
                <span className="font-semibold text-sm tracking-wide">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeading title="Why Prepare with Guts N Glory Defence?" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {WHY_US_DATA.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="py-24 bg-slate-50 dark:bg-[#0B1120]">
        <div className="container mx-auto px-6">
          <SectionHeading title="Meet Your Defence Exam Mentors" subtitle="EXPERT FACULTY" />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {FACULTY.map((faculty, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center">
                  <Users className="w-20 h-20 text-slate-300 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="text-2xl font-bold">{faculty.name}</h3>
                    <p className="text-emerald-400 font-medium text-sm">{faculty.subject}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {faculty.bio}
                  </p>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    {faculty.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / SOCIAL PROOF */}
      <section className="py-24 relative overflow-hidden bg-emerald-600 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[length:20px_20px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Students. Their Journey.</h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">A legacy of structured preparation and dedicated guidance.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-5xl font-extrabold mb-2 text-white">2000+</div>
              <div className="text-emerald-100 font-medium">Candidates Trained</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2 text-white">150+</div>
              <div className="text-emerald-100 font-medium">Mock Tests Conducted</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2 text-white">8+</div>
              <div className="text-emerald-100 font-medium">Years of Teaching Experience</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2 text-white">Dedicated</div>
              <div className="text-emerald-100 font-medium">Expert Mentorship</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-6">
          <SectionHeading title="What Our Students Say" />
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl relative">
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">{testimonial.exam} • {testimonial.batch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-50 dark:bg-[#0B1120]">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionHeading title="Frequently Asked Questions" subtitle="CLEAR YOUR DOUBTS" />
          
          <div className="space-y-1">
            {getFaqData(examType).map((faq, idx) => (
              <AccordionItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden bg-slate-900 dark:bg-[#070b14] text-center border-t border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Your 2027 Defence Exam Preparation</h2>
          <p className="text-xl text-slate-400 mb-10">
            {examType} 1 2027 preparation is now structured into focused learning, practice and revision.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={cn("px-8 py-4 rounded-full font-bold text-white transition-all", examType === "CDS" ? "bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]" : "bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]")}>
              Explore {examType} 1 2027 Course
            </a>
          </div>

          <p className="text-slate-400 font-medium">
            Have Questions? <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">WhatsApp Us &rarr;</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-12 text-slate-400 border-t border-slate-900 text-center text-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image src="/gutsnglorylogo.jpeg" alt="Guts N Glory Defence" width={32} height={32} className="rounded-full object-cover opacity-90" />
            <span className="text-lg font-bold tracking-tight text-white">
              Guts N Glory <span className="text-emerald-500">Defence</span>
            </span>
          </div>
          <p className="mb-4 max-w-md mx-auto">
            Dedicated to providing structured and exam-oriented preparation for Defence aspirants across India.
          </p>
          <p>&copy; {new Date().getFullYear()} Guts N Glory Defence. All rights reserved.</p>
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

    </div>
  );
}
