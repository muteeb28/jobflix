
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
  Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles-core").then((mod) => mod.SparklesCore),
  { ssr: false }
);

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
    <div className="min-h-screen bg-white text-neutral-900 font-pixel flex flex-col">
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
              style={{ animationDelay: "100ms" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 glitch-text animate-fade-in-up"
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
