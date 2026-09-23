"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Course } from "./CourseCard";

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  const isFree = course.price === 0;
  const displayPrice = course.discountPrice ?? course.price;
  const hasDiscount = course.discountPrice && course.discountPrice < course.price;

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleEnrollClick = async (e: React.MouseEvent) => {
    // Prevent default temporarily to fire tracking request
    // Actually, just let it open in a new tab but also fire tracking in the background
    try {
      await fetch(`/api/courses/${course._id}/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enrollClick" }),
      });
    } catch (err) {
      console.error("Failed to track enroll click", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      <div className="relative bg-card border border-edge rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[50] w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          ✕
        </button>
        
        <div className="overflow-y-auto w-full h-full flex flex-col">
          <div className="relative h-[300px] sm:h-[400px] w-full shrink-0 bg-surface">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="p-6 sm:p-8 flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-edge text-muted">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {course.title}
          </h2>
          
          <p className="text-sm sm:text-base leading-relaxed text-secondary mb-8 whitespace-pre-wrap">
            {course.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-edge">
            <div>
              {isFree ? (
                <span className="font-heading text-2xl font-extrabold text-[#6ABF40]">
                  Free
                </span>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-extrabold text-gold">
                    ₹{displayPrice}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-muted line-through">
                      ₹{course.price}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
              {course.expiryDate && (
                <div className="text-xs font-semibold text-red-500 text-center sm:text-right w-full">
                  Expires: {new Date(course.expiryDate).toLocaleDateString('en-GB')}
                </div>
              )}
              <a
                href={course.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleEnrollClick}
                className="w-full text-center font-bold px-10 py-3.5 rounded-xl text-[#1A1A1A] transition-transform hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
              >
                Enroll Now
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
