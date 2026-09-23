import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({ title: "Free Courses | Guts N Glory Defence" });
import Image from "next/image";



import CourseCard, { Course } from "../components/CourseCard";
import Link from "next/link";
import { BookOpen } from "lucide-react";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

import { getCoursesData } from "@/lib/courses";

async function getFreeCourses(sort: string): Promise<Course[]> {
  return getCoursesData("free", sort, 100) as unknown as Course[];
}

export default async function FreeCoursesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : "default";
  const courses = await getFreeCourses(sort);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="pt-28 pb-12 px-6 text-center bg-surface border-b border-edge">
        <span className="inline-block text-xs font-bold text-[#6ABF40] tracking-[2.5px] uppercase mb-3">
          Free Resources
        </span>
        <h1 className="font-heading font-black text-foreground leading-tight mb-4 text-3xl md:text-5xl uppercase tracking-tighter">
          Free <span className="text-[#6ABF40]">Courses</span>
        </h1>
        <p className="text-[1rem] text-muted max-w-[480px] mx-auto">
          High-quality defence preparation content — completely free. No hidden charges.
        </p>
        <div className="mt-4 text-sm text-muted">
          {courses.length > 0 ? `${courses.length} free resource${courses.length !== 1 ? "s" : ""} available` : ""}
        </div>
      </div>

      {/* Courses grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10 justify-center sm:justify-start">
          <Link
            href="/free-courses?sort=default"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "default" 
                ? "bg-[#6ABF40] text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-[#6ABF40]/50"
            }`}
          >
            Latest
          </Link>
          <Link
            href="/free-courses?sort=old"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "old" 
                ? "bg-[#6ABF40] text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-[#6ABF40]/50"
            }`}
          >
            Oldest
          </Link>
          <Link
            href="/free-courses?sort=popular"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "popular" 
                ? "bg-[#6ABF40] text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-[#6ABF40]/50"
            }`}
          >
            Popular
          </Link>
          <Link
            href="/free-courses?sort=trending"
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              sort === "trending" 
                ? "bg-[#6ABF40] text-[#1A1A1A]" 
                : "bg-surface text-muted border border-edge hover:border-[#6ABF40]/50"
            }`}
          >
            Trending
          </Link>
        </div>
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎓</div>
            <p className="text-muted text-base">No free courses available yet. Check back soon!</p>
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


