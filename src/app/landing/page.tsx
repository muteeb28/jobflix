
"use client";

import Link from "next/link";
import {
  BookOpen,
  TerminalSquare,
  Trophy,
  Briefcase,
  GraduationCap,
  Users,
  ArrowRight,
  Check,
  TrendingUp,
  Code2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingCard } from "@/components/landing/FloatingCard";
import { HeroBadge } from "@/components/landing/HeroBadge";
import { CornerBracket, CrossAccent, CircleCrossAccent } from "@/components/ui/aceternity-decorations";

/* ─────────────────────────────────────────────────────────────────────
   Hero floating card contents
───────────────────────────────────────────────────────────────────── */

/** Left card – upcoming sessions (like Aceternity's meetings list) */
function SessionsCard() {
  const sessions = [
    { icon: <Code2 className="w-3 h-3 text-teal-500" />, title: "Java DSA – Module 4", meta: "Today · Online" },
    { icon: <TrendingUp className="w-3 h-3 text-teal-500" />, title: "Job Fair – RIMT Univ.", meta: "Apr 10 · In-person" },
    { icon: <Briefcase className="w-3 h-3 text-teal-500" />, title: "SDE-2 Mock Round", meta: "Apr 14 · Remote" },
    { icon: <Trophy className="w-3 h-3 text-teal-500" />, title: "GSoC Info Session", meta: "Apr 18 · Online" },
  ];
  return (
    <FloatingCard className="p-4 w-52">
      <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1 font-mono">Level Up</p>
      <p className="text-[11px] font-semibold text-neutral-600 mb-2.5">Upcoming Sessions</p>
      {sessions.map((s) => (
        <div key={s.title} className="flex items-start gap-2 py-1.5 border-b border-neutral-100 last:border-0">
          <div className="mt-0.5 shrink-0">{s.icon}</div>
          <div>
            <p className="text-[11px] font-medium text-neutral-700 leading-tight">{s.title}</p>
            <p className="text-[10px] text-neutral-400">{s.meta}</p>
          </div>
        </div>
      ))}
    </FloatingCard>
  );
}

/** Left card – companies currently hiring */
function CompaniesCard() {
  const companies = ["Wipro", "TCS", "Infosys", "Razorpay", "Paytm", "CRED"];
  return (
    <FloatingCard className="p-4 w-52">
      <p className="text-[11px] font-semibold text-neutral-600 mb-3">Companies Hiring Now</p>
      <div className="flex flex-wrap gap-1.5">
        {companies.map((c) => (
          <span key={c} className="px-2 py-1 bg-neutral-50 border border-neutral-200 rounded-md text-[10px] font-semibold text-neutral-600">
            {c}
          </span>
        ))}
      </div>
    </FloatingCard>
  );
}

/** Paperclip decoration (matches Aceternity's right-side paperclip) */
function PaperclipDecoration({ className }: { className?: string }) {
  return (
    <svg width="22" height="60" viewBox="0 0 22 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer loop */}
      <rect x="1.5" y="1.5" width="19" height="57" rx="9.5" stroke="#94a3b8" strokeWidth="2.5" />
      {/* Inner clip — starts 1/3 down, shares the bottom curve */}
      <rect x="5.5" y="17" width="11" height="40.5" rx="5.5" stroke="#94a3b8" strokeWidth="2.5" />
    </svg>
  );
}

