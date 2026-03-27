"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupFormDemo from "@/components/ui/signup-form-demo";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pb-12 pt-28 md:pt-36">
        <div className="w-full max-w-xl">
          <SignupFormDemo />
        </div>
      </main>
      <Footer />
    </div>
  );
}

