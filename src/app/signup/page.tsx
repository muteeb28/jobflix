"use client"

import { SignupFormLatest } from "@/components/common/signup-form";
import { HeroHighlight } from "@/components/ui/hero-highlight"

export default function LoginPage() {
  // no server side theme logic, ThemeToggle handles local storage/classes
  return (
    <HeroHighlight containerClassName="h-auto py-12 md:py-16 lg:py-24" className="w-full">
    <main className="flex-1 flex items-center justify-center px-4 pb-12">
      <div className="w-full max-w-xl">
        <SignupFormLatest />
      </div>
    </main>
    </HeroHighlight>
  )
}