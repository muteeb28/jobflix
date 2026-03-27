"use client";

import React, { useState, useEffect, useCallback } from "react";
import { IconBriefcase, IconExternalLink, IconArrowLeft, IconArrowRight, IconMapPin, IconClock } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Building2, Zap, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jobFairs = [
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
    color: "from-red-900/40 via-zinc-900 to-blue-900/30",
    accent: "text-yellow-400",
    border: "border-yellow-400/30",
    glow: "shadow-[0_0_40px_rgba(250,204,21,0.08)]",
  },
];

function JobFairCard({ fair }: { fair: typeof jobFairs[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border ${fair.border} bg-gradient-to-br ${fair.color} ${fair.glow} p-6 md:p-8`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-400">
              {fair.tagline}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
            {fair.name}
          </h2>
          <p className="text-zinc-400 text-sm mb-5">{fair.organizer}</p>

          {/* Details row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              {fair.location}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {fair.dates}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-zinc-400" />
              {fair.companies} Companies
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-yellow-400">{fair.package}</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Package</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{fair.companies}</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Companies</div>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex flex-col gap-3 md:w-44 shrink-0">
          <a
            href={fair.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-xl transition-colors border-b-4 border-yellow-600 active:border-0 active:translate-y-1"
          >
            Register Now
            <ExternalLink className="w-4 h-4" />
          </a>
          <div className="text-[10px] text-zinc-500 text-center uppercase tracking-wider">
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

    const LIMIT = 9;

    const fetchJobs = useCallback(async (pageNum: number) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/jobs?page=${pageNum}&limit=${LIMIT}`, { cache: "no-store" });
            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();
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
        <div className="min-h-screen bg-black text-white font-pixel flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-16 px-4 relative overflow-hidden">
                {/* Retro Background Elements */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-yellow-500/5 blur-[120px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">

                    {/* Job Fair Section */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
                                Job Fair
                            </h1>
                            <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent" />
                            <span className="text-xs text-yellow-400 font-mono uppercase tracking-widest">
                                {jobFairs.length} upcoming
                            </span>
                        </div>
                        <div className="space-y-4">
                            {jobFairs.map((fair) => (
                                <JobFairCard key={fair.id} fair={fair} />
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-xl font-black text-white uppercase tracking-wider">
                            Latest Jobs
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded mb-8 text-center font-mono text-sm">
                            [ERROR] {error}
                        </div>
                    )}

                    {/* Content */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-64 bg-zinc-900/50 rounded border border-white/5 animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />
                                </div>
                            ))}
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-24 bg-zinc-900/30 rounded border border-white/5 border-dashed">
                            <IconBriefcase className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-zinc-400 mb-2">NO SIGNALS DETECTED</h3>
                            <button onClick={handleRefresh} className="text-yellow-400 hover:underline text-sm uppercase">
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
                                            whileHover={{ y: -5 }}
                                            className="group relative bg-zinc-900 border border-white/10 p-6 rounded hover:border-yellow-400 transition-all flex flex-col h-full hover:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="bg-zinc-800 p-2 rounded border border-white/5 text-zinc-400 group-hover:text-yellow-400 transition-colors">
                                                    <IconBriefcase size={20} />
                                                </div>
                                                <span className="text-[10px] font-bold px-2 py-1 bg-blue-900/20 text-blue-400 rounded uppercase tracking-wider border border-blue-500/20">
                                                    {job.platform}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 leading-tight group-hover:text-yellow-400 transition-colors" title={job.title}>
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500 mb-4 font-mono truncate">
                                                {job.company}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                                <div className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-white/10">
                                                    <IconMapPin size={12} /> {job.location}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-green-400 bg-green-900/10 px-2 py-1 rounded border border-green-500/20">
                                                    <IconClock size={12} /> {job.postedDate}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-white/10 flex gap-2">
                                                {job.url ? (
                                                    <a
                                                        href={job.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 bg-white hover:bg-yellow-400 text-black font-bold text-center py-2.5 rounded text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide group-hover:translate-x-1"
                                                    >
                                                        Apply <IconExternalLink size={14} />
                                                    </a>
                                                ) : (
                                                    <button disabled className="flex-1 bg-zinc-800 text-zinc-600 font-bold py-2 rounded text-sm cursor-not-allowed">
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
                                        className="p-3 bg-zinc-900 border border-white/10 hover:border-yellow-400 text-white rounded transition-colors disabled:opacity-30 disabled:hover:border-white/10"
                                    >
                                        <IconArrowLeft size={20} />
                                    </button>

                                    <div className="font-pixel text-sm bg-zinc-900 px-4 py-2 rounded border border-white/10 text-zinc-400">
                                        Page <span className="text-yellow-400 mx-1">{page}</span> / {totalPages}
                                    </div>

                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="p-3 bg-zinc-900 border border-white/10 hover:border-yellow-400 text-white rounded transition-colors disabled:opacity-30 disabled:hover:border-white/10"
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
        </div>
    );
}
