"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconUserPlus,
} from "@tabler/icons-react";
import { CornerBracket } from "@/components/ui/aceternity-decorations";

export default function SignupFormDemo() {
  const [status, setStatus] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("You're on the list! We'll be in touch soon.");
  };

  return (
    <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
      {/* Corner brackets — Aceternity accent */}
      <CornerBracket className="absolute top-0 left-0 opacity-50" />
      <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-50" />
      <CornerBracket className="absolute bottom-0 left-0 -rotate-90 opacity-50" />
      <CornerBracket className="absolute bottom-0 right-0 rotate-180 opacity-50" />

      <h2 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: "var(--font-bricolage)" }}>
        Welcome to Level Up
      </h2>
      <p className="mt-1.5 text-sm text-neutral-500 font-sans">
        Create your account and start preparing for the job market.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Arjun" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Kumar" type="text" />
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="arjun@example.com" type="email" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="universityId">University Roll No <span className="text-neutral-400 font-normal">(optional)</span></Label>
          <Input id="universityId" placeholder="e.g. 21CSE045" type="text" />
        </LabelInputContainer>

        <button
          className="group/btn relative mt-2 flex h-11 w-full items-center justify-center rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold uppercase tracking-[0.16em] text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-[0.98]"
          type="submit"
        >
          Sign up
          <BottomGradient />
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">or continue with</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <div className="flex flex-col space-y-3">
          <SocialButton icon={<IconBrandGithub className="h-4 w-4 text-neutral-700" />} label="Continue with GitHub" />
          <SocialButton icon={<IconBrandGoogle className="h-4 w-4 text-neutral-700" />} label="Continue with Google" />
          <SocialButton icon={<IconUserPlus className="h-4 w-4 text-neutral-700" />} label="Join as Mentor" />
        </div>

        {status && (
          <p className="mt-4 text-sm font-medium text-emerald-600" role="status">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="group/btn relative flex h-10 w-full items-center justify-start gap-3 rounded-lg bg-neutral-50 px-4 font-medium text-neutral-700 border border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all text-sm"
      type="button"
    >
      {icon}
      <span>{label}</span>
      <BottomGradient />
    </button>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
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
