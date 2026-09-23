import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({ title: "Premium Courses | Guts N Glory Defence" });
import Image from "next/image";



import CourseCard, { Course } from "../components/CourseCard";
import Link from "next/link";
import { FadeIn, StaggerChildren } from "../components/FadeIn";
import { BookOpen } from "lucide-react";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

import { getCoursesData } from "@/lib/courses";

async function getPaidCourses(sort: string): Promise<Course[]> {
  return getCoursesData("paid", sort, 100) as unknown as Course[];
}

export default async function PaidCoursesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : "default";
  const courses = await getPaidCourses(sort);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="pt-28 pb-12 px-6 text-center bg-surface border-b border-edge">
        <span className="inline-block text-xs font-bold text-gold tracking-[2.5px] uppercase mb-3">Premium Programs</span>
        <h1 className="font-heading font-black text-foreground leading-tight mb-4 text-3xl md:text-5xl uppercase tracking-tighter">
          Paid <span className="text-gold">Courses</span>
        </h1>
        <p className="text-[1rem] text-muted max-w-[480px] mx-auto">
          Battle-tested courses designed by defence veterans with expert instructors and proven results.
        </p>
        <div className="mt-4 text-sm text-muted">
          {courses.length > 0 ? `${courses.length} course${courses.length !== 1 ? "s" : ""} available` : ""}
        </div>
      </div>

      {/* Courses grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10 justify-center sm:justify-start">
          <Link
            href="/paid-courses?sort=default"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "default" 
                ? "bg-gold text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-gold/50"
            }`}
          >
            Latest
          </Link>
          <Link
            href="/paid-courses?sort=old"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "old" 
                ? "bg-gold text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-gold/50"
            }`}
          >
            Oldest
          </Link>
          <Link
            href="/paid-courses?sort=popular"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "popular" 
                ? "bg-gold text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-gold/50"
            }`}
          >
            Popular
          </Link>
          <Link
            href="/paid-courses?sort=trending"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "trending" 
                ? "bg-gold text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-gold/50"
            }`}
          >
            Trending
          </Link>
        </div>
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4 text-gold"><BookOpen size={48} /></div>
            <p className="text-muted text-base">No paid courses available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


