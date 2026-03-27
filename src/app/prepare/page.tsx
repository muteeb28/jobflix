"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Filter,
  ChevronRight,
  Code2,
  Loader2,
  AlertCircle,
  Terminal,
  Braces,
  Layout,
} from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";
type Category = "all" | "dsa" | "frontend";

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  testcases: { input: string; output: string }[];
}

// Map problem IDs to topics for display
const topicMap: Record<string, string> = {
  // DSA
  "1": "Arrays", "2": "Arrays", "3": "Arrays", "4": "Arrays", "5": "Arrays",
  "6": "Arrays", "7": "Arrays", "8": "Arrays", "9": "Arrays", "10": "Arrays",
  "11": "Strings", "12": "Strings", "13": "Strings", "14": "Strings", "15": "Strings", "16": "Strings",
  "17": "Linked List", "18": "Linked List", "19": "Linked List", "20": "Linked List", "21": "Linked List",
  "22": "Stack", "23": "Stack", "24": "Stack",
  "25": "Binary Search", "26": "Binary Search", "27": "Binary Search", "28": "Binary Search",
  "29": "Trees", "30": "Trees", "31": "Trees", "32": "Trees", "33": "Trees", "34": "Trees", "35": "Trees",
  "36": "DP", "37": "DP", "38": "DP", "39": "DP", "40": "DP", "41": "DP",
  "42": "Graph", "43": "Graph", "44": "Graph", "45": "Graph",
  "46": "Matrix", "47": "Matrix", "48": "Matrix",
  "49": "Backtracking", "50": "Backtracking", "51": "Backtracking", "52": "Backtracking",
  "53": "Heap", "54": "Heap", "55": "Heap",
  "56": "Greedy", "57": "Greedy",
  "58": "Bit Manipulation", "59": "Bit Manipulation", "60": "Bit Manipulation",
  "61": "Intervals", "62": "Intervals",
  "63": "Math", "64": "Math", "65": "Math",
  "66": "Trie", "67": "Design",
  "68": "Two Pointers", "69": "Hash Map", "70": "Hash Map",
  // Frontend
  "71": "JS Utilities", "72": "JS Utilities", "73": "JS Utilities", "74": "JS Utilities",
  "75": "JS Utilities", "76": "JS Utilities", "77": "JS Utilities", "78": "JS Utilities",
  "79": "JS Utilities", "80": "JS Utilities", "81": "JS Utilities", "82": "JS Utilities",
  "83": "JS Utilities", "84": "JS Utilities", "85": "JS Utilities", "86": "JS Utilities",
  "87": "DOM", "88": "DOM", "89": "DOM", "90": "DOM",
  "91": "UI Components", "92": "UI Components", "93": "UI Components", "94": "UI Components",
  "95": "UI Components", "96": "UI Components", "97": "UI Components", "98": "UI Components",
  "99": "UI Components", "100": "UI Components", "101": "UI Components", "102": "UI Components",
  "103": "UI Components", "104": "UI Components", "105": "UI Components",
  "106": "React Hooks", "107": "React Hooks", "108": "React Hooks", "109": "React Hooks", "110": "React Hooks",
  "111": "CSS", "112": "CSS", "113": "CSS", "114": "CSS", "115": "CSS",
  "116": "Async Patterns", "117": "Async Patterns", "118": "Async Patterns", "119": "Async Patterns", "120": "Async Patterns",
};

const dsaIds = new Set(Array.from({ length: 70 }, (_, i) => String(i + 1)));
const frontendIds = new Set(Array.from({ length: 50 }, (_, i) => String(i + 71)));

