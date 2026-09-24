"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show once per session so it's not overly annoying
    const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenWelcomePopup", "true");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[1100px] h-[85vh] md:h-[70vh] bg-transparent flex flex-col md:flex-row p-4 md:p-8 gap-4 md:gap-8 z-10 items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 bg-black/40 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-xl border border-white/20 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
            
            <Link 
              href="https://gutsnglorydefence.in/new-courses/10-afcat-%281%29-2027" 
              target="_blank" 
              onClick={() => setIsOpen(false)}
              className="flex-1 relative block w-full h-1/2 md:h-full group rounded-2xl overflow-hidden"
            >
              <Image 
                src="/AFCAT.PNG" 
                alt="AFCAT Course" 
                fill 
                className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-700" 
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </Link>
            
            
            
            <Link 
              href="https://gutsnglorydefence.in/new-courses/9-cds-%281%29-2027" 
              target="_blank" 
              onClick={() => setIsOpen(false)}
              className="flex-1 relative block w-full h-1/2 md:h-full group rounded-2xl overflow-hidden"
            >
              <Image 
                src="/CDS.PNG" 
                alt="CDS Course" 
                fill 
                className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-700" 
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
