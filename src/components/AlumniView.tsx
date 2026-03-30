"use client";

import React, { useState } from "react";
import { Search, MapPin, Briefcase, GraduationCap, ExternalLink } from "lucide-react";
import { CornerBracket } from "@/components/ui/aceternity-decorations";

const alumni = [
  {
    name: "Arjun Kumar",
    initials: "AK",
    color: "bg-teal-500",
    batch: "2023",
    college: "RIMT University",
    company: "Wipro",
    role: "SDE-1",
    field: "Backend",
    location: "Bengaluru",
    linkedin: "#",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    color: "bg-violet-500",
    batch: "2022",
    college: "Chandigarh University",
    company: "Amazon",
    role: "SDE-2",
    field: "Backend",
    location: "Hyderabad",
    linkedin: "#",
  },
  {
    name: "Rahul Mehta",
    initials: "RM",
    color: "bg-blue-500",
    batch: "2023",
    college: "RIMT University",
    company: "TCS",
    role: "Software Engineer",
    field: "Frontend",
    location: "Pune",
    linkedin: "#",
  },
  {
    name: "Sneha Patel",
    initials: "SP",
    color: "bg-rose-500",
    batch: "2022",
    college: "LPU",
    company: "CRED",
    role: "Frontend Engineer",
    field: "Frontend",
    location: "Bengaluru",
    linkedin: "#",
  },
  {
    name: "Karan Singh",
    initials: "KS",
    color: "bg-amber-500",
    batch: "2024",
    college: "RIMT University",
    company: "Razorpay",
    role: "Intern → FTE",
    field: "Backend",
    location: "Bengaluru",
    linkedin: "#",
  },
  {
    name: "Divya Nair",
    initials: "DN",
    color: "bg-emerald-500",
    batch: "2023",
    college: "Amity University",
    company: "Infosys",
    role: "Systems Engineer",
    field: "DevOps",
    location: "Chennai",
    linkedin: "#",
  },
];

const FIELDS = ["All", "Backend", "Frontend", "DevOps"];

export default function AlumniView() {
  const [search, setSearch] = useState("");
  const [activeField, setActiveField] = useState("All");

  const filtered = alumni.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.college.toLowerCase().includes(search.toLowerCase());
    const matchesField = activeField === "All" || a.field === activeField;
    return matchesSearch && matchesField;
  });

  return (
    <div className="px-4 pt-10 pb-20 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-2">Alumni Network</p>
        <h2
          className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3"
          style={{ fontFamily: "var(--font-bricolage)" }}
        >
          Find Alumni Who&apos;ve Been There
        </h2>
        <p className="text-neutral-500 text-base max-w-lg mx-auto">
          Connect with Level Up alumni now working at top companies. Reach out, ask questions, get referrals.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg mx-auto mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, company, or college…"
          className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition"
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {FIELDS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveField(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
              activeField === f
                ? "bg-[#10b981] text-white border-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "bg-white text-neutral-500 border-neutral-200 hover:border-emerald-300 hover:text-emerald-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400 text-sm">No alumni found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div
              key={a.name}
              className="group relative bg-white border border-neutral-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-[0_8px_32px_rgba(16,185,129,0.1)] transition-all duration-300"
            >
              <CornerBracket className="absolute top-0 left-0 opacity-40 group-hover:opacity-70 transition-opacity" />
              <CornerBracket className="absolute top-0 right-0 rotate-90 opacity-40 group-hover:opacity-70 transition-opacity" />

              <div className="flex items-start gap-3 mb-4">
                <div className={`w-11 h-11 rounded-full ${a.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {a.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-neutral-800 leading-tight truncate">{a.name}</p>
                  <p className="text-xs text-neutral-400 mt-0.5 truncate">{a.college} · {a.batch}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-medium">{a.role}</span>
                  <span className="text-neutral-400">@ {a.company}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />{a.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" />{a.field}
                </div>
              </div>

              <a
                href={a.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-bold bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-[#10b981] hover:text-white hover:border-[#10b981] transition-all"
              >
                Connect on LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
