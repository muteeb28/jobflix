"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 px-4 overflow-hidden bg-white">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dot-grid opacity-100 pointer-events-none" />
      {/* Glow blobs */}
      <div className="absolute -left-28 top-10 w-96 h-96 bg-emerald-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-50/60 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-[7px] rounded-full bg-[#f0fdf9] border border-[#99f6e4] text-sm text-neutral-800 mb-8"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500" />
          </span>
          <span className="font-medium">New courses added every month</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-neutral-900 mb-5"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Start Your<br />Coding Adventure
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Beginner-friendly courses built for engineers who want real-world skills, not just theory.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-center gap-3"
        >
          <Link
            href="#courses"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm rounded-full transition-all shadow-[0_0_24px_rgba(16,185,129,0.4)] active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4" />
            Browse Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
