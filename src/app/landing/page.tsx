"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  TerminalSquare,
  Trophy,
  Briefcase,
  ArrowRight,
  Check,
  Zap,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActiveUsers from "@/components/ActiveUsers";
import OnlineIndicator from "@/components/ui/OnlineIndicator";
import SocialProofToast from "@/components/ui/SocialProofToast";
import { FloatingCard } from "@/components/landing/FloatingCard";
import { HeroBadge } from "@/components/landing/HeroBadge";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { FlipWords } from "@/components/ui/flip-words";
import BentoGridThirdDemo from "@/components/bento-grid-demo-3";
import WorldMapDemo from "@/components/world-map-demo";

/* ── Spring presets ─────────────────────────────────────────────── */
const spring = { type: "spring" as const, stiffness: 80, damping: 20 };
const springFast = { type: "spring" as const, stiffness: 120, damping: 22 };

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ ...spring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero floating cards ─────────────────────────────────────────── */
function PaperclipDecoration({ className }: { className?: string }) {
  return (
    <svg 
      width="24" 
      height="64" 
      viewBox="0 0 24 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} drop-shadow-sm`}
    >
      <path 
        d="M16 4V54C16 58.4183 12.4183 62 8 62C3.58172 62 0 58.4183 0 54V16C0 10.4772 4.47715 6 10 6C15.5228 6 20 10.4772 20 16V48C20 50.2091 18.2091 52 16 52C13.7909 52 12 50.2091 12 48V12" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="text-neutral-400 dark:text-zinc-500"
      />
    </svg>
  );
}

function JobFairCard() {
  return (
    <div className="relative group/parent">
      <div className="absolute -top-10 left-4 z-30 transition-transform group-hover/parent:rotate-12 group-hover/parent:scale-110 duration-500 pointer-events-none">
        <PaperclipDecoration />
      </div>
      <Link href="/jobs">
        <FloatingCard tabText="Synergy Summit" className="p-5 w-[220px] mt-4 hover:shadow-2xl transition-all duration-300 border-indigo-500/20 dark:border-indigo-500/10">
          <div className="pt-0.5">
            <h4 className="text-[17px] font-black text-neutral-900 dark:text-zinc-100 tracking-tight leading-tight mb-1 uppercase">Career Synergy Summit</h4>
            <p className="text-[11px] font-black text-brand-600 dark:text-brand-400 mb-3 tracking-wider uppercase">Mega Job Carnival</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-neutral-400 dark:text-zinc-500 uppercase">Venue</span>
                <span className="text-[10px] font-bold text-neutral-700 dark:text-zinc-300">RIMT University, Punjab</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-neutral-400 dark:text-zinc-500 uppercase">Date</span>
                <span className="text-[10px] font-bold text-neutral-700 dark:text-zinc-300">10-11 April, 2026</span>
              </div>
            </div>

            <div className="bg-brand-500/10 border border-brand-500/20 rounded-lg p-2.5 mb-4">
              <p className="text-[10px] font-black text-brand-700 dark:text-brand-400 uppercase leading-none mb-1">Package: 30+ LPA</p>
              <p className="text-[9px] font-bold text-brand-600/80 dark:text-brand-400/80">25+ Companies Participating</p>
            </div>

            <button className="w-full py-2.5 bg-brand-600 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-brand-500 active:scale-95 transition-all shadow-lg shadow-brand-500/10">
              Register Now
            </button>
          </div>
        </FloatingCard>
      </Link>
    </div>
  );
}

