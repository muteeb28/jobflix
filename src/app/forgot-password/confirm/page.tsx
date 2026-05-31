
"use client";

import React from "react";
import { useNavigation } from "@/components/hooks/useNavigation";
import { CornerBracket } from "@/components/ui/aceternity-decorations";
import { AnimatedInput } from "@/components/ui/animatedInput";
import { Label } from "@/components/ui/label";
import { useSearchParams  } from "next/navigation";
import { toast } from "sonner";

export default function ForgotPasswordConfirm() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { navigate } = useNavigation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // validate token presence
  if (!token) {
    navigate("/forgot-password");
    return null;
  }

  const criteria = [
    { id: "length", label: "Minimum 8 characters", ok: password.length >= 8 },
    { id: "upper", label: "At least 1 uppercase letter", ok: /[A-Z]/.test(password) },
    { id: "lower", label: "At least 1 lowercase letter", ok: /[a-z]/.test(password) },
    { id: "number", label: "At least 1 number", ok: /[0-9]/.test(password) },
    { id: "special", label: "At least 1 special character", ok: /[^A-Za-z0-9]/.test(password) },
  ];

  const allCriteriaMet = criteria.every((c) => c.ok);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_JOBFILX_APIURL}/auth/forgot-password/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, confirmPassword, token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to reset password.");
      }

      toast.success(data.message || "password reset successfully!");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 pb-12 pt-28 md:pt-36">
      <div className="w-full max-w-xl">
        <div className="relative mx-auto w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
          <CornerBracket className="absolute top-0 left-0 opacity-50" />
          <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-50" />
          <CornerBracket className="absolute bottom-0 left-0 -rotate-90 opacity-50" />
          <CornerBracket className="absolute bottom-0 right-0 rotate-180 opacity-50" />

          <h2 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: "var(--font-bricolage)" }}>
            Set a new password
          </h2>
          <p className="mt-1.5 text-sm text-neutral-500 font-sans">
            Choose a strong password to secure your account.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col space-y-1.5">
              <Label htmlFor="password">New password</Label>
              <AnimatedInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex w-full flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <AnimatedInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-rose-600">Passwords do not match.</p>
              )}
            </div>

            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
              <div className="mb-2 font-medium">Password requirements</div>
              <ul className="space-y-1">
                {criteria.map((item) => (
                  <li key={item.id} className={item.ok ? "text-emerald-700" : "text-neutral-600"}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="group/btn relative mt-2 flex h-11 w-full items-center justify-center rounded-full bg-[#10b981] text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting || !allCriteriaMet || !passwordsMatch}
            >
              {isSubmitting ? "Updating..." : "Update password"}
            </button>

            <p className="text-center text-sm text-neutral-500">
              Back to{" "}
              <a
                href="#"
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
      </div>
    </main>
  );
}