const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bg: string; border: string }
> = {
  easy: {
    label: "Easy",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  medium: {
    label: "Medium",
    color: "text-white",
    bg: "bg-white/10",
    border: "border-white/20",
  },
  hard: {
    label: "Hard",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/30",
  },
};

const topicColors: Record<string, string> = {
  "Arrays": "text-blue-400 bg-blue-400/10",
  "Strings": "text-purple-400 bg-purple-400/10",
  "Linked List": "text-cyan-400 bg-cyan-400/10",
  "Stack": "text-orange-400 bg-orange-400/10",
  "Binary Search": "text-white bg-white/10",
  "Trees": "text-green-400 bg-green-400/10",
  "DP": "text-pink-400 bg-pink-400/10",
  "Graph": "text-indigo-400 bg-indigo-400/10",
  "Matrix": "text-teal-400 bg-teal-400/10",
  "Backtracking": "text-rose-400 bg-rose-400/10",
  "Heap": "text-violet-400 bg-violet-400/10",
  "Greedy": "text-lime-400 bg-lime-400/10",
  "Bit Manipulation": "text-sky-400 bg-sky-400/10",
  "Intervals": "text-fuchsia-400 bg-fuchsia-400/10",
  "Math": "text-white bg-neutral-100/10",
  "Trie": "text-emerald-300 bg-emerald-300/10",
  "Design": "text-red-300 bg-red-300/10",
  "Two Pointers": "text-cyan-300 bg-cyan-300/10",
  "Hash Map": "text-blue-300 bg-blue-300/10",
  "JS Utilities": "text-white bg-white/10",
  "DOM": "text-orange-400 bg-orange-400/10",
  "UI Components": "text-blue-400 bg-blue-400/10",
  "React Hooks": "text-cyan-400 bg-cyan-400/10",
  "CSS": "text-pink-400 bg-pink-400/10",
  "Async Patterns": "text-purple-400 bg-purple-400/10",
};

export default function PreparePage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">("all");
  const [category, setCategory] = useState<Category>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");

  useEffect(() => {
    fetchProblems();
  }, []);

  // Reset topic when category changes
  useEffect(() => {
    setTopicFilter("all");
  }, [category]);

  async function fetchProblems() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/problems");
      const data = await res.json();
      if (data.success && data.data) {
        setProblems(data.data);
      } else {
        setError(data.message || "Failed to load problems");
      }
    } catch {
      setError("Cannot connect to problem service. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  const categoryFiltered = useMemo(() => {
    if (category === "all") return problems;
    if (category === "dsa") return problems.filter((p) => dsaIds.has(p.id));
    return problems.filter((p) => frontendIds.has(p.id));
  }, [problems, category]);

  const availableTopics = useMemo(() => {
    const topics = new Set<string>();
    categoryFiltered.forEach((p) => {
      const t = topicMap[p.id];
      if (t) topics.add(t);
    });
    return Array.from(topics);
  }, [categoryFiltered]);

  const filtered = useMemo(() => {
    return categoryFiltered.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficultyFilter === "all" || p.difficulty === difficultyFilter;
      const matchesTopic = topicFilter === "all" || topicMap[p.id] === topicFilter;
      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [categoryFiltered, search, difficultyFilter, topicFilter]);

  const counts = useMemo(() => {
    const base = categoryFiltered;
    return {
      all: base.length,
      easy: base.filter((p) => p.difficulty === "easy").length,
      medium: base.filter((p) => p.difficulty === "medium").length,
      hard: base.filter((p) => p.difficulty === "hard").length,
    };
  }, [categoryFiltered]);

  return (
    <div className="min-h-screen bg-black text-white font-pixel flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Problems
                </h1>
                <p className="text-zinc-400 text-sm mt-0.5">
                  {problems.length} problems across DSA and Frontend engineering
                </p>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-5">
            {([
              { key: "all" as Category, label: "All Problems", icon: <Code2 className="w-4 h-4" /> },
              { key: "dsa" as Category, label: "DSA", icon: <Braces className="w-4 h-4" /> },
              { key: "frontend" as Category, label: "Frontend", icon: <Layout className="w-4 h-4" /> },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCategory(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  category === tab.key
                    ? "bg-white/10 text-white border-white/20"
                    : "bg-zinc-900/40 text-zinc-500 border-white/5 hover:text-zinc-300 hover:border-white/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/80 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/25/50 transition-colors"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-white/10 rounded-xl">
                <Filter className="w-4 h-4 text-zinc-500 ml-2" />
                {(["all", "easy", "medium", "hard"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      difficultyFilter === d
                        ? d === "all"
                          ? "bg-white/10 text-white"
                          : `${difficultyConfig[d].bg} ${difficultyConfig[d].color}`
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {d === "all" ? "All" : difficultyConfig[d].label}
                    <span className="ml-1 opacity-60">
                      {d === "all" ? counts.all : counts[d]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Tags */}
            {availableTopics.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setTopicFilter("all")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    topicFilter === "all"
                      ? "bg-white/10 text-white"
                      : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  All Topics
                </button>
                {availableTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setTopicFilter(topic === topicFilter ? "all" : topic)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      topicFilter === topic
                        ? topicColors[topic] || "bg-white/10 text-white"
                        : "text-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Problem List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
              <p className="text-zinc-400 text-sm">Loading problems...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="p-4 rounded-2xl bg-red-400/10 border border-red-400/20">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-1">Connection Error</p>
                <p className="text-zinc-400 text-sm max-w-md">{error}</p>
              </div>
              <button
                onClick={fetchProblems}
                className="mt-2 px-5 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest border-b-4 border-r-4 border-neutral-900 active:border-0 active:translate-y-1 transition-all"
              >
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Code2 className="w-8 h-8 text-zinc-600" />
              <p className="text-zinc-400 text-sm">
                {search || difficultyFilter !== "all" || topicFilter !== "all"
                  ? "No problems match your filters"
                  : "No problems available yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_80px_80px_40px] md:grid-cols-[1fr_100px_100px_80px_40px] items-center px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                <span>Title</span>
                <span className="hidden md:block text-center">Topic</span>
                <span className="text-center">Difficulty</span>
                <span className="text-center">Tests</span>
                <span />
              </div>

              {filtered.map((problem, idx) => {
                const dc = difficultyConfig[problem.difficulty];
                const topic = topicMap[problem.id];
                const tc = topicColors[topic] || "text-zinc-400 bg-zinc-400/10";
                return (
                  <Link
                    key={problem.id}
                    href={`/prepare/${problem.id}`}
                    className="group grid grid-cols-[1fr_80px_80px_40px] md:grid-cols-[1fr_100px_100px_80px_40px] items-center px-4 py-3.5 rounded-xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-zinc-600 text-xs font-mono w-6 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold text-white truncate group-hover:text-neutral-300 transition-colors">
                        {problem.title}
                      </span>
                    </div>

                    {topic && (
                      <div className="hidden md:flex justify-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${tc}`}>
                          {topic}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${dc.bg} ${dc.color} ${dc.border} border`}
                      >
                        {dc.label}
                      </span>
                    </div>

                    <div className="text-center text-xs text-zinc-500 font-mono">
                      {problem.testcases?.length || 0}
                    </div>

                    <div className="flex justify-end">
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
