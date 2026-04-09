"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { apiClient } from "@/lib/apiClient";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
      <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
    </div>
  ),
});

type Difficulty = "easy" | "medium" | "hard";

interface TestCase {
  input: string;
  output: string;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  testcases: TestCase[];
}

interface TestResult {
  testcase: number;
  input: string;
  expected: string;
  output: string;
  status: "AC" | "WA" | "TLE" | "Error";
}

interface SubmissionResult {
  status: "pending" | "completed";
  submissionData?: {
    results: TestResult[];
  };
}

const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bg: string }
> = {
  easy: { label: "Easy", color: "text-brand-400", bg: "bg-brand-400/10" },
  medium: { label: "Medium", color: "text-white", bg: "bg-white/10" },
  hard: { label: "Hard", color: "text-red-400", bg: "bg-red-400/10" },
};

const languageTemplates: Record<string, string> = {
  python: `# Write your solution here\n\ndef solve():\n    pass\n\nsolve()\n`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    \n    return 0;\n}\n`,
};

const statusIcons: Record<string, React.ReactNode> = {
  AC: <CheckCircle2 className="w-4 h-4 text-brand-400" />,
  WA: <XCircle className="w-4 h-4 text-red-400" />,
  TLE: <Clock className="w-4 h-4 text-white" />,
  Error: <AlertTriangle className="w-4 h-4 text-red-400" />,
};

const statusLabels: Record<string, { text: string; color: string }> = {
  AC: { text: "Accepted", color: "text-brand-400" },
  WA: { text: "Wrong Answer", color: "text-red-400" },
  TLE: { text: "Time Limit Exceeded", color: "text-white" },
  Error: { text: "Runtime Error", color: "text-red-400" },
};

export default function ProblemWorkspace() {
  const { problemId } = useParams<{ problemId: string }>();
  const router = useRouter();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [language, setLanguage] = useState<"python" | "cpp">("python");
  const [code, setCode] = useState(languageTemplates.python);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!problemId) return;
    fetchProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function fetchProblem() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get(`/problems/${problemId}`);
      if (data.success && data.data) {
        setProblem(data.data);
      } else {
        setError(data.message || "Problem not found");
      }
    } catch {
      setError("Cannot connect to problem service");
    } finally {
      setLoading(false);
    }
  }

  function handleLanguageChange(lang: "python" | "cpp") {
    setLanguage(lang);
    setCode(languageTemplates[lang]);
    setShowLangMenu(false);
  }

  function handleReset() {
    setCode(languageTemplates[language]);
    setResults(null);
    setSubmissionError(null);
  }

  const pollSubmission = useCallback(async (submissionId: string) => {
    pollRef.current = setInterval(async () => {
      try {
        const data = await apiClient.get(`/api/submissions/${submissionId}`);
        const submission: SubmissionResult = data.data;

        if (submission.status === "completed") {
          if (pollRef.current) clearInterval(pollRef.current);
          setResults(submission.submissionData?.results || []);
          setSubmitting(false);
        }
      } catch {
        if (pollRef.current) clearInterval(pollRef.current);
        setSubmissionError("Failed to fetch results");
        setSubmitting(false);
      }
    }, 1500);
  }, []);

  async function handleSubmit() {
    if (!problem || submitting) return;

    setSubmitting(true);
    setResults(null);
    setSubmissionError(null);

    try {
      const data = await apiClient.post("/api/submissions", {
        problemId: problem.id,
        code,
        language,
      });

      if (data.success && data.data?.id) {
        pollSubmission(data.data.id);
      } else {
        setSubmissionError(data.message || "Submission failed");
        setSubmitting(false);
      }
    } catch {
      setSubmissionError("Cannot connect to submission service");
      setSubmitting(false);
    }
  }

  const allPassed = results?.every((r) => r.status === "AC") || false;
  const passedCount = results?.filter((r) => r.status === "AC").length || 0;

  if (loading) {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center gap-4 text-white">
        <AlertTriangle className="w-10 h-10 text-red-400" />
        <p className="text-zinc-400">{error || "Problem not found"}</p>
        <button
          onClick={() => router.push("/prepare")}
          className="px-4 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest"
        >
          Back to Problems
        </button>
      </div>
    );
  }

  const dc = difficultyConfig[problem.difficulty];

  return (
    <div className="h-screen bg-gray-950 text-white font-pixel flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/prepare"
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
          </Link>
          <h1 className="text-sm font-bold truncate">{problem.title}</h1>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${dc.bg} ${dc.color}`}
          >
            {dc.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-white/10 rounded-lg text-xs font-mono hover:border-white/20 transition-colors"
            >
              {language === "python" ? "Python" : "C++"}
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-zinc-800 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => handleLanguageChange("python")}
                  className={`w-full px-3 py-2 text-xs text-left hover:bg-white/5 ${
                    language === "python" ? "text-white" : "text-white"
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => handleLanguageChange("cpp")}
                  className={`w-full px-3 py-2 text-xs text-left hover:bg-white/5 ${
                    language === "cpp" ? "text-white" : "text-white"
                  }`}
                >
                  C++
                </button>
              </div>
            )}
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-1.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
          >
            {submitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
            {submitting ? "Running..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Problem Description */}
        <div className="w-full md:w-[45%] border-r border-white/5 overflow-y-auto">
          <div className="p-5 md:p-6">
            <h2 className="text-xl font-bold mb-4">{problem.title}</h2>

            {/* Description */}
            <div
              className="prose prose-invert prose-sm max-w-none
                [&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:font-sans
                [&_pre]:bg-zinc-900 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-3
                [&_code]:text-white [&_code]:text-xs [&_code]:font-mono
                [&_h3]:text-white [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
                [&_ul]:text-zinc-300 [&_ul]:font-sans [&_li]:text-zinc-300
                [&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: problem.description }}
            />

            {/* Test Cases Preview */}
            {problem.testcases.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Examples
                </h3>
                <div className="space-y-3">
                  {problem.testcases.slice(0, 2).map((tc, i) => (
                    <div
                      key={i}
                      className="bg-zinc-900/60 border border-white/5 rounded-lg p-3"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                        Example {i + 1}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">
                            Input:
                          </span>
                          <pre className="mt-0.5 text-xs font-mono text-zinc-300 whitespace-pre-wrap">
                            {tc.input}
                          </pre>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">
                            Output:
                          </span>
                          <pre className="mt-0.5 text-xs font-mono text-zinc-300 whitespace-pre-wrap">
                            {tc.output}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Editor + Results */}
        <div className="w-full md:w-[55%] flex flex-col overflow-hidden">
          {/* Editor */}
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language={language === "cpp" ? "cpp" : "python"}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                fontSize: 14,
                fontFamily: "JetBrains Mono, monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                lineNumbers: "on",
                renderLineHighlight: "line",
                tabSize: 4,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </div>

          {/* Results Panel */}
          <div className="shrink-0 border-t border-white/5 bg-black/60 max-h-[40%] overflow-y-auto">
            <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
              <Terminal className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Results
              </span>

              {results && (
                <span
                  className={`ml-auto text-xs font-bold ${
                    allPassed ? "text-brand-400" : "text-red-400"
                  }`}
                >
                  {allPassed
                    ? "All Passed!"
                    : `${passedCount}/${results.length} Passed`}
                </span>
              )}
            </div>

            <div className="p-3">
              {submitting ? (
                <div className="flex items-center justify-center py-6 gap-2">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                  <span className="text-sm text-zinc-400">
                    Running test cases...
                  </span>
                </div>
              ) : submissionError ? (
                <div className="flex items-center gap-2 py-4 px-3 bg-red-400/5 border border-red-400/10 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-xs text-red-300">
                    {submissionError}
                  </span>
                </div>
              ) : results ? (
                <div className="space-y-2">
                  {results.map((r, i) => {
                    const sl = statusLabels[r.status];
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 px-3 py-2.5 bg-zinc-900/40 border border-white/5 rounded-lg"
                      >
                        <div className="mt-0.5">
                          {statusIcons[r.status]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-zinc-500">
                              Test {i + 1}
                            </span>
                            <span
                              className={`text-xs font-bold ${sl.color}`}
                            >
                              {sl.text}
                            </span>
                          </div>
                          {r.status !== "AC" && (
                            <div className="mt-1.5 grid grid-cols-2 gap-2 text-[11px] font-mono">
                              <div>
                                <span className="text-zinc-600">
                                  Expected:{" "}
                                </span>
                                <span className="text-brand-300">
                                  {r.expected}
                                </span>
                              </div>
                              <div>
                                <span className="text-zinc-600">Got: </span>
                                <span className="text-red-300">
                                  {r.output || "(no output)"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center py-6">
                  <span className="text-xs text-zinc-600">
                    Submit your code to see results
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
