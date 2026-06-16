"use client";
import { BackgroundRippleLayout } from "@/components/ui/bg/backgroundRippleLayout";
import SignupForm from "@/components/common/jobseekerOnboarding";

export default function JobseekerOnboardingLayout() {
  return (
    <BackgroundRippleLayout tone="light" contentClassName="min-h-screen">
      <main className="flex min-h-screen items-center justify-center px-4 pt-16">
        <SignupForm />
      </main>
    </BackgroundRippleLayout>
  );
}