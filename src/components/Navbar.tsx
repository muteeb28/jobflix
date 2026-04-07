"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useUserStore } from "@/stores/useUserStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Courses", href: "/courses" },
    { name: "Prepare", href: "/prepare" },
    { name: "Opportunities", href: "/opportunities" },
    { name: "Job Fair", href: "/jobs" },
    { name: "Connect", href: "/connect" },
  ];

  const isLight = "light";

  const { user, logout } = useUserStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl border-b border-neutral-200/80 dark:border-white/[0.06] transition-colors duration-300">
      <div className="w-full px-4 md:px-6 h-14 flex items-center justify-between gap-4 max-w-6xl mx-auto">

        {/* Logo */}
        <Link href="/landing" className="flex items-center gap-1.5 group shrink-0">
          <div className="relative w-[110px] h-[28px]">
            <Image
              src="/assets/files/jobflix-logo.png"
              alt="Jobflix"
              fill
              className="dark:hidden object-contain"
              priority
            />
            <Image
              src="/assets/files/jobflix-light-logo.png"
              alt="Jobflix"
              fill
              className="hidden dark:block object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <Link key={item.name} href={item.href} className="text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 font-medium text-[13.5px] transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {
              user ? (
                <div className="relative group">
                  <button
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-medium",
                      isLight ? "bg-slate-900" : "bg-gradient-to-br from-purple-500 to-blue-500"
                    )}
                    aria-haspopup="true"
                    aria-expanded={false}
                  >
                    {user?.email ? user.email.split("@")[0].slice(0, 2).toUpperCase() : "?"}
                  </button>

                  <div className={cn(
                    "absolute right-0 mt-2 w-40 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-1 group-hover:translate-y-0 transition-all duration-150 z-50 border",
                    isLight ? "bg-white border-neutral-200" : "bg-slate-800 border-slate-700"
                  )}>
                    <a href={`${process.env.NEXT_PUBLIC_AUTH_VIEW}/my-account/dashboard/me`} className={cn("block px-4 py-2 text-sm", isLight ? "text-neutral-700 hover:bg-neutral-100" : "text-slate-200 hover:bg-slate-700")}>Profile</a>
                    <a href={`${process.env.NEXT_PUBLIC_AUTH_VIEW}/my-account/dashboard/me`} className={cn("block px-4 py-2 text-sm", isLight ? "text-neutral-700 hover:bg-neutral-100" : "text-slate-200 hover:bg-slate-700")}>Orders</a>
                    <button onClick={async () => { await logout(); }} className={cn("w-full text-left px-4 py-2 text-sm", isLight ? "text-neutral-700 hover:bg-neutral-100" : "text-slate-200 hover:bg-slate-700")}>Logout</button>
                  </div>
                </div>
              ) : (
                <Link href={process.env.NEXT_PUBLIC_AUTH_VIEW || ''} className="hidden sm:inline-flex px-5 py-2 bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm rounded-full transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_4px_rgba(16,185,129,0.25)]">
                  Sign up
                </Link>
              )
              }
          <button className="md:hidden p-2 rounded-full border border-neutral-200 dark:border-zinc-700 text-neutral-500 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 transition-all" aria-label="Toggle navigation" onClick={() => setOpen((prev) => !prev)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-100 dark:border-white/[0.06] bg-white/98 dark:bg-[#09090b]/98 backdrop-blur-xl px-4 pb-5">
          <div className="flex flex-col pt-3">
            {links.map((item) => (
              <Link key={item.name} href={item.href} className="text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-zinc-100 font-medium text-sm py-3 border-b border-neutral-100 dark:border-white/[0.05] last:border-0 transition-colors" onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/signup" className="mt-4 inline-flex items-center justify-center px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm rounded-full transition-all" onClick={() => setOpen(false)}>
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
