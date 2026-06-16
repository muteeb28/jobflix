"use client";

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { useNavigation } from "../hooks/useNavigation";
import { useUserStore } from "@/stores/useUserStore";
import { CornerBracket } from "../ui/aceternity-decorations";
import { AnimatedInput } from "../ui/animatedInput";
import { Label } from "../ui/label";
import { Turnstile } from "@marsidev/react-turnstile";
import { SignupLinks } from "./formComponents";
import { useRouter } from "next/navigation";

export function LoginLatest() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { navigate } = useNavigation();
  const { login } = useUserStore();
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: any = await login(email, password, token);
    if (res.success && res.next){
      if (res.next.startsWith("http")) {
        window.location.href = res.next;
        return;
      }
      router.push(res.next);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
      <CornerBracket className="absolute top-0 left-0 opacity-50" />
      <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-50" />
      <CornerBracket className="absolute bottom-0 left-0 -rotate-90 opacity-50" />
      <CornerBracket className="absolute bottom-0 right-0 rotate-180 opacity-50" />

      <h2 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: "var(--font-bricolage)" }}>
        Welcome to Jobflix
      </h2>
      <p className="mt-1.5 text-sm text-neutral-500 font-sans">
        Enter your email below to login to your account.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <AnimatedInput
            id="email"
            placeholder="m@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <div className="mb-1 text-right">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
              className="text-sm text-emerald-600 underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <AnimatedInput
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LabelInputContainer>

        <div>
          <Turnstile
          className="text-center"
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token: any) => setToken(token)}
            onExpire={() => setToken(null)}
          />
        </div>

        <button
          className="group/btn relative mt-8 flex h-11 w-full items-center justify-center rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold uppercase tracking-[0.16em] text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
        >
          Login
          <BottomGradient />
        </button>

        <SignupLinks />

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">or continue with</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <p className="text-center text-sm text-neutral-500">
          Don't have an account?{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
            className="cursor-pointer text-emerald-600 underline underline-offset-4"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-brand-300/40 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-1.5", className)}>
    {children}
  </div>
);
