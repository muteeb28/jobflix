"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Github } from "lucide-react";
import { SiMysql, SiReact, SiSpringboot, SiOpenai } from "react-icons/si";
import { Turnstile } from "@marsidev/react-turnstile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";
import { cn } from "@/lib/utils";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

/* ── Right panel demo steps ───────────────────────────────────── */

const techIcons = [
  { name: "SQL", Icon: SiMysql, bg: "bg-blue-600" },
  { name: "React", Icon: SiReact, bg: "bg-cyan-500" },
  { name: "Spring Boot", Icon: SiSpringboot, bg: "bg-green-600" },
  { name: "AI", Icon: SiOpenai, bg: "bg-purple-600" },
];

function LearnLikeNetflixCard() {
  return (
    <div>
      <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3">
        Game-based learning that sticks
      </p>
      <div className="grid grid-cols-2 gap-3">
        {techIcons.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-3 flex flex-col items-center gap-2 bg-white/10 border border-white/20 shadow-lg backdrop-blur-sm"
          >
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", t.bg)}>
              <t.Icon size={28} color="#fff" />
            </div>
            <p className="text-sm font-semibold text-white">{t.name}</p>
            <p className="text-xs text-white/60">4.9★</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-4 pt-8 mt-4 relative overflow-hidden">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-[11px] font-bold rounded-full px-3 py-1"
        >
          Module Complete +50 XP 🎮
        </motion.div>
        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#4353CF] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "75%" }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

function AIMentorCard() {
  const nodes = ["React ✓", "Next.js →", "Full Stack"];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex gap-2 items-start mb-5">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=mentor&backgroundColor=b6e3f4&clothingColor=3c4f5c"
          className="w-10 h-10 rounded-full border-2 border-[#4353CF]/30 shrink-0"
          alt="AI Mentor"
        />
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-neutral-700"
        >
          Based on your React progress, I recommend trying Next.js next 🚀
        </motion.div>
      </div>
      <div className="flex items-center">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center flex-1 last:flex-none">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.25 }}
              className={cn(
                "text-xs font-semibold rounded-full px-3 py-1.5 whitespace-nowrap",
                i === 0 ? "bg-[#edeef9] text-[#28327c]" : i === 1 ? "bg-[#e4e8ff] text-[#4353CF]" : "bg-neutral-100 text-neutral-500"
              )}
            >
              {n}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.25 + 0.15, duration: 0.3 }}
                className="flex-1 h-px bg-neutral-200 origin-left mx-1"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ATSScoreCard() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const target = 94;
    const duration = 1200;
    const stepTime = 16;
    const increment = target / (duration / stepTime);
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setScore(target);
        clearInterval(interval);
      } else {
        setScore(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, []);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const bullets = ["Optimized for Google", "Matched Razorpay JD", "HR email drafted"];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="relative w-28 h-28 mx-auto">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
          <circle cx="56" cy="56" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#4353CF"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-neutral-900">
          {score}
        </div>
      </div>
      <p className="text-center text-sm text-neutral-500 mt-2">ATS Score</p>
      <div className="mt-4 space-y-2">
        {bullets.map((b, i) => (
          <motion.p
            key={b}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.2 }}
            className="text-sm text-neutral-600"
          >
            ✓ {b}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

const exclusiveJobs = [
  {
    title: "Frontend Engineer",
    company: "Razorpay",
    location: "Mumbai",
    salary: "₹28 LPA",
    posted: "Posted 2 hrs ago",
    exclusive: "Not on LinkedIn",
  },
  {
    title: "ML Engineer",
    company: "Sarvam AI",
    location: "Remote",
    salary: "₹32 LPA",
    posted: "Posted 5 hrs ago",
    exclusive: "Not on Naukri",
  },
];

function ExclusiveJobsCard() {
  return (
    <div className="space-y-3">
      {exclusiveJobs.map((job, i) => (
        <motion.div
          key={job.company}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          <p className="font-semibold text-sm text-neutral-900">
            {job.title} · {job.company}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {job.location} · {job.salary}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-bold bg-green-50 text-green-600 rounded-full px-2 py-0.5">
              {job.posted}
            </span>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 rounded-full px-2 py-0.5">
              {job.exclusive}
            </span>
          </div>
          <button className="mt-3 text-xs font-bold text-[#4353CF]">Apply →</button>
        </motion.div>
      ))}
    </div>
  );
}

const demoSteps = [
  {
    title: "",
    label: "One subscription. Every skill.",
    Component: LearnLikeNetflixCard,
  },
  {
    title: "AI Mentor that grows with you",
    label: "Your personal AI career coach.",
    Component: AIMentorCard,
  },
  {
    title: "Resume that beats ATS",
    label: "Get past the filters. Get the interview.",
    Component: ATSScoreCard,
  },
  {
    title: "Jobs no one else has",
    label: "Fresh jobs. First access.",
    Component: ExclusiveJobsCard,
  },
];

function DemoPanel() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % demoSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const step = demoSteps[activeStep];
  const StepComponent = step.Component;

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-[#4353CF] via-[#2d3278] to-[#1a1e4d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] bg-[length:24px_24px] opacity-30" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#4353CF]/30 blur-3xl animate-float" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#a7aee5]/10 blur-3xl animate-float" />

      <div className="relative z-10 w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {step.title && <h3 className="font-heading text-white text-xl font-bold mb-4">{step.title}</h3>}
            <StepComponent />
            <p className="text-[#e4e8ff] text-sm mt-4">{step.label}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex justify-center gap-2 mt-10">
        {demoSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            aria-label={`Go to step ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeStep ? "w-6 bg-[#a7aee5]" : "w-2 bg-white/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Left panel forms ─────────────────────────────────────────── */

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const login = useUserStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password, turnstileToken);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <Link href="#" className="text-sm text-[#4353CF] hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          id="login-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={(token) => setTurnstileToken(token)} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="w-full font-semibold bg-[#4353CF] hover:bg-[#2d3278] active:bg-[#1a1e4d] hover:shadow-[0_0_24px_4px_rgba(67,83,207,0.35)] focus-visible:ring-[#4353CF]/60"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Login"}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200 dark:border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white dark:bg-neutral-900 px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button type="button" variant="outline" size="lg" className="w-full">
        <Github className="size-4" />
        Login with GitHub
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-[#4353CF] font-semibold hover:underline">
          Sign up
        </button>
      </p>
    </motion.form>
  );
}

function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const signup = useUserStore((s) => s.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(name, email, phone, password, turnstileToken);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-1.5">
        <Label htmlFor="signup-name">Full name</Label>
        <Input
          id="signup-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan Lee"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-phone">Phone number</Label>
        <Input
          id="signup-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={(token) => setTurnstileToken(token)} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="w-full font-semibold bg-[#4353CF] hover:bg-[#2d3278] active:bg-[#1a1e4d] hover:shadow-[0_0_24px_4px_rgba(67,83,207,0.35)] focus-visible:ring-[#4353CF]/60"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Sign up"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-[#4353CF] font-semibold hover:underline">
          Sign in
        </button>
      </p>
    </motion.form>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-white dark:bg-neutral-900 lg:min-h-[640px]">
        {/* Left column */}
        <div className="w-full lg:w-[45%] flex flex-col p-8 sm:p-12">
          <Link href="/landing" className="relative w-[110px] h-[28px] mb-12">
            <Image
              src="/assets/files/jobflix-logo.png"
              alt="Jobflix"
              fill
              className="dark:hidden object-contain object-left"
              priority
            />
            <Image
              src="/assets/files/jobflix-light-logo.png"
              alt="Jobflix"
              fill
              className="hidden dark:block object-contain object-left"
              priority
            />
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Your career, accelerated.
            </h1>
            <p className="text-sm text-muted-foreground mt-2 mb-8">
              Join thousands landing roles at top companies.
            </p>

            <div className="flex gap-1 mb-8 p-1 bg-neutral-100 dark:bg-white/5 rounded-full w-fit">
              <button
                onClick={() => setMode("login")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                  mode === "login"
                    ? "bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white"
                    : "text-neutral-500 dark:text-zinc-400"
                )}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode("signup")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                  mode === "signup"
                    ? "bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white"
                    : "text-neutral-500 dark:text-zinc-400"
                )}
              >
                Sign up
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <LoginForm key="login" onSwitch={() => setMode("signup")} />
              ) : (
                <SignupForm key="signup" onSwitch={() => setMode("login")} />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right column */}
        <div className="hidden lg:flex lg:w-[55%]">
          <DemoPanel />
        </div>
      </div>
    </div>
  );
}
