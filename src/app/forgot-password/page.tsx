
"use client";

import React from "react";
import { useNavigation } from "@/components/hooks/useNavigation";
import { CornerBracket } from "@/components/ui/aceternity-decorations";
import { AnimatedInput } from "@/components/ui/animatedInput";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { navigate } = useNavigation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_JOBFILX_APIURL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit request.");
      }

      toast.success(data.message || "link send successfully!");
      setEmail("");
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
            Forgot your password?
          </h2>
          <p className="mt-1.5 text-sm text-neutral-500 font-sans">
            Enter your email and we will send you a reset link.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <AnimatedInput
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-neutral-500">We will never share your email.</p>
            </div>

            <button
              className="group/btn relative mt-2 flex h-11 w-full items-center justify-center rounded-full bg-[#10b981] text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
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
