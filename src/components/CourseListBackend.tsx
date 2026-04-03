"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { coursesBackend } from "@/lib/data";
import { CornerBracket } from "@/components/ui/aceternity-decorations";

const COURSE_ROUTES: Record<string, string> = {
  "SQL for Web and Data Engineering": "/courses/sql",
  "JavaScript for Backend": "/courses/javascript-backend",
  "Java for Backend": "/courses/java-backend",
  "Master Git & GitHub": "/courses/master-git-github",
};

export default function CourseListBackend() {
  return (
    <section id="courses" className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-500 mb-2">Backend & Data</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3"
            style={{ fontFamily: "var(--font-bricolage)" }}>
            Backend &amp; Data Courses
          </h2>
          <p className="text-neutral-500 text-base max-w-xl">
            Master server-side development and data engineering with industry-standard tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coursesBackend.map((course, index) => {
            const href = COURSE_ROUTES[course.title];
            const card = (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-brand-300 hover:shadow-[0_8px_32px_rgba(16,185,129,0.1)] transition-all duration-300 cursor-pointer"
              >
                <CornerBracket className="absolute top-0 left-0 opacity-40 group-hover:opacity-70 transition-opacity z-10" />
                <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-40 group-hover:opacity-70 transition-opacity z-10" />

                {/* Course image */}
                <div className="relative h-48 w-full border-b border-neutral-100 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-neutral-900 mb-1.5 leading-snug group-hover:text-brand-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-brand-50 border border-brand-200 rounded-full text-[11px] font-semibold text-brand-700 uppercase tracking-wider">
                      {course.level}
                    </span>
                    {href && (
                      <span className="text-[12px] font-bold text-brand-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Start →
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );

            return href ? (
              <Link key={index} href={href}>{card}</Link>
            ) : (
              <div key={index}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
