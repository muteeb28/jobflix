"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedInput } from "../ui/animatedInput";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { useNavigation } from "../hooks/useNavigation";
import { useUserStore } from "@/stores/useUserStore";
import { Label } from "../ui/label";
import { CornerBracket } from "../ui/aceternity-decorations";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedPhoneInputField } from "../ui/animatedPhoneInputField";
import { Turnstile } from "@marsidev/react-turnstile";
import { SignupLinks } from "./formComponents";

type PasswordChecks = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
};

export function SignupFormLatest() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [passwordChecks, setPasswordChecks] = React.useState<PasswordChecks>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const { navigate } = useNavigation();
  const { signup } = useUserStore();
  const [token, setToken] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);

    setPasswordChecks({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  };

  const allPasswordChecksValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const res = await signup({ name: fullName, email, phone, password, confirmPassword, token });
    if (res?.redirectTo) {
      navigate(res.redirectTo);
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
        Create your account and start preparing for the job market.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="fullName">Full Name</Label>
          <AnimatedInput
            id="fullName"
            placeholder="John Doe"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <AnimatedInput
            id="email"
            placeholder="john@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="phone">Phone Number</Label>
          <AnimatedPhoneInputField
            value={phone as any}
            onChange={(value) => setPhone(value || "")}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <AnimatedInput
              id="password"
              placeholder="Create a strong password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </LabelInputContainer>

        <AnimatePresence>
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2"
            >
              <div className="space-y-1 text-xs">
                {([
                  { check: passwordChecks.length, label: "At least 8 characters" },
                  { check: passwordChecks.uppercase, label: "One uppercase letter" },
                  { check: passwordChecks.lowercase, label: "One lowercase letter" },
                  { check: passwordChecks.number, label: "One number" },
                  { check: passwordChecks.special, label: "One special character" },
                ]).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className={cn(
                      "flex items-center gap-1.5",
                      item.check ? "text-emerald-600" : "text-red-500"
                    )}
                  >
                    {item.check ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                    {item.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <LabelInputContainer>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <AnimatedInput
              id="confirmPassword"
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-red-500">Passwords do not match</p>
          )}
        </LabelInputContainer>

        {error && (
          <p className="text-sm font-medium text-red-500" role="alert">
            {error}
          </p>
        )}

        <div className="">
          <Turnstile
          className="text-center"
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token: any) => setToken(token)}
            onExpire={() => setToken(null)}
          />
        </div>

        <button
          className="group/btn relative mt-2 flex h-11 w-full items-center justify-center rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold uppercase tracking-[0.16em] text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={!allPasswordChecksValid || password !== confirmPassword}
        >
          Sign up
          <BottomGradient />
        </button>

        <SignupLinks />

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">or continue with</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            className="cursor-pointer text-emerald-600 underline underline-offset-4"
          >
            Login
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
