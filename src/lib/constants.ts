/**
 * Jobflix App Constants
 *
 * All static content, navigation links, external URLs, and copy that appears
 * in multiple places. Import from here instead of duplicating in components.
 */

// ── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { name: "Courses",      href: "/courses" },
  { name: "Prepare",      href: "/prepare" },
  { name: "Opportunities",href: "/opportunities" },
  { name: "Job Fair",     href: "/jobs" },
  { name: "Connect",      href: "/connect" },
] as const;

// ── External URLs ────────────────────────────────────────────────────────────

export const EXTERNAL = {
  whatsapp:     "https://chat.whatsapp.com/KQ4sWcUF5OTEy7ngJA6j7h",
  resumeAssist: "https://resume.jobflix.in",
  shop:         "https://shop.jobflix.in",
  linkedin:     "#",
  discord:      "#",
  twitter:      "#",
  github:       "#",
} as const;

// ── Brand copy ───────────────────────────────────────────────────────────────

export const BRAND = {
  name:        "JobFlix",
  tagline:     "Land Your Dream Role",
  description: "Curated courses, live mock interviews, and real job opportunities—built for engineers navigating a brutally competitive market.",
  company:     "JobFlix Edutech Solutions Private Limited",
  year:        "2025",
} as const;

// ── Stats (hero section) ─────────────────────────────────────────────────────

export const HERO_STATS = [
  { value: "6",    label: "Learning pillars" },
  { value: "70+",  label: "Practice problems" },
  { value: "Live", label: "Job listings" },
] as const;

// ── Features ticker (stats bar) ─────────────────────────────────────────────

export const TICKER_ITEMS = [
  "Production-grade courses",
  "70+ interview problems",
  "Real-time job listings",
  "Global hackathons",
  "AI-powered prep",
] as const;

// ── Pricing plans ────────────────────────────────────────────────────────────

export const PRICING_PLANS = [
  {
    title:   "Monthly",
    price:   "₹1,700",
    cadence: "/month",
    note:    "Billed monthly",
    href:    "/jobs",
    badge:   null,
  },
  {
    title:   "Quarterly",
    price:   "₹1,300",
    cadence: "/month",
    note:    "Billed quarterly (₹3,700)",
    href:    "/prepare",
    badge:   null,
  },
  {
    title:   "Annual",
    price:   "₹430",
    cadence: "/month",
    note:    "Billed yearly (₹5,100)",
    href:    "/courses",
    badge:   "Best Value",
  },
] as const;

// ── Job Fair companies ───────────────────────────────────────────────────────

export const JOB_FAIR_COMPANIES = ["Wipro", "TCS", "CRED", "Razorpay"] as const;
export const HIRING_COMPANIES   = ["Wipro", "TCS", "Infosys", "Razorpay", "Paytm", "CRED"] as const;

// ── Footer links grid ────────────────────────────────────────────────────────

export const FOOTER_LINKS = {
  Practice: [
    { label: "Get started",            href: "/courses" },
    { label: "JavaScript functions",   href: "/prepare" },
    { label: "User interface coding",  href: "/prepare" },
    { label: "System design",          href: "/prepare" },
    { label: "Quiz",                   href: "/prepare" },
  ],
  Guides: [
    { label: "API Integration Playbook",      href: "#" },
    { label: "System Design Playbook",        href: "#" },
    { label: "Design Patterns Playbook",      href: "#" },
    { label: "Behavioral Interview Playbook", href: "#" },
  ],
  "Mentor Plans": [
    { label: "1 Week Plan",   href: "/connect" },
    { label: "1 Month Plan",  href: "/connect" },
    { label: "3 Months Plan", href: "/connect" },
  ],
  Company: [
    { label: "Pricing",          href: "/pricing" },
    { label: "Promotions",       href: "#" },
    { label: "Roadmap",          href: "#" },
    { label: "About",            href: "#" },
    { label: "Contact us",       href: "#" },
    { label: "Careers",          href: "#" },
    { label: "Blog",             href: "#" },
  ],
} as const;
