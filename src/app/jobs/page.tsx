"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { IconBriefcase, IconExternalLink, IconArrowLeft, IconArrowRight, IconMapPin, IconClock, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Building2, Zap, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CornerBracket } from "@/components/ui/aceternity-decorations";
import { apiClient } from "@/lib/apiClient";

const jobFairs: JobFair[] = [
  {
    id: "1",
    name: "Career Synergy Summit 2026",
    tagline: "MEGA JOB CARNIVAL",
    organizer: "RIMT University",
    location: "RIMT University, Punjab",
    dates: "10–11 April 2026",
    package: "30+ LPA",
    companies: "25+",
    registerUrl: "#",
    image: "/assets/job-fair-career-synergy-2026.jpg",
    color: "from-white to-brand-50/40",
    accent: "text-neutral-900",
    border: "border-neutral-200",
    glow: "shadow-[0_4px_40px_rgba(0,0,0,0.06)]",
  },
];

type JobFair = {
  id: string;
  name: string;
  tagline: string;
  organizer: string;
  location: string;
  dates: string;
  package: string;
  companies: string;
  registerUrl: string;
  image?: string;
  color: string;
  accent: string;
  border: string;
  glow: string;
};

/* ── Registration Modal ─────────────────────────────────────────────── */
function RegistrationModal({ fair, onClose }: { fair: JobFair; onClose: () => void }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", email: "", phone: "", college: "", branch: "", year: "", rollNo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <IconX size={18} />
          </button>
          <p className="text-[10px] font-mono uppercase tracking-widest text-brand-500 mb-1">
            {fair.tagline}
          </p>
          <h2 className="text-lg font-extrabold text-neutral-900 leading-tight">{fair.name}</h2>
          <p className="text-xs text-neutral-400 mt-0.5">{fair.location} · {fair.dates}</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-neutral-800 mb-1">You&apos;re registered!</h3>
              <p className="text-sm text-neutral-400">We&apos;ll send confirmation to <span className="text-neutral-700 font-medium">{form.email}</span></p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white text-sm font-bold rounded-full transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Arjun Kumar"
                    className="w-full h-10 px-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="arjun@example.com"
                    className="w-full h-10 px-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="9876543210"
                    className="w-full h-10 px-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">College / University *</label>
                  <input required value={form.college} onChange={e => setForm(f => ({ ...f, college: e.target.value }))}
                    placeholder="RIMT University"
                    className="w-full h-10 px-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Branch *</label>
                  <input required value={form.branch} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))}
                    placeholder="CSE / IT / ECE"
                    className="w-full h-10 px-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Year *</label>
                  <select required value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    className="w-full h-10 px-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition text-neutral-700"
                  >
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Passout</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-neutral-500 mb-1">University Roll No <span className="font-normal text-neutral-400">(optional)</span></label>
                  <input value={form.rollNo} onChange={e => setForm(f => ({ ...f, rollNo: e.target.value }))}
                    placeholder="e.g. 21CSE045"
                    className="w-full h-10 px-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 mt-1 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98]"
              >
                Register for Job Fair
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function JobFairCard({ fair, onRegister }: { fair: JobFair; onRegister: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border ${fair.border} bg-gradient-to-br ${fair.color} ${fair.glow} p-6 md:p-8`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-100 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
        {/* Image */}
        {fair.image && (
          <div className="shrink-0 w-full md:w-48 h-56 md:h-64 rounded-xl overflow-hidden border border-neutral-200">
            <Image
              src={fair.image}
              alt={fair.name}
              width={192}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Middle: Info */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-4">
            <Zap className="w-3.5 h-3.5 text-neutral-900" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-900">
              {fair.tagline}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1 leading-tight">
            {fair.name}
          </h2>
          <p className="text-neutral-500 text-sm mb-5">{fair.organizer}</p>

          {/* Details row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              {fair.location}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {fair.dates}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200">
              <Building2 className="w-3.5 h-3.5 text-neutral-500" />
              {fair.companies} Companies
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-neutral-900">{fair.package}</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Package</div>
            </div>
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-neutral-900">{fair.companies}</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Companies</div>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex flex-col gap-3 md:w-44 shrink-0">
          <button
            onClick={onRegister}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-black text-sm uppercase tracking-wider rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
          >
            Register Now
            <ExternalLink className="w-4 h-4" />
          </button>
          <div className="text-[10px] text-neutral-400 text-center uppercase tracking-wider">
            Limited Seats
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    platform: string;
    postedDate: string;
    url?: string;
    description: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [registerFair, setRegisterFair] = useState<JobFair | null>(null);

    const LIMIT = 9;

    const fetchJobs = useCallback(async (pageNum: number) => {
        setLoading(true);
        setError("");
        try {
            const data = await apiClient.get(`/api/jobs?page=${pageNum}&limit=${LIMIT}`, { cache: "no-store" });
            if (!data.success) throw new Error("Request failed");
            const incomingJobs = Array.isArray(data.jobs) ? data.jobs : [];
            setJobs(incomingJobs);
            setTotal(typeof data.total === "number" ? data.total : incomingJobs.length);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch jobs. Please try again.");
            setJobs([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs(page);
    }, [page, fetchJobs]);

    const handleRefresh = () => {
        setPage(1);
        fetchJobs(1);
    };

    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4 relative overflow-hidden">
                {/* Retro Background Elements */}
                <div className="absolute -left-28 top-10 w-96 h-96 bg-brand-100/40 blur-[120px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">

                    {/* Job Fair Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                                Job Fair
                            </h1>
                            <div className="h-px flex-1 bg-neutral-100" />
                            <span className="text-xs text-neutral-400 font-mono">{jobFairs.length} upcoming</span>
                        </div>
                        <div className="space-y-4">
                            {jobFairs.map((fair) => (
                                <JobFairCard key={fair.id} fair={fair} onRegister={() => setRegisterFair(fair)} />
                            ))}
                        </div>
                    </div>

                    {/* Section header */}
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                            Latest Jobs
                        </h2>
                        <div className="h-px flex-1 bg-neutral-100" />
                        <span className="text-xs text-neutral-400 font-mono">{total} listings</span>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 text-center text-sm">
                            [ERROR] {error}
                        </div>
                    )}

                    {/* Content */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-64 bg-neutral-100 rounded border border-white/5 animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
                                </div>
                            ))}
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-24 bg-neutral-50 rounded-2xl border border-neutral-200 border-dashed">
                            <IconBriefcase className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-neutral-400 mb-2">No jobs found</h3>
                            <button onClick={handleRefresh} className="text-brand-600 hover:underline text-sm">
                                Try Scanning Again
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                <AnimatePresence mode="popLayout">
                                    {jobs.map((job) => (
                                                        <motion.div
                                            key={job.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            whileHover={{ y: -4 }}
                                            className="group relative bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col hover:border-brand-300 hover:shadow-[0_8px_32px_rgba(16,185,129,0.1)] transition-all duration-300"
                                        >
                                            <CornerBracket className="absolute top-0 left-0 opacity-40 group-hover:opacity-70 transition-opacity" />
                                            <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-40 group-hover:opacity-70 transition-opacity" />
                                            <CornerBracket className="absolute bottom-0 left-0 -rotate-90 opacity-40 group-hover:opacity-70 transition-opacity" />
                                            <CornerBracket className="absolute bottom-0 right-0 rotate-180 opacity-40 group-hover:opacity-70 transition-opacity" />

                                            {/* Top row */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-400 group-hover:text-brand-500 group-hover:border-brand-200 group-hover:bg-brand-50 transition-all">
                                                    <IconBriefcase size={18} />
                                                </div>
                                                <span className="text-[10px] font-bold px-2.5 py-1 bg-brand-50 text-brand-600 rounded-full border border-brand-200 uppercase tracking-widest">
                                                    {job.platform}
                                                </span>
                                            </div>

                                            {/* Title + company */}
                                            <h3 className="text-[15px] font-bold text-neutral-900 mb-0.5 line-clamp-2 leading-snug group-hover:text-brand-600 transition-colors" title={job.title}>
                                                {job.title}
                                            </h3>
                                            <p className="text-xs text-neutral-400 mb-4 truncate font-medium">{job.company}</p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-auto mb-4">
                                                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500 bg-neutral-50 border border-neutral-200 px-2 py-1 rounded-lg">
                                                    <IconMapPin size={11} />{job.location}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-[11px] text-brand-600 bg-brand-50 border border-brand-200 px-2 py-1 rounded-lg">
                                                    <IconClock size={11} />{job.postedDate}
                                                </span>
                                            </div>

                                            {/* CTA */}
                                            <div className="border-t border-neutral-100 pt-4">
                                                {job.url ? (
                                                    <a
                                                        href={job.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-bold bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-[#10b981] hover:text-white hover:border-[#10b981] transition-all"
                                                    >
                                                        Apply <IconExternalLink size={13} />
                                                    </a>
                                                ) : (
                                                    <button disabled className="w-full py-2.5 rounded-xl text-[13px] font-bold bg-neutral-100 text-neutral-400 cursor-not-allowed">
                                                        Closed
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-3 bg-white border border-neutral-200 hover:border-brand-300 text-neutral-900 rounded transition-colors disabled:opacity-30 disabled:hover:border-brand-300"
                                    >
                                        <IconArrowLeft size={20} />
                                    </button>

                                    <div className="font-pixel text-sm bg-white px-4 py-2 rounded border border-neutral-200 text-neutral-500">
                                        Page <span className="text-neutral-900 mx-1">{page}</span> / {totalPages}
                                    </div>

                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="p-3 bg-white border border-neutral-200 hover:border-brand-300 text-neutral-900 rounded transition-colors disabled:opacity-30 disabled:hover:border-brand-300"
                                    >
                                        <IconArrowRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />

            {/* Registration Modal */}
            <AnimatePresence>
                {registerFair && (
                    <RegistrationModal fair={registerFair} onClose={() => setRegisterFair(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
