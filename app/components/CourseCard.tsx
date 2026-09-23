"use client";

import Image from "next/image";
import { useState } from "react";
import CourseModal from "./CourseModal";

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  externalLink: string;
  tags: string[];
  createdAt: string;
  views?: number;
  enrollClicks?: number;
  expiryDate?: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isFree = course.price === 0;
  const displayPrice = course.discountPrice ?? course.price;
  const hasDiscount = course.discountPrice && course.discountPrice < course.price;
  const isNew = Date.now() - new Date(course.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
  const badge = isFree ? "Free" : isNew ? "New" : (course.tags[0] ?? null);

  const handleCardClick = async () => {
    setIsModalOpen(true);
    try {
      await fetch(`/api/courses/${course._id}/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "view" }),
      });
    } catch (err) {
      console.error("Failed to track view", err);
    }
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group bg-card border border-edge rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-sm hover:border-gold hover:shadow-lg hover:-translate-y-1.5 flex flex-col h-full"
      >
        <div className="relative h-[180px] bg-surface">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {badge && (
            <span
              className="absolute top-3 right-3 text-[0.65rem] font-bold px-3 py-1 rounded-full tracking-wide uppercase text-[#1A1A1A]"
              style={{ background: "linear-gradient(135deg, #C8A951, #D4B85E)" }}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-heading text-[1.05rem] font-bold text-foreground mb-2 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-[0.85rem] leading-relaxed text-muted mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>
          <div className="flex justify-between items-center border-t border-edge pt-4">
            <div>
              {isFree ? (
                <span className="font-heading text-[1.2rem] font-extrabold text-[#6ABF40]">
                  Free
                </span>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading text-[1.2rem] font-extrabold text-gold">
                    ₹{displayPrice}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-muted line-through">
                      ₹{course.price}
                    </span>
                  )}
                </div>
              )}
            </div>
            <span
              className="text-[0.8rem] font-semibold px-4 py-1.5 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)] transition-all duration-200 group-hover:bg-[var(--accent-primary)] group-hover:text-white"
            >
              View Details
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CourseModal course={course} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