/* ── Product mockup panels ──────────────────────────────────────── */
function PrepMockup() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-neutral-200 dark:border-white/[0.06] px-4 pt-3 gap-1">
        {["Problem", "Solution", "Tests"].map((t, i) => (
          <span
            key={t}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-t transition-colors ${i === 0 ? "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400 border-b-2 border-brand-500" : "text-neutral-400 dark:text-zinc-500"}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Problem statement */}
        <div className="w-[42%] border-r border-neutral-200 dark:border-white/[0.06] p-4 overflow-y-auto">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-zinc-100 mb-1">1. Two Sum</h3>
          <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 rounded-full mb-3">Easy</span>
          <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed mb-3">
            Given an array of integers <code className="text-brand-600 dark:text-brand-400 font-mono bg-brand-50 dark:bg-brand-500/10 px-1 rounded">nums</code> and an integer <code className="text-brand-600 dark:text-brand-400 font-mono bg-brand-50 dark:bg-brand-500/10 px-1 rounded">target</code>, return indices of the two numbers such that they add up to target.
          </p>
          <div className="bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] rounded-lg p-3">
            <p className="text-[10px] font-bold text-neutral-700 dark:text-zinc-300 mb-1.5">Example 1:</p>
            <p className="font-mono text-[10px] text-neutral-500 dark:text-zinc-400">Input: nums = [2,7,11,15], target = 9</p>
            <p className="font-mono text-[10px] text-brand-600 dark:text-brand-400 mt-0.5">Output: [0,1]</p>
          </div>
        </div>
        {/* Code editor */}
        <div className="flex-1 p-4 bg-neutral-950 dark:bg-[#0d0d10] font-mono text-[11px] overflow-y-auto">
          <div className="text-zinc-600 mb-1.5">{"// Two Sum — O(n) solution"}</div>
          <div className="leading-relaxed">
            <div><span className="text-violet-400">function</span> <span className="text-sky-400">twoSum</span><span className="text-zinc-300">(nums, target) {"{"}</span></div>
            <div className="pl-4"><span className="text-violet-400">const</span><span className="text-zinc-300"> map = </span><span className="text-sky-400">new</span><span className="text-zinc-300"> Map();</span></div>
            <div className="pl-4"><span className="text-violet-400">for</span><span className="text-zinc-300"> (</span><span className="text-violet-400">let</span><span className="text-zinc-300"> i = 0; i {"<"} nums.length; i++) {"{"}</span></div>
            <div className="pl-8"><span className="text-violet-400">const</span><span className="text-zinc-300"> comp = target - nums[i];</span></div>
            <div className="pl-8"><span className="text-violet-400">if</span><span className="text-zinc-300"> (map.has(comp)) </span><span className="text-violet-400">return</span><span className="text-zinc-300"> [map.get(comp), i];</span></div>
            <div className="pl-8"><span className="text-zinc-300">map.set(nums[i], i);</span></div>
            <div className="pl-4"><span className="text-zinc-300">{"}"}</span></div>
            <div><span className="text-zinc-300">{"}"}</span></div>
          </div>
          <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-brand-400 text-[10px] font-bold">All 29 test cases passed · Runtime 68ms · Memory 44MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobsMockup() {
  const jobs = [
    { role: "SDE-2 · Backend Engineer", company: "Razorpay", location: "Bangalore · Hybrid", salary: "₹35–50 LPA", tag: "2m ago", fresh: true },
    { role: "Frontend Engineer", company: "CRED", location: "Remote", salary: "₹28–42 LPA", tag: "8m ago", fresh: true },
    { role: "Full-Stack Developer", company: "Paytm", location: "Noida · On-site", salary: "₹20–32 LPA", tag: "15m ago", fresh: false },
    { role: "Node.js Developer", company: "Swiggy", location: "Bangalore · Remote", salary: "₹24–38 LPA", tag: "1h ago", fresh: false },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-white/[0.06]">
        <div className="flex-1 bg-neutral-100 dark:bg-white/[0.05] rounded-lg px-3 py-1.5 text-[11px] text-neutral-400 dark:text-zinc-500 font-mono">Search roles, companies...</div>
        {["Remote", "Backend", "₹20L+"].map((f) => (
          <span key={f} className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-[10px] font-semibold text-brand-700 dark:text-brand-400">
            {f}
          </span>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-white/[0.04]">
        {jobs.map((job) => (
          <div key={job.role + job.company} className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.06] flex items-center justify-center text-[10px] font-bold text-neutral-600 dark:text-zinc-300 border border-neutral-200 dark:border-white/[0.06]">
                {job.company[0]}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-neutral-800 dark:text-zinc-200">{job.role}</p>
                <p className="text-[10px] text-neutral-400 dark:text-zinc-500">{job.company} · {job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-neutral-600 dark:text-zinc-400 hidden sm:block">{job.salary}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${job.fresh ? "bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400" : "bg-neutral-100 dark:bg-white/[0.05] text-neutral-400 dark:text-zinc-500"}`}>
                {job.tag}
              </span>
              <button className="px-3 py-1 bg-brand-500 hover:bg-brand-400 text-white text-[10px] font-bold rounded-full transition-colors">Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesMockup() {
  const lessons = [
    { num: "01", title: "Node.js Fundamentals", done: true },
    { num: "02", title: "Express + REST APIs", done: true },
    { num: "03", title: "Auth with JWT & Cookies", done: false, active: true },
    { num: "04", title: "Database Design with SQL", done: false },
    { num: "05", title: "Testing & CI/CD", done: false },
  ];
  return (
    <div className="h-full flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[200px] border-r border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02] flex flex-col shrink-0">
        <div className="px-4 py-3 border-b border-neutral-200 dark:border-white/[0.06]">
          <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 mb-0.5">Module 1</p>
          <p className="text-[12px] font-bold text-neutral-800 dark:text-zinc-200 leading-snug">Backend with Node.js</p>
          <div className="mt-2.5 h-1 bg-neutral-200 dark:bg-white/[0.07] rounded-full overflow-hidden">
            <div className="h-full w-2/5 bg-brand-500 rounded-full" />
          </div>
          <p className="text-[10px] text-neutral-400 dark:text-zinc-600 mt-1">2 of 5 complete</p>
        </div>
        <div className="overflow-y-auto flex-1 py-2">
          {lessons.map((l) => (
            <div
              key={l.num}
              className={`flex items-center gap-2.5 px-4 py-2 text-[11px] transition-colors ${l.active ? "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 font-semibold" : l.done ? "text-neutral-400 dark:text-zinc-600" : "text-neutral-600 dark:text-zinc-400"}`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${l.done ? "bg-brand-500" : l.active ? "border-2 border-brand-500" : "border border-neutral-300 dark:border-white/[0.1]"}`}>
                {l.done && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
              <span className="leading-snug">{l.title}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-5 overflow-y-auto">
        <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 mb-2">Lesson 3</p>
        <h3 className="text-[15px] font-bold text-neutral-900 dark:text-zinc-100 mb-2">Auth with JWT &amp; Cookies</h3>
        <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed mb-4">
          Learn how to implement stateless authentication using JSON Web Tokens and secure HttpOnly cookies in production Node.js apps.
        </p>
        <div className="bg-neutral-950 dark:bg-[#0d0d10] rounded-lg p-3 font-mono text-[10px] leading-relaxed">
          <div className="text-zinc-600 mb-1">{"// Generate JWT token"}</div>
          <div><span className="text-violet-400">const</span><span className="text-zinc-300"> token = jwt.</span><span className="text-sky-400">sign</span><span className="text-zinc-300">(</span></div>
          <div className="pl-4"><span className="text-zinc-300">{"{ userId: user.id, role: user.role },"}</span></div>
          <div className="pl-4"><span className="text-sky-400">process.env</span><span className="text-zinc-300">.JWT_SECRET,</span></div>
          <div className="pl-4"><span className="text-zinc-300">{"{ expiresIn: "}</span><span className="text-amber-400">&quot;7d&quot;</span><span className="text-zinc-300">{" }"}</span></div>
          <div><span className="text-zinc-300">);</span></div>
        </div>
      </div>
    </div>
  );
}

function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<"prep" | "jobs" | "courses">("prep");

  const tabs = [
    { id: "prep" as const, label: "Interview Prep", icon: <TerminalSquare className="w-3.5 h-3.5" /> },
    { id: "jobs" as const, label: "Job Board", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: "courses" as const, label: "Courses", icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  const urls: Record<typeof activeTab, string> = {
    prep: "jobflix.app/prepare",
    jobs: "jobflix.app/jobs",
    courses: "jobflix.app/courses",
  };

  return (
    <section className="mb-24">
      <FadeUp className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/[0.08] border border-brand-200 dark:border-brand-500/20 text-[11px] font-semibold text-brand-700 dark:text-brand-400 mb-5">
          <Sparkles className="w-3 h-3" />
          See it in action
        </div>
        <h2
          style={{ fontFamily: "var(--font-bricolage)" }}
          className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.02] bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-4"
        >
          Built for every stage<br className="hidden md:block" /> of your journey.
        </h2>
        <p className="text-neutral-500 dark:text-zinc-400 text-base max-w-lg mx-auto leading-relaxed">
          From learning and practicing to applying and landing — Level Up is your all-in-one career operating system.
        </p>
      </FadeUp>

      {/* Tab switcher */}
      <FadeUp delay={0.06} className="flex justify-center mb-7">
        <div className="inline-flex rounded-full border border-neutral-200 dark:border-white/[0.08] bg-neutral-50 dark:bg-white/[0.02] p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-white dark:bg-white/[0.08] text-neutral-900 dark:text-zinc-100 shadow-sm border border-neutral-200 dark:border-white/[0.1]"
                  : "text-neutral-400 dark:text-zinc-500 hover:text-neutral-700 dark:hover:text-zinc-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Browser mockup */}
      <FadeUp delay={0.1}>
        <div className="relative rounded-3xl overflow-hidden border border-brand-100 dark:border-brand-500/20 bg-gradient-to-br from-brand-50/80 via-white to-white dark:from-brand-500/[0.07] dark:via-[#09090b] dark:to-[#09090b] p-3 md:p-6 shadow-[0_24px_80px_rgba(16,185,129,0.07)] dark:shadow-[0_24px_80px_rgba(16,185,129,0.04)]">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-brand-100/80 dark:bg-brand-500/[0.06] blur-[70px] rounded-full" />

          <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-white/[0.08] shadow-2xl">
            {/* Browser chrome */}
            <div className="bg-neutral-100 dark:bg-[#18181b] px-4 py-2.5 flex items-center gap-3 border-b border-neutral-200 dark:border-white/[0.06]">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-2 bg-white dark:bg-white/[0.05] border border-neutral-200 dark:border-white/[0.06] rounded-full px-4 py-1 text-[11px] text-neutral-400 dark:text-zinc-500 font-mono text-center">
                {urls[activeTab]}
              </div>
              <div className="w-14 shrink-0" />
            </div>
            {/* Animated content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="bg-white dark:bg-[#09090b] h-[300px] md:h-[400px] overflow-hidden"
            >
              {activeTab === "prep" && <PrepMockup />}
              {activeTab === "jobs" && <JobsMockup />}
              {activeTab === "courses" && <CoursesMockup />}
            </motion.div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-neutral-900 dark:text-zinc-100 font-sans flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-14 relative overflow-hidden">
        <HeroHighlight containerClassName="h-auto py-12 md:py-16 lg:py-24" className="w-full">
          <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 z-10 flex flex-col items-center text-center">
            {/* ════════════════════════════════════════════
                HERO CONTENT (CENTERED)
            ════════════════════════════════════════════ */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: spring } }}
              initial="hidden"
              animate="show"
              className="z-20 w-full max-w-4xl mx-auto"
            >
              <Link href="/jobs">
                <HeroBadge text="Now Live · Career Synergy Summit 2026 — Join Now" className="mb-6 hover:scale-105 cursor-pointer transition-transform" />
              </Link>

              <h1
                style={{ fontFamily: "var(--font-bricolage)" }}
                className="text-[44px] md:text-[68px] lg:text-[84px] font-extrabold tracking-tighter leading-[0.95] mb-8"
              >
                <span className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-500 dark:from-white dark:via-white dark:to-neutral-400 bg-clip-text text-transparent">
                  Prepare
                </span>{" "}
                <FlipWords words={["Smarter.", "Faster.", "Better.", "Stronger."]} className="text-brand-500" />
                <br />
                <span className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-500 dark:from-white dark:via-white dark:to-neutral-400 bg-clip-text text-transparent">
                  Land Your
                </span>{" "}
                <Highlight className="text-white dark:text-white">Dream Role.</Highlight>
              </h1>

              <p className="text-neutral-500 dark:text-zinc-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Curated courses, live mock interviews, and real job opportunities—all in one place. Jobflix is your carrier operating system.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                <Link
                  href="/courses"
                  className="flex items-center justify-center w-64 h-14 bg-gradient-to-b from-brand-500 to-brand-600 dark:from-brand-500/80 dark:to-brand-400 border border-brand-700 rounded-xl text-white font-bold text-lg tracking-tight transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14.8px_rgba(0,0,0,0.2)]"
                >
                  Get started — it&apos;s free <ArrowRight className="ml-2 w-5 h-4" />
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center justify-center w-64 h-14 border border-neutral-200 dark:border-white/[0.1] rounded-xl text-neutral-800 dark:text-zinc-200 font-bold text-lg transition-all hover:bg-neutral-50 dark:hover:bg-white/[0.05] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore courses
                </Link>
              </div>

              {/* Stats row centered */}
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8 border-t border-neutral-100 dark:border-white/[0.06]">
                {[
                  { value: "6", label: "Learning pillars" },
                  { value: "70+", label: "Practice problems" },
                  { value: "Live", label: "Job listings" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">{stat.value}</p>
                    <p className="text-[11px] text-neutral-400 dark:text-zinc-500 uppercase tracking-[0.14em]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Single Floating Element - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ...spring, delay: 0.6 }}
              className="hidden lg:block absolute left-2 xl:left-[-115px] 2xl:left-[-220px] top-[35%] pointer-events-auto z-30"
            >
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="rotate-[-5deg]">
                <JobFairCard />
              </motion.div>
            </motion.div>

            {/* Colorful playful circles/blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-[10%] left-[10%] w-32 h-32 rounded-full bg-brand-500/10 blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full bg-brand-500/10 blur-3xl"
              />
            </div>
          </div>
        </HeroHighlight>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10 -mt-16">

          {/* ════════════════════════════════════════════
              STATS TICKER
          ════════════════════════════════════════════ */}
          <FadeUp className="mb-20">
            <div className="rounded-full border border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-white/[0.02] px-6 py-3.5 flex flex-wrap items-center justify-around gap-5">
              {[
                { icon: <BookOpen className="w-4 h-4 text-brand-500" />, text: "Production-grade courses" },
                { icon: <TerminalSquare className="w-4 h-4 text-brand-500" />, text: "70+ interview problems" },
                { icon: <Briefcase className="w-4 h-4 text-brand-500" />, text: "Real-time job listings" },
                { icon: <Trophy className="w-4 h-4 text-brand-500" />, text: "Global hackathons" },
                { icon: <Zap className="w-4 h-4 text-brand-500" />, text: "AI-powered prep" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  {icon}
                  <span className="text-[12px] font-medium text-neutral-500 dark:text-zinc-400 tracking-wide whitespace-nowrap">{text}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ════════════════════════════════════════════
              FEATURES — 3 columns
          ════════════════════════════════════════════ */}
          <section className="mb-24">
            <FadeUp className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/[0.08] border border-brand-200 dark:border-brand-500/20 text-[11px] font-semibold text-brand-700 dark:text-brand-400 mb-5">
                <Sparkles className="w-3 h-3" />
                How it works
              </div>
              <h2
                style={{ fontFamily: "var(--font-bricolage)" }}
                className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.02] bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-4"
              >
                Go from question<br className="hidden md:block" /> to hired.
              </h2>
              <p className="text-neutral-500 dark:text-zinc-400 text-base max-w-lg mx-auto leading-relaxed">
                One platform to practice, apply, and land the job — no bouncing between tools.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <TerminalSquare className="w-5 h-5 text-brand-600 dark:text-brand-400" />,
                  step: "01",
                  title: "Practice like it\u2019s real",
                  desc: "Solve interview-style DSA problems in an in-browser workspace. Run code, get instant test feedback, and identify exactly where you need to improve.",
                },
                {
                  icon: <Briefcase className="w-5 h-5 text-brand-600 dark:text-brand-400" />,
                  step: "02",
                  title: "Apply to fresh listings",
                  desc: "Browse job roles pulled in near real-time — no stale postings, no noise. Every listing is verified open and ready for your application.",
                },
                {
                  icon: <Trophy className="w-5 h-5 text-brand-600 dark:text-brand-400" />,
                  step: "03",
                  title: "Land your offer",
                  desc: "Build a strong profile through courses, hackathons, and mentorship. Walk into every interview with confidence backed by real preparation.",
                },
              ].map(({ icon, step, title, desc }, i) => (
                <FadeUp key={step} delay={i * 0.07}>
                  <div className="relative flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-white/[0.07] bg-white dark:bg-[#111113] p-7 h-full hover:border-brand-200 dark:hover:border-brand-500/20 hover:shadow-md dark:hover:shadow-none transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-2xl bg-brand-50 dark:bg-brand-500/10 border border-brand-100 dark:border-brand-500/20">
                        {icon}
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-neutral-300 dark:text-zinc-600">{step}</span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-zinc-100">{title}</h3>
                    <p className="text-sm text-neutral-500 dark:text-zinc-500 leading-relaxed">{desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════
              PRODUCT SHOWCASE
          ════════════════════════════════════════════ */}
          <ProductShowcase />

          {/* ════════════════════════════════════════════
              JOBFLIX CORE FEATURES (Bento Grid)
          ════════════════════════════════════════════ */}
          <section className="mb-32">
            <FadeUp className="mb-12 text-center">
              <h2
                style={{ fontFamily: "var(--font-bricolage)" }}
                className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-[1.02] bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-4"
              >
                Everything you need<br className="hidden md:block" /> to land the role.
              </h2>
              <p className="text-neutral-500 dark:text-zinc-400 text-base max-w-lg mx-auto leading-relaxed">
                Built for engineers who refuse to compete fair in a brutal market
              </p>
            </FadeUp>
            <BentoGridThirdDemo />
          </section>

          {/* ════════════════════════════════════════════
              WORLD MAP (Alumni Distribution)
          ════════════════════════════════════════════ */}
          <WorldMapDemo />

        </div>

        {/* ════════════════════════════════════════════
            PRICING
        ════════════════════════════════════════════ */}
        <section className="px-4 md:px-6 mb-24">
          <div className="container mx-auto max-w-7xl">
            <div className="rounded-3xl border border-neutral-200 dark:border-white/[0.07] bg-neutral-50 dark:bg-[#111113] p-8 md:p-12">
              <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-brand-600 dark:text-brand-400/70 mb-3">Pricing</p>
                  <h2
                    style={{ fontFamily: "var(--font-bricolage)" }}
                    className="text-3xl md:text-4xl font-extrabold tracking-tighter text-neutral-900 dark:text-zinc-100 leading-tight"
                  >
                    Plans built for engineers<br className="hidden md:block" /> in a tough market
                  </h2>
                  <p className="text-neutral-500 dark:text-zinc-500 text-sm mt-2 max-w-lg leading-relaxed">
                    Choose the pace that fits you—monthly, quarterly, or annual.
                  </p>
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm rounded-full transition-all uppercase tracking-[0.14em] hover:shadow-[0_0_32px_8px_rgba(16,185,129,0.15)] hover:scale-[1.02] shrink-0"
                >
                  View Pricing
                </Link>
              </FadeUp>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: "Monthly", price: "₹1,700", cadence: "/month", note: "Billed monthly", href: "/jobs", badge: null },
                  { title: "Quarterly", price: "₹1,300", cadence: "/month", note: "Billed quarterly (₹3,700)", href: "/prepare", badge: null },
                  { title: "Annual", price: "₹430", cadence: "/month", note: "Billed yearly (₹5,100)", href: "/courses", badge: "Best Value" },
                ].map((plan, i) => (
                  <motion.div
                    key={plan.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...springFast, delay: i * 0.08 }}
                    className={`relative rounded-3xl p-6 border transition-all duration-300 ${
                      plan.badge
                        ? "border-brand-200 dark:border-brand-500/30 bg-brand-50 dark:bg-brand-500/[0.04]"
                        : "border-neutral-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] hover:border-neutral-300 dark:hover:border-white/[0.12]"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3 right-5 bg-brand-500 text-white text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                    <div className="text-[10px] font-mono text-neutral-400 dark:text-zinc-500 uppercase tracking-[0.22em] mb-3">{plan.title}</div>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-3xl font-bold text-neutral-900 dark:text-zinc-100 tracking-tight">{plan.price}</span>
                      <span className="text-neutral-400 dark:text-zinc-500 text-sm">{plan.cadence}</span>
                    </div>
                    <div className="text-neutral-400 dark:text-zinc-600 text-xs mb-6">{plan.note}</div>
                    <Link
                      href={plan.href}
                      className={`inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full font-bold uppercase tracking-[0.14em] text-xs transition-all hover:scale-[1.02] ${
                        plan.badge
                          ? "bg-brand-500 hover:bg-brand-400 text-white hover:shadow-[0_0_24px_4px_rgba(16,185,129,0.2)]"
                          : "border border-neutral-200 dark:border-white/[0.1] hover:border-neutral-300 dark:hover:border-white/[0.2] text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 bg-white dark:bg-white/[0.03]"
                      }`}
                    >
                      Get started
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            FINAL CTA
        ════════════════════════════════════════════ */}
        <section className="px-4 md:px-6 pb-28">
          <div className="container mx-auto max-w-7xl">
            <FadeUp>
              <div className="relative overflow-hidden rounded-3xl border border-brand-200 dark:border-brand-500/20 bg-gradient-to-br from-brand-50 via-white to-brand-50/30 dark:from-brand-500/10 dark:via-transparent dark:to-transparent p-12 md:p-20 text-center">
                {/* Glow */}
                <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-brand-200/60 dark:bg-brand-500/10 blur-[60px] rounded-full" />
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-40" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/[0.06] border border-brand-200 dark:border-brand-500/20 text-[11px] font-semibold text-brand-700 dark:text-brand-400 mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    Start today — it&apos;s free
                  </div>

                  <h2
                    style={{ fontFamily: "var(--font-bricolage)" }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-4 leading-tight"
                  >
                    Your next role is<br /> closer than you think.
                  </h2>
                  <p className="text-neutral-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                    Join thousands of engineers leveling up their skills, cracking interviews, and landing top-tier jobs.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white hover:bg-neutral-700 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-sm rounded-full transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_8px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.15)]"
                    >
                      Start for free <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/jobs"
                      className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-200 dark:border-white/[0.1] hover:border-neutral-300 dark:hover:border-white/[0.2] text-neutral-700 dark:text-zinc-300 font-semibold text-sm rounded-full bg-white dark:bg-white/[0.03] transition-all hover:scale-[1.02]"
                    >
                      Browse live jobs
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
      <ActiveUsers />

      {/* Real-time online indicator and Social Proof toast — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 hover:z-[60]">
        <SocialProofToast />
        <OnlineIndicator />
      </div>
    </div>
  );
}
