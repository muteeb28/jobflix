
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Cpu,
  BookOpen,
  TerminalSquare,
  Trophy,
  Briefcase,
  GraduationCap,
  Users,
  ArrowRight,
  Check,
  Zap,
  TrendingUp,
  Code2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── Aceternity decorative SVGs ────────────────────────────────── */
function CornerBracket({ className }: { className?: string }) {
  return (
    <svg fill="none" height="11" viewBox="0 0 11 11" width="11" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11 1L11 11L10 11L10 7C10 3.68629 7.31371 1 4 1L-4.37114e-08 1L0 -4.80825e-07L11 4.37114e-07L11 1Z" fill="#cbd5e1" />
    </svg>
  );
}

function CrossAccent({ className }: { className?: string }) {
  return (
    <svg fill="none" height="21" viewBox="0 0 22 21" width="22" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.5 4C10.5 7.31371 7.81371 10 4.5 10H0.5V11H4.5C7.81371 11 10.5 13.6863 10.5 17V21H11.5V17C11.5 13.6863 14.1863 11 17.5 11H21.5V10H17.5C14.1863 10 11.5 7.31371 11.5 4V0H10.5V4Z" fill="#cbd5e1" />
    </svg>
  );
}

function CircleCrossAccent({ className }: { className?: string }) {
  return (
    <svg fill="none" height="47" viewBox="0 0 47 47" width="47" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 18C24 21.3137 26.6863 24 30 24H34V25H30C26.6863 25 24 27.6863 24 31V35H23V31C23 27.6863 20.3137 25 17 25H13V24H17C20.3137 24 23 21.3137 23 18V14H24V18Z" fill="#14b8a6" fillOpacity="1" />
      <circle cx="23.5" cy="23.5" r="23" stroke="#e2e8f0" strokeOpacity="1" />
    </svg>
  );
}

const EncryptedText = dynamic(
  () => import("@/components/ui/encrypted-text").then((mod) => mod.EncryptedText),
  { ssr: false, loading: () => <span className="text-neutral-600">Built for Engineers Navigating a Tough Job Market</span> }
);


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
      "SQL for real apps and data workflows"
    ],
    ctaText: "Explore Courses",
    href: "/courses",
    icon: <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />
  },
  {
    id: "prepare",
    title: "Prepare",
    punchline: "Practice like it’s the real interview.",
    description:
      "Simulate real technical interviews in an in-browser workspace—no setup, no guesswork.",
    bullets: [
      "Interview-style coding workspace",
      "Instant test feedback",
      "Customizable layout + theming"
    ],
    ctaText: "Start Interview Prep",
    href: "/prepare",
    icon: <TerminalSquare className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />
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
      "Live events + monthly sprints"
    ],
    ctaText: "Explore Live Hackathons",
    href: "/hackathons",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />
  },
  {
    id: "jobs",
    title: "Jobs",
    punchline: "Jobs that are actually still open.",
    description:
      "Fresh engineering roles (Node.js, React, SDE-2) pulled in near real-time—so you’re not applying to dead listings.",
    bullets: [
      "Minutes-old listings",
      "Role-focused: frontend, backend, SDE",
      "Less noise, more signal"
    ],
    ctaText: "Browse Fresh Jobs",
    href: "/jobs",
    icon: <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />
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
      "Clear requirements + timelines"
    ],
    ctaText: "Explore Scholarships",
    href: "/study-abroad",
    icon: <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />
  },
  {
    id: "mentorship",
    title: "Mentorship",
    punchline: "Guidance from people who’ve done it.",
    description:
      "Get matched with mentors based on the role, company, and career path you’re targeting.",
    bullets: [
      "Role-specific guidance",
      "Company-aware advice",
      "Actionable roadmap sessions"
    ],
    ctaText: "Find a Mentor",
    href: "/mentorship",
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-teal-500" />
  }
];

