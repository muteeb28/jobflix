"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail, MessageCircle, Linkedin, Twitter, Youtube,
  Github,
} from "lucide-react";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-[#09090b] text-zinc-100 border-t border-white/[0.06] pt-20 pb-10 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">

          {/* ── Left: Brand + Contact ── */}
          <div className="lg:w-[38%] flex flex-col gap-7">
            {/* Logo */}
            <div>
              <div className="mb-4">
                <Image
                  src="/assets/files/jobflix-light-logo.png"
                  alt="JobFlix Logo"
                  width={180}
                  height={45}
                  className="object-contain brightness-0 invert opacity-80"
                />
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Your dream job is absolutely worth it.
              </p>
            </div>

            {/* Contact copy */}
            <div className="flex flex-col gap-1.5">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Don&apos;t hesitate to reach out. We&apos;re always here to help.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Have questions, feedback, or anything to say? Tell us.
                We usually get back within 1–2 days.
              </p>
            </div>

            {/* Contact links */}
            <ul className="flex flex-col gap-3">
              <ContactLink icon={<Mail className="w-4 h-4" />} href="mailto:hello@jobflix.in" label="Email us" />
              <ContactLink icon={<MessageCircle className="w-4 h-4" />} href="#" label="Join Discord (private)" />
              <ContactLink icon={<Linkedin className="w-4 h-4" />} href="#" label="Follow our LinkedIn page" />
              <ContactLink icon={<Twitter className="w-4 h-4" />} label="Follow us on X" href="#" />
              <ContactLink icon={<Youtube className="w-4 h-4" />} label="Follow us on YouTube" href="#" />
            </ul>
          </div>

          {/* ── Right: 3 link columns ── */}
          <div className="lg:flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Products */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Products</h3>
              <ul className="flex flex-col gap-2.5 text-zinc-500 text-sm">
                <FooterLink href="https://resumeassist-ai.vercel.app/" external>ResumeAssist</FooterLink>
                <FooterLink href="https://shop-career-sprint.vercel.app/" external>Shop</FooterLink>
                <FooterLink href="/courses">Courses</FooterLink>
                <FooterLink href="/jobs">Jobs</FooterLink>
                <FooterLink href="/connect">Connect</FooterLink>
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Company</h3>
              <ul className="flex flex-col gap-2.5 text-zinc-500 text-sm">
                <FooterLink href="/pricing">Pricing</FooterLink>
                <FooterLink href="#">Team</FooterLink>
                <FooterLink href="#">Roadmap</FooterLink>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Contact us</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
              </ul>
            </div>

            {/* Practice */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Practice</h3>
              <ul className="flex flex-col gap-2.5 text-zinc-500 text-sm">
                <FooterLink href="/prepare">Get started</FooterLink>
                <FooterLink href="/prepare">JavaScript functions</FooterLink>
                <FooterLink href="/prepare">User interface coding</FooterLink>
                <FooterLink href="/prepare">System design</FooterLink>
                <FooterLink href="/prepare">Quiz</FooterLink>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.06] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © 2025 Jobflix by careersprint. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <SocialIcon icon={<IconBrandLinkedin size={16} />} href="#" label="LinkedIn" />
            <SocialIcon icon={<IconBrandDiscord size={16} />} href="#" label="Discord" />
            <SocialIcon icon={<IconBrandX size={16} />} href="#" label="X" />
            <SocialIcon icon={<IconBrandGithub size={16} />} href="#" label="GitHub" />
            <SocialIcon icon={<IconBrandYoutube size={16} />} href="#" label="YouTube" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-2.5 text-sm text-zinc-500 hover:text-brand-400 transition-colors"
      >
        {icon}
        {label}
      </a>
    </li>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <li>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-200 transition-colors block leading-relaxed"
        >
          {children}
        </a>
      ) : (
        <Link href={href} className="hover:text-zinc-200 transition-colors block leading-relaxed">
          {children}
        </Link>
      )}
    </li>
  );
}

function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:text-zinc-100 hover:border-white/[0.15] transition-all"
    >
      {icon}
    </a>
  );
}
