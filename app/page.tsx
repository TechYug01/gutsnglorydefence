import { constructMetadata } from "@/lib/metadata";
export const metadata = constructMetadata({ title: "Guts N Glory Defence — Forge Your Path To Glory" });

import { getCoursesData } from "@/lib/courses";
import { Course } from "./components/CourseCard";
import HomePageClient from "./components/HomePageClient";

async function getFeaturedCourses(): Promise<Course[]> {
  return getCoursesData("all", "popular", 5) as unknown as Course[];
}

export default async function Home() {
  const courses = await getFeaturedCourses();
  return <HomePageClient courses={courses} />;
}