/** Job Fair flyer card with paperclip pinned on top */
function JobFairCard() {
  return (
    <div className="relative pt-6 w-52">
      {/* Paperclip pinned to the top centre of the card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 drop-shadow-sm">
        <PaperclipDecoration />
      </div>
      <FloatingCard className="p-4">
        <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-emerald-500 mb-1">Level Up · 2026</p>
        <p className="text-[13px] font-extrabold text-neutral-800 leading-snug mb-1">Job Fair</p>
        <p className="text-[10px] text-neutral-500 leading-snug mb-3">Top tech companies hiring directly from campus. Register free.</p>
        <div className="flex flex-wrap gap-1">
          {["Wipro", "TCS", "CRED", "Razorpay"].map((c) => (
            <span key={c} className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-[9px] font-semibold text-emerald-700">{c}</span>
          ))}
        </div>
        <p className="mt-3 text-[9px] text-neutral-400">Apr 10 · RIMT University · In-person</p>
      </FloatingCard>
    </div>
  );
}

/** Right cards – student achievements */
function AchievementCards() {
  const achievements = [
    { initials: "AK", color: "bg-teal-500", name: "Arjun Kumar", note: "Placed at Wipro · SDE-1" },
    { initials: "PS", color: "bg-violet-500", name: "Priya Sharma", note: "Cracked Amazon · SDE-2" },
  ];
  return (
    <div className="flex flex-col gap-2 w-56">
      {achievements.map((a) => (
        <FloatingCard key={a.name} showBrackets={false} className="p-3 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${a.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
            {a.initials}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-neutral-700 leading-tight">{a.name}</p>
            <p className="text-[10px] text-neutral-400">{a.note}</p>
          </div>
        </FloatingCard>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Services data + card
───────────────────────────────────────────────────────────────────── */

const services = [
  {
    id: "courses",
    title: "Courses",
    punchline: "Production-grade skills, not tutorial fluff.",
    description:
      "Build backend and frontend systems the way real teams do—Node.js, TypeScript, Go, SQL, React—through structured, hands-on courses.",
    bullets: [
      "Backend-first JavaScript & TypeScript",
      "Auth systems with Go + JWT",
      "SQL for real apps and data workflows",
    ],
    ctaText: "Explore Courses",
    href: "/courses",
    icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />,
  },
  {
    id: "prepare",
    title: "Prepare",
    punchline: "Practice like it's the real interview.",
    description:
      "Simulate real technical interviews in an in-browser workspace—no setup, no guesswork.",
    bullets: [
      "Interview-style coding workspace",
      "Instant test feedback",
      "Customizable layout + theming",
    ],
    ctaText: "Start Interview Prep",
    href: "/prepare",
    icon: <TerminalSquare className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />,
  },
  {
    id: "hackathons",
    title: "Hackathons",
    punchline: "Build proof, not just projects.",
    description:
      "Compete in global hackathons, fellowships, and open-source programs that hiring managers actually respect.",
    bullets: [
      "GSoC, MLH, ETHIndia, Kaggle",
      "Cash prizes, stipends, mentorship",
      "Live events + monthly sprints",
    ],
    ctaText: "Explore Live Hackathons",
    href: "/hackathons",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />,
  },
  {
    id: "jobs",
    title: "Jobs",
    punchline: "Jobs that are actually still open.",
    description:
      "Fresh engineering roles (Node.js, React, SDE-2) pulled in near real-time—so you're not applying to dead listings.",
    bullets: [
      "Minutes-old listings",
      "Role-focused: frontend, backend, SDE",
      "Less noise, more signal",
    ],
    ctaText: "Browse Fresh Jobs",
    href: "/jobs",
    icon: <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />,
  },
  {
    id: "scholarships",
    title: "Scholarships",
    punchline: "Education without the financial chokehold.",
    description:
      "Fully and partially funded scholarships to help you study abroad or upskill—without crushing debt.",
    bullets: [
      "Global + regional programs",
      "Merit-based + need-based",
      "Clear requirements + timelines",
    ],
    ctaText: "Explore Scholarships",
    href: "/study-abroad",
    icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />,
  },
  {
    id: "mentorship",
    title: "Mentorship",
    punchline: "Guidance from people who've done it.",
    description:
      "Get matched with mentors based on the role, company, and career path you're targeting.",
    bullets: [
      "Role-specific guidance",
      "Company-aware advice",
      "Actionable roadmap sessions",
    ],
    ctaText: "Find a Mentor",
    href: "/mentorship",
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />,
  },
];

type Service = (typeof services)[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      style={{ animationDelay: `${index * 50}ms` }}
      className="relative flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:border-teal-300 hover:-translate-y-1.5 hover:shadow-[0_4px_20px_rgba(20,184,166,0.12)] transition-all duration-300 animate-fade-in-up"
    >
      <CornerBracket className="absolute top-0 left-0 opacity-60" />
      <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-60" />
      <CornerBracket className="absolute bottom-0 left-0 -rotate-90 opacity-60" />
      <CornerBracket className="absolute bottom-0 right-0 rotate-180 opacity-60" />

      <div className="relative flex items-center justify-between">
        <div className="p-3 rounded-lg border border-neutral-200 bg-neutral-50">
          {service.icon}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400">
          {`Pillar ${index + 1}/6`}
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-xl font-bold uppercase tracking-wide text-neutral-900">{service.title}</h3>
        <p className="text-teal-600 text-sm font-mono">{service.punchline}</p>
        <p className="text-sm text-neutral-500 font-sans leading-relaxed mt-1">{service.description}</p>
      </div>

      <ul className="mt-2 space-y-2">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-neutral-500 font-sans">
            <Check className="w-4 h-4 text-teal-500 mt-[2px] shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3 border-t border-neutral-100">
        <Link
          href={service.href}
          className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-600 hover:text-teal-700 transition-colors"
        >
          {service.ctaText}
          <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────── */

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-20 px-4 md:px-6 relative overflow-hidden">
        {/* ── Background ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-dot-grid opacity-100" />
          <div className="absolute -left-28 top-10 w-96 h-96 bg-emerald-100/40 blur-[120px]" />
          <div className="absolute right-[-120px] bottom-[-80px] w-[520px] h-[520px] bg-emerald-50/60 blur-[140px]" />
        </div>

        {/* ── Decorative accents ── */}
        <CircleCrossAccent className="absolute top-16 right-[7%] hidden xl:block pointer-events-none opacity-50 z-10" />
        <CrossAccent className="absolute bottom-44 right-[12%] hidden xl:block pointer-events-none opacity-25 z-10" />

        <div className="container mx-auto max-w-7xl relative z-10">

          {/* ══════════════════════════════════════════════
              HERO
          ══════════════════════════════════════════════ */}
          <div className="mb-16 md:mb-24">

            {/* ── Desktop: 3-column layout ── */}
            <div className="hidden lg:grid grid-cols-[210px_1fr_230px] gap-8 items-start rounded-3xl border border-neutral-200/80 bg-white/60 backdrop-blur-sm px-6 pt-4 pb-10 shadow-[0_2px_24px_rgba(0,0,0,0.04)]">

              {/* Left floating cards column — absolute positioning for exact placement */}
              <div className="relative pointer-events-none" style={{ minHeight: "520px" }}>
                {/* Sessions card — beside description area */}
                <div
                  className="absolute top-[210px] left-0 -rotate-6 animate-fade-in-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <SessionsCard />
                </div>
                {/* Companies card — lower, more tilted */}
                <div
                  className="absolute top-[400px] left-0 -rotate-12 animate-fade-in-up"
                  style={{ animationDelay: "480ms" }}
                >
                  <CompaniesCard />
                </div>
              </div>

              {/* Center text */}
              <div className="text-center pt-6">
                <div className="animate-fade-in-up">
                  <HeroBadge text="Now Live · Level Up Job Fair 2026 — Register Free" />
                </div>

                <h1
                  style={{ animationDelay: "100ms", fontFamily: "var(--font-bricolage)" }}
                  className="text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-5 animate-fade-in-up text-neutral-900"
                >
                  Prepare Smarter.<br />
                  Land Your Dream Role.
                </h1>

                <div className="max-w-md mx-auto">
                  <p
                    style={{ animationDelay: "200ms" }}
                    className="text-neutral-500 text-base md:text-lg font-sans leading-relaxed animate-fade-in-up"
                  >
                    Curated courses, live mock interviews, and real job opportunities—built for engineers in a tough market.
                  </p>

                  <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
                    <Link
                      href="/courses"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm rounded-full transition-all tracking-wider shadow-[0_0_24px_rgba(16,185,129,0.4)]"
                    >
                      Get started — it&apos;s free <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right floating cards column — absolute positioning for exact placement */}
              <div className="relative pointer-events-none" style={{ minHeight: "520px" }}>
                {/* Job Fair flyer with paperclip pinned on top */}
                <div
                  className="absolute top-[160px] right-2 rotate-2 animate-fade-in-up"
                  style={{ animationDelay: "280ms" }}
                >
                  <JobFairCard />
                </div>
                {/* Achievement cards below */}
                <div
                  className="absolute top-[380px] right-0 -rotate-1 animate-fade-in-up"
                  style={{ animationDelay: "420ms" }}
                >
                  <AchievementCards />
                </div>
              </div>
            </div>

            {/* ── Mobile: single column ── */}
            <div className="lg:hidden text-center">
              <div className="animate-fade-in-up">
                <HeroBadge text="Level Up Job Fair 2026 — Register Free" />
              </div>

              <h1
                style={{ fontFamily: "var(--font-bricolage)" }}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5 text-neutral-900 animate-fade-in-up"
              >
                Prepare Smarter.<br />
                Land Your Dream Role.
              </h1>

              <p className="text-neutral-500 text-base leading-relaxed mb-8 animate-fade-in-up max-w-sm mx-auto">
                Curated courses, live mock interviews, and real job opportunities—built for engineers in a tough market.
              </p>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm rounded-full transition-all tracking-wider shadow-[0_0_24px_rgba(20,184,166,0.35)] animate-fade-in-up"
              >
                Get started — it&apos;s free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              SERVICE HUB
          ══════════════════════════════════════════════ */}
          <section
            id="service-hub"
            aria-labelledby="service-hub-title"
            className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h2 id="service-hub-title" className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                  Everything You Need to Get Ahead—In One Place
                </h2>
                <p className="text-neutral-600 font-sans mt-2">
                  Built for engineers navigating a brutally competitive market.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={service.id} service={service} index={idx} />
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* ══════════════════════════════════════════════
          PRICING TEASER
      ══════════════════════════════════════════════ */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-teal-600">Pricing</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                  Plans built for engineers in a tough market
                </h2>
                <p className="text-neutral-600 font-sans mt-2 max-w-2xl">
                  Choose the pace that fits you—monthly, quarterly, or annual—all with premium interview prep and learning paths.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs md:text-sm rounded-full transition-all uppercase tracking-[0.18em] shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0"
              >
                View Pricing
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                { title: "Monthly", price: "₹1,700", cadence: "/month", note: "Billed monthly", href: "/jobs" },
                { title: "Quarterly", price: "₹1,300", cadence: "/month", note: "Billed quarterly (₹3,700)", href: "/prepare" },
                { title: "Annual", price: "₹430", cadence: "/month", note: "Billed yearly (₹5,100)", href: "/courses", badge: "Recommended" },
              ].map((plan) => (
                <div
                  key={plan.title}
                  className={`relative rounded-2xl border bg-neutral-50 p-4 md:p-5 ${plan.badge ? "border-teal-200" : "border-neutral-200"}`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 right-3 bg-teal-500 text-white text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <div className="text-sm text-neutral-500 font-bold uppercase tracking-[0.2em]">{plan.title}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-neutral-900">{plan.price}</span>
                    <span className="text-neutral-500 text-sm">{plan.cadence}</span>
                  </div>
                  <div className="text-neutral-400 text-sm mt-1">{plan.note}</div>
                  <Link
                    href={plan.href}
                    className="mt-4 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full border border-neutral-200 text-neutral-600 font-bold uppercase tracking-[0.16em] hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-colors text-xs"
                  >
                    Buy now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
