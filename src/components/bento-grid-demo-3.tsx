"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconBriefcase,
  IconFileText,
  IconUsers,
  IconSchool,
  IconTrophy,
  IconWorld,
  IconStar,
  IconSparkles,
} from "@tabler/icons-react";
import { motion } from "motion/react";

export default function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[22rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn(item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

/* ─────────────────────────────────────────────
   SHARED: logo/avatar with fallback
───────────────────────────────────────────── */
function PhotoAvatar({
  src, alt, fallbackLabel, fallbackColor, rounded = "rounded-lg", size = "w-8 h-8", unoptimized = false,
}: {
  src: string; alt: string; fallbackLabel: string; fallbackColor: string;
  rounded?: string; size?: string; unoptimized?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`${fallbackColor} ${size} ${rounded} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
        {fallbackLabel}
      </div>
    );
  }
  return (
    <div className={`relative ${size} ${rounded} overflow-hidden shrink-0 bg-white border border-neutral-200 dark:border-white/[0.08]`}>
      <Image src={src} alt={alt} fill className="object-cover" unoptimized={unoptimized} onError={() => setFailed(true)} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   1. LIVE ENGINEERING JOBS
───────────────────────────────────────────── */
const JobsCard = () => {
  const jobs = [
    { fallback: "G", fallbackColor: "bg-blue-500",   logo: "https://logo.clearbit.com/google.com",   title: "Frontend Developer",  sub: "Google",   time: "2m ago" },
    { fallback: "S", fallbackColor: "bg-orange-500", logo: "https://logo.clearbit.com/swiggy.com",   title: "SWE Intern",          sub: "Swiggy",   time: "5m ago" },
    { fallback: "R", fallbackColor: "bg-violet-500", logo: "https://logo.clearbit.com/razorpay.com", title: "Full Stack Engineer", sub: "Razorpay", time: "8m ago" },
  ];
  return (
    <div className="relative flex flex-col flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden p-4 gap-3 bg-white dark:bg-[#111113] border border-neutral-100 dark:border-white/[0.07]">
      {/* Live indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
        </span>
        <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">Live</span>
      </div>

      {jobs.map((job, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-neutral-100 dark:border-white/[0.06] hover:border-brand-200 dark:hover:border-brand-500/30 transition-all group"
        >
          <PhotoAvatar
            src={job.logo} alt={job.sub}
            fallbackLabel={job.fallback} fallbackColor={job.fallbackColor}
            rounded="rounded-lg" size="w-8 h-8" unoptimized
          />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-neutral-800 dark:text-neutral-100 leading-none truncate">{job.title}</p>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">{job.sub}</p>
          </div>
          <span className="text-[10px] text-brand-600 dark:text-brand-400 font-medium bg-brand-50 dark:bg-brand-500/10 px-2 py-0.5 rounded-full shrink-0">{job.time}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   2. RESUME ASSIST
───────────────────────────────────────────── */
const ResumeCard = () => (
  <div className="flex flex-col flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-white dark:bg-[#111113] border border-neutral-100 dark:border-white/[0.07] p-4 gap-3">
    {/* Header bar */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IconSparkles className="w-4 h-4 text-brand-500" />
        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">AI Analysis</span>
      </div>
      <span className="text-[11px] font-bold text-white bg-brand-500 px-2.5 py-0.5 rounded-full">ATS Score: 92%</span>
    </div>

    {/* Mini resume card */}
    <div className="flex-1 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-100 dark:border-white/[0.06] p-3 flex flex-col gap-2.5">
      {/* Name + role */}
      <div>
        <div className="h-3 w-28 bg-neutral-800 dark:bg-neutral-200 rounded-full mb-1.5" />
        <div className="h-2 w-20 bg-neutral-300 dark:bg-neutral-600 rounded-full" />
      </div>

      {/* Score bar */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-[9px] text-neutral-400 uppercase tracking-wide">Match Score</span>
          <span className="text-[9px] font-bold text-brand-500">92%</span>
        </div>
        <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "92%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
          />
        </div>
      </div>

      {/* Skeleton lines */}
      {["w-full", "w-4/5", "w-3/5"].map((w, i) => (
        <div key={i} className={`h-2 ${w} bg-neutral-100 dark:bg-neutral-800 rounded-full`} />
      ))}

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap">
        {["Keywords ✓", "Format ✓", "ATS Ready"].map((tag) => (
          <span key={tag} className="text-[9px] font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-1.5 py-0.5 rounded-full border border-brand-200 dark:border-brand-500/20">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   3. FIND ALUMNI
───────────────────────────────────────────── */
const AlumniCard = () => {
  const alumni = [
    { initials: "RK", fallbackColor: "bg-blue-500",  photo: "/alumni/test_m11.jpg",  path: "IIT Delhi → Google",   role: "SWE L4"  },
    { initials: "PS", fallbackColor: "bg-pink-500",  photo: "/alumni/test_w26.jpg",  path: "BITS Pilani → Meta",   role: "SWE E4"  },
    { initials: "AM", fallbackColor: "bg-amber-500", photo: "/alumni/test_m33.jpg",  path: "NIT → Microsoft",      role: "SDE II"  },
  ];
  return (
    <div className="flex flex-col flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-white dark:bg-[#111113] border border-neutral-100 dark:border-white/[0.07] p-4 gap-3">
      {/* Counter */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Alumni Network</span>
        <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2.5 py-0.5 rounded-full">847 connected</span>
      </div>

      {/* Alumni rows */}
      <div className="flex flex-col gap-2 flex-1">
        {alumni.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-neutral-100 dark:border-white/[0.06] hover:border-brand-200 dark:hover:border-brand-500/30 transition-all"
          >
            <PhotoAvatar src={a.photo} alt={a.initials} fallbackLabel={a.initials} fallbackColor={a.fallbackColor} rounded="rounded-full" size="w-8 h-8" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 truncate leading-none">{a.path}</p>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">{a.role}</p>
            </div>
            <button className="text-[10px] text-brand-600 dark:text-brand-400 font-medium shrink-0 hover:underline">Connect</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   4. EXPERT MENTORSHIP
───────────────────────────────────────────── */
const MentorCard = () => {
  const cards = [
    {
      photo: "/mentor/pexels-italo-melo-881954-2379005.jpg",
      fallback: "AR", fallbackColor: "bg-brand-500",
      name: "Arjun R.", label: "Expert Review",
      badge: "Top Rated", badgeColor: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      stars: 5,
    },
    {
      photo: "/mentor/pexels-david-garrison-1128051-2128807.jpg",
      fallback: "MA", fallbackColor: "bg-brand-600",
      name: "Meera A.", label: "Mock Interview",
      badge: "Active", badgeColor: "bg-brand-100 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400",
      stars: 5,
    },
    {
      photo: "/mentor/pexels-danxavier-1212984.jpg",
      fallback: "SK", fallbackColor: "bg-sky-500",
      name: "Siddharth K.", label: "Career Roadmap",
      badge: "Guided", badgeColor: "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
      stars: 4,
    },
  ];
  return (
    <div className="flex flex-col flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-white dark:bg-[#111113] border border-neutral-100 dark:border-white/[0.07] p-4 gap-3">
      <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">1:1 Sessions</span>
      <div className="grid grid-cols-3 gap-2 flex-1">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-neutral-100 dark:border-white/[0.07] p-2.5 hover:border-brand-200 dark:hover:border-brand-500/20 transition-all"
          >
            <PhotoAvatar
              src={c.photo} alt={c.name}
              fallbackLabel={c.fallback} fallbackColor={c.fallbackColor}
              rounded="rounded-full" size="w-9 h-9"
            />
            <p className="text-[9px] font-semibold text-neutral-600 dark:text-neutral-300 text-center leading-tight">{c.name}</p>
            <p className="text-[8px] text-neutral-400 text-center">{c.label}</p>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, si) => (
                <IconStar key={si} className={`w-2 h-2 ${si < c.stars ? "text-amber-400 fill-amber-400" : "text-neutral-200 dark:text-neutral-700"}`} />
              ))}
            </div>
            <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${c.badgeColor}`}>{c.badge}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   5. GLOBAL HACKATHONS
───────────────────────────────────────────── */
const HackathonCard = () => {
  const leaderboard = [
    { rank: "🥇", name: "Priya Nair", score: "9,840 pts" },
    { rank: "🥈", name: "Rahul Das", score: "9,210 pts" },
    { rank: "🥉", name: "Elena Kova", score: "8,750 pts" },
  ];
  return (
    <div className="flex flex-col flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-white dark:bg-[#111113] border border-neutral-100 dark:border-white/[0.07] p-4 gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Leaderboard</span>
        <IconTrophy className="w-4 h-4 text-amber-500" />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {leaderboard.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-50 dark:bg-white/[0.04] border border-neutral-100 dark:border-white/[0.06]"
          >
            <span className="text-sm w-5 text-center">{row.rank}</span>
            <p className="flex-1 text-[12px] font-semibold text-neutral-800 dark:text-neutral-200">{row.name}</p>
            <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">{row.score}</span>
          </motion.div>
        ))}
      </div>

      {/* Countdown badge */}
      <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
        </span>
        <span className="text-[11px] font-semibold text-brand-700 dark:text-brand-300">Next hackathon in 3 days</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   6. STUDY ABROAD
───────────────────────────────────────────── */
const StudyAbroadCard = () => {
  const scholarships = [
    { name: "Erasmus+", tag: "Fully Funded", flag: "🇪🇺" },
    { name: "Chevening", tag: "UK Scholarship", flag: "🇬🇧" },
    { name: "DAAD", tag: "Germany", flag: "🇩🇪" },
  ];
  return (
    <div className="relative flex flex-col flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-white dark:bg-[#111113] border border-neutral-100 dark:border-white/[0.07] p-4 gap-3">
      {/* Subtle world pattern background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
        viewBox="0 0 400 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="200" cy="100" rx="195" ry="90" fill="none" stroke="#000" strokeWidth="1" />
        <ellipse cx="200" cy="100" rx="130" ry="90" fill="none" stroke="#000" strokeWidth="1" />
        <ellipse cx="200" cy="100" rx="65" ry="90" fill="none" stroke="#000" strokeWidth="1" />
        <line x1="5" y1="100" x2="395" y2="100" stroke="#000" strokeWidth="1" />
        <line x1="200" y1="10" x2="200" y2="190" stroke="#000" strokeWidth="1" />
        <path d="M5,60 Q100,50 200,60 Q300,70 395,60" fill="none" stroke="#000" strokeWidth="0.8" />
        <path d="M5,140 Q100,130 200,140 Q300,150 395,140" fill="none" stroke="#000" strokeWidth="0.8" />
      </svg>

      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Scholarships</span>
        <IconWorld className="w-4 h-4 text-brand-500" />
      </div>

      <div className="relative z-10 flex flex-col gap-2 flex-1">
        {scholarships.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.05] backdrop-blur-sm border border-neutral-100 dark:border-white/[0.07] hover:border-brand-200 dark:hover:border-brand-500/30 transition-all"
          >
            <span className="text-lg">{s.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-neutral-800 dark:text-neutral-200 leading-none">{s.name}</p>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">{s.tag}</p>
            </div>
            <span className="text-[9px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-200 dark:border-brand-500/20">Apply →</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ITEMS
───────────────────────────────────────────── */
const items = [
  {
    title: "Live Engineering Jobs",
    description: <span className="text-[13px]">Fresh roles pulled in near real-time, daily.</span>,
    header: <JobsCard />,
    className: "md:col-span-1",
    icon: <IconBriefcase className="h-4 w-4 text-brand-500" />,
  },
  {
    title: "ResumeAssit",
    description: <span className="text-[13px]">AI resume optimization with real-time ATS scoring.</span>,
    header: <ResumeCard />,
    className: "md:col-span-1",
    icon: <IconFileText className="h-4 w-4 text-brand-500" />,
  },
  {
    title: "Find Alumni",
    description: <span className="text-[13px]">Connect with grads already inside your dream companies.</span>,
    header: <AlumniCard />,
    className: "md:col-span-1",
    icon: <IconUsers className="h-4 w-4 text-brand-500" />,
  },
  {
    title: "Expert Mentorship",
    description: <span className="text-[13px]">1:1 mock interviews and roadmap sessions with industry experts.</span>,
    header: <MentorCard />,
    className: "md:col-span-2",
    icon: <IconSchool className="h-4 w-4 text-brand-500" />,
  },
  {
    title: "Global Hackathons",
    description: <span className="text-[13px]">Compete in monthly sprints and major global coding events.</span>,
    header: <HackathonCard />,
    className: "md:col-span-1",
    icon: <IconTrophy className="h-4 w-4 text-brand-500" />,
  },
  {
    title: "Study Abroad",
    description: <span className="text-[13px]">Explore fully-funded international scholarships worldwide.</span>,
    header: <StudyAbroadCard />,
    className: "md:col-span-1",
    icon: <IconWorld className="h-4 w-4 text-brand-500" />,
  },
];