type Service = (typeof services)[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      style={{ animationDelay: `${index * 50}ms` }}
      className="relative flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:border-teal-300 hover:-translate-y-1.5 hover:shadow-[0_4px_20px_rgba(20,184,166,0.12)] transition-all duration-300 animate-fade-in-up"
    >
      {/* Aceternity corner brackets */}
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
        <p className="text-sm text-neutral-500 font-sans leading-relaxed mt-1">
          {service.description}
        </p>
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
export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
        {/* Background FX */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dot grid — Aceternity signature */}
          <div className="absolute inset-0 bg-dot-grid opacity-100" />
          {/* Teal glow blobs */}
          <div className="absolute -left-28 top-10 w-96 h-96 bg-teal-200/30 blur-[120px]" />
          <div className="absolute right-[-120px] bottom-[-80px] w-[520px] h-[520px] bg-teal-100/20 blur-[140px]" />
        </div>

        {/* Aceternity floating decoration cards */}
        <div className="absolute left-4 md:left-12 top-36 md:top-44 z-20 hidden md:block pointer-events-none animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="relative bg-white rounded-2xl border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-4 w-44">
            <CornerBracket className="absolute top-0 left-0" />
            <CornerBracket className="absolute top-0 right-0 rotate-90" />
            <CornerBracket className="absolute bottom-0 left-0 -rotate-90" />
            <CornerBracket className="absolute bottom-0 right-0 rotate-180" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                <Zap className="w-4 h-4 text-teal-500" />
              </div>
              <span className="text-xs font-semibold text-neutral-700">JobFlix</span>
            </div>
            <div className="space-y-1.5">
              {[["DSA Practice", "342 solved"], ["Mock Interview", "98% ready"], ["Live Jobs", "2.4k+"]].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center text-[10px]">
                  <span className="text-neutral-500">{label}</span>
                  <span className="font-semibold text-teal-600">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute right-4 md:right-12 top-36 md:top-52 z-20 hidden md:block pointer-events-none animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="relative bg-white rounded-2xl border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-4 w-48">
            <CornerBracket className="absolute top-0 left-0" />
            <CornerBracket className="absolute top-0 right-0 rotate-90" />
            <CornerBracket className="absolute bottom-0 left-0 -rotate-90" />
            <CornerBracket className="absolute bottom-0 right-0 rotate-180" />
            <p className="text-[10px] text-neutral-400 uppercase tracking-wide mb-2 font-mono">Upcoming</p>
            {[
              { icon: <Code2 className="w-3 h-3 text-teal-500" />, text: "Java DSA – Module 4", time: "Today" },
              { icon: <TrendingUp className="w-3 h-3 text-teal-500" />, text: "Job Fair – RIMT", time: "Apr 10" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-2 py-1.5 border-b border-neutral-100 last:border-0">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-[11px] font-medium text-neutral-700 leading-tight">{item.text}</p>
                  <p className="text-[10px] text-neutral-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Circle cross decorations */}
        <CircleCrossAccent className="absolute top-32 right-[18%] hidden lg:block pointer-events-none opacity-80 z-10" />
        <CircleCrossAccent className="absolute bottom-20 left-[12%] hidden lg:block pointer-events-none opacity-60 z-10" />
        <CrossAccent className="absolute top-48 left-[35%] hidden xl:block pointer-events-none opacity-40 z-10" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Hero */}
          <div className="text-center mb-14 md:mb-20">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-xs md:text-sm text-teal-700 mb-6 font-mono uppercase tracking-[0.3em] animate-fade-in-up"
            >
              <Cpu className="w-4 h-4 text-teal-500" />
              <EncryptedText
                text="Built for Engineers Navigating a Tough Job Market"
                encryptedClassName="text-neutral-900/40"
                revealedClassName="text-neutral-600"
                revealDelayMs={35}
              />
            </div>

            <h1
              style={{ animationDelay: "100ms", fontFamily: "var(--font-bricolage)" }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up text-neutral-900"
            >
              Get Ahead in a Market That Rewards the Prepared
            </h1>

            <p
              style={{ animationDelay: "200ms" }}
              className="text-neutral-600 text-base md:text-lg max-w-3xl mx-auto font-sans leading-relaxed animate-fade-in-up"
            >
              Curated learning and interview preparation for engineers who want a real advantage in today’s job market.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm md:text-base rounded-full transition-all uppercase tracking-widest shadow-[0_0_30px_rgba(20,184,166,0.3)]"
              >
                Explore Opportunities
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-3 border border-neutral-300 text-sm md:text-base font-bold uppercase tracking-widest bg-white hover:border-teal-400 hover:text-teal-600 transition-colors rounded-full"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Service Hub */}
          <section
            id="service-hub"
            aria-labelledby="service-hub-title"
            className="bg-gradient-to-br from-white/5 via-white/0 to-white/5 border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
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

      {/* Pricing Teaser */}
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
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs md:text-sm rounded-full transition-all uppercase tracking-[0.18em] shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              >
                View Pricing
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  title: "Monthly",
                  price: "₹1,700",
                  cadence: "/month",
                  note: "Billed monthly",
                  href: "/jobs"
                },
                {
                  title: "Quarterly",
                  price: "₹1,300",
                  cadence: "/month",
                  note: "Billed quarterly (₹3,700)",
                  href: "/prepare"
                },
                {
                  title: "Annual",
                  price: "₹430",
                  cadence: "/month",
                  note: "Billed yearly (₹5,100)",
                  href: "/courses",
                  badge: "Recommended"
                }
              ].map((plan) => (
                <div
                  key={plan.title}
                  className={`relative rounded-2xl border bg-neutral-1000 p-4 md:p-5 ${plan.badge ? "border-neutral-200/40" : "border-neutral-200"
                    }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 right-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <div className="text-sm text-neutral-500 font-bold uppercase tracking-[0.2em]">
                    {plan.title}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-neutral-500 text-sm">{plan.cadence}</span>
                  </div>
                  <div className="text-neutral-400 text-sm mt-1">{plan.note}</div>
                  <Link
                    href={plan.href}
                    className="mt-4 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full border border-neutral-200/40 text-neutral-600 font-bold uppercase tracking-[0.16em] hover:bg-white hover:text-black transition-colors text-xs"
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
