"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle, ArrowLeft, Lightbulb, Play, Trash2 } from "lucide-react";
import { useUserProgress } from "@/context/UserProgressContext";
import { useRouter } from "next/navigation";

type ContentBlock =
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: string[] }
    | { type: "note"; text: string; title?: string }
    | { type: "warning"; text: string; title?: string }
    | { type: "code"; text: string };

interface TopicCode {
    defaultFileName?: string;
    starterCode: string;
    expectedConsole?: string;
    runnable?: boolean;
}

interface SubTopic {
    title: string;
    content?: string;
    contentBlocks?: ContentBlock[];
    code?: TopicCode;
    task?: string;
    hint?: string;
}

type CodeRunnerResult = {
    output: string[];
    error?: string;
};

type CodeRunner = (source: string) => CodeRunnerResult;

type LessonVariant = "default" | "qa";

interface JSLessonViewProps {
    lessonId: string;
    title: string;
    subtopics?: SubTopic[];
    description?: string;
    task: string;
    hint: string;
    initialCode: string;
    lessonNumber?: number | string;
    backHref?: string;
    backLabel?: string;
    defaultFileName?: string;
    editorPlaceholder?: string;
    variant?: LessonVariant;
    progressId?: number;
    nextLessonHref?: string;
    runner?: CodeRunner;
}

// Custom Renderer to make the text content look beautiful
const ContentRenderer = ({ content }: { content: string }) => {
    const bulletToken = "\u0192?\u203a";
    const lines = content.split("\n");
    type Block =
        | { type: "spacer" }
        | { type: "p"; text: string }
        | { type: "h3"; text: string }
        | { type: "h4"; text: string }
        | { type: "ul"; items: string[] }
        | { type: "code"; text: string };

    const blocks: Block[] = [];
    let codeBuffer: string[] = [];
    let listBuffer: string[] = [];

    const flushCode = () => {
        if (codeBuffer.length > 0) {
            blocks.push({ type: "code", text: codeBuffer.join("\n") });
            codeBuffer = [];
        }
    };

    const flushList = () => {
        if (listBuffer.length > 0) {
            blocks.push({ type: "ul", items: listBuffer });
            listBuffer = [];
        }
    };

    const isCodeLine = (line: string, trimmed: string) => {
        if (!trimmed) {
            return false;
        }

        const codeStarters = [
            "const ",
            "let ",
            "var ",
            "function ",
            "class ",
            "if ",
            "else if ",
            "else",
            "for ",
            "while ",
            "do ",
            "switch ",
            "case ",
            "break",
            "return ",
            "try",
            "catch",
            "finally",
            "throw ",
            "console.",
            "import ",
            "export "
        ];

        if (codeStarters.some((starter) => trimmed.startsWith(starter))) {
            return true;
        }

        if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
            return true;
        }

        if (/^[{}]$/.test(trimmed)) {
            return true;
        }

        if (trimmed.includes("=>") || trimmed.includes("console.log")) {
            return true;
        }

        if (/^[A-Za-z_$][\w$]*\s*[+*\/%-]?=\s*.+/.test(trimmed)) {
            return true;
        }

        if (/\?\s*.*\s*:\s*/.test(trimmed)) {
            return true;
        }

        if (/^\w+\s*\(.*\);?$/.test(trimmed) && trimmed.includes("(")) {
            return true;
        }

        if (/;\s*$/.test(trimmed)) {
            return true;
        }

        return false;
    };

    lines.forEach((line) => {
        const trimmed = line.trim();

        if (!trimmed) {
            flushCode();
            flushList();
            blocks.push({ type: "spacer" });
            return;
        }

        if (trimmed.startsWith(bulletToken) || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            flushCode();
            const item = trimmed.startsWith(bulletToken)
                ? trimmed.substring(bulletToken.length).trim()
                : trimmed.replace(/^[-*]\s+/, "");
            listBuffer.push(item);
            return;
        }

        flushList();

        if (/^\d+\./.test(trimmed)) {
            flushCode();
            blocks.push({ type: "h3", text: trimmed });
            return;
        }

        if (trimmed.endsWith(":") || (trimmed.length < 40 && /^[A-Z\s]+$/.test(trimmed))) {
            flushCode();
            blocks.push({ type: "h4", text: trimmed });
            return;
        }

        if (isCodeLine(line, trimmed)) {
            codeBuffer.push(line);
            return;
        }

        flushCode();
        blocks.push({ type: "p", text: trimmed });
    });

    flushCode();
    flushList();

    return (
        <div className="space-y-4 font-sans text-gray-300 leading-relaxed text-base">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case "spacer":
                        return <div key={index} className="h-4" />;
                    case "h3":
                        return (
                            <h3 key={index} className="text-xl font-bold text-white mt-8 mb-3 tracking-tight">
                                {block.text}
                            </h3>
                        );
                    case "h4":
                        return (
                            <h4 key={index} className="text-lg font-semibold text-gray-100 mt-6 mb-2">
                                {block.text}
                            </h4>
                        );
                    case "ul":
                        return (
                            <ul key={index} className="space-y-2">
                                {block.items.map((item, itemIndex) => (
                                    <li key={`${index}-${itemIndex}`} className="flex items-start gap-3 ml-2">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0" />
                                        <span className="text-gray-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        );
                    case "code":
                        return (
                            <pre
                                key={index}
                                className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 font-mono text-sm text-yellow-100/90 whitespace-pre-wrap shadow-sm"
                            >
                                {block.text}
                            </pre>
                        );
                    case "p":
                    default:
                        return (
                            <p key={index} className="mb-2 leading-7">
                                {block.text}
                            </p>
                        );
                }
            })}
        </div>
    );
};

const ContentBlocksRenderer = ({ blocks }: { blocks: ContentBlock[] }) => {
    return (
        <div className="space-y-4 font-sans text-gray-300 leading-relaxed text-base">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case "h2":
                        return (
                            <h3 key={index} className="text-xl font-bold text-white mt-8 mb-3 tracking-tight">
                                {block.text}
                            </h3>
                        );
                    case "h3":
                        return (
                            <h4 key={index} className="text-lg font-semibold text-gray-100 mt-6 mb-2">
                                {block.text}
                            </h4>
                        );
                    case "ul":
                        return (
                            <ul key={index} className="space-y-2">
                                {block.items.map((item, itemIndex) => (
                                    <li key={`${index}-${itemIndex}`} className="flex items-start gap-3 ml-2">
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0" />
                                        <span className="text-gray-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        );
                    case "ol":
                        return (
                            <ol key={index} className="space-y-2 list-decimal list-inside text-gray-200">
                                {block.items.map((item, itemIndex) => (
                                    <li key={`${index}-${itemIndex}`}>{item}</li>
                                ))}
                            </ol>
                        );
                    case "note":
                        return (
                            <div key={index} className="bg-yellow-900/10 border border-yellow-500/20 rounded-lg p-4">
                                <div className="text-yellow-400 mb-2 font-bold font-pixel uppercase text-xs">
                                    {block.title || "Note"}
                                </div>
                                <p className="text-yellow-100/70 text-sm leading-relaxed">{block.text}</p>
                            </div>
                        );
                    case "warning":
                        return (
                            <div key={index} className="bg-red-900/10 border border-red-500/20 rounded-lg p-4">
                                <div className="text-red-400 mb-2 font-bold font-pixel uppercase text-xs">
                                    {block.title || "Warning"}
                                </div>
                                <p className="text-red-100/70 text-sm leading-relaxed">{block.text}</p>
                            </div>
                        );
                    case "code":
                        return (
                            <pre key={index} className="bg-gray-900/50 border-l-2 border-yellow-500/50 pl-4 py-2 my-2 font-mono text-sm text-yellow-100/90 rounded-r shadow-sm whitespace-pre-wrap">
                                {block.text}
                            </pre>
                        );
                    case "p":
                    default:
                        return <p key={index} className="mb-2 leading-7">{block.text}</p>;
                }
            })}
        </div>
    );
};

export default function JSLessonView({
    lessonId,
    title,
    subtopics = [],
    description,
    task,
    hint,
    initialCode,
    lessonNumber,
    backHref = "/courses/javascript-backend",
    backLabel = "Back To Course Detail",
    defaultFileName = "main.js",
    editorPlaceholder = "// Write your JavaScript code here...",
    variant = "default",
    progressId,
    nextLessonHref,
    runner
}: JSLessonViewProps) {
    const router = useRouter();
    const { xp, markTopicAsCompleted, completedTopics } = useUserProgress();
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    const [fileName, setFileName] = useState(defaultFileName);

    const numericLessonId = Number.parseInt(lessonId, 10);
    const progressKey = typeof progressId === "number" ? progressId : (Number.isFinite(numericLessonId) ? numericLessonId : null);
    const isCompleted = progressKey !== null ? completedTopics.includes(String(progressKey)) : false;

    const effectiveSubtopics = useMemo(() => {
        const filteredSubtopics = Array.isArray(subtopics) ? subtopics.filter(Boolean) : [];
        return filteredSubtopics.length > 0
            ? filteredSubtopics
            : [{ title: "Introduction", content: description || "" }];
    }, [subtopics, description]);

    const safeIndex = Math.max(0, Math.min(activeTopicIndex, effectiveSubtopics.length - 1));
    const activeTopic = effectiveSubtopics[safeIndex];
    const isLastTopic = safeIndex >= effectiveSubtopics.length - 1;

    const resolveStarterCode = (topic?: SubTopic) => topic?.code?.starterCode ?? initialCode;
    const resolveFileName = (topic?: SubTopic) => topic?.code?.defaultFileName ?? defaultFileName;
    const activeTask = activeTopic?.task ?? task;
    const activeHint = activeTopic?.hint ?? hint;
    const taskText = (activeTask ?? "").trim();
    const hintText = (activeHint ?? "").trim();
    const showTask = taskText.length > 0;
    const showHint = hintText.length > 0;
    const lessonLabel = typeof lessonNumber !== "undefined" ? lessonNumber : lessonId;
    const isQa = variant === "qa";
    const answerText = (activeTopic?.content || "").replace(/^(A\.|Answer:)\s*/i, "").trim();
    const answerLines = answerText
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);

    useEffect(() => {
        const currentTopic = effectiveSubtopics[safeIndex];
        setCode(resolveStarterCode(currentTopic));
        setFileName(resolveFileName(currentTopic));
        setOutput([]);
        setError(null);
    }, [safeIndex, effectiveSubtopics, initialCode, defaultFileName]);

    const handleComplete = () => {
        if (!isLastTopic) {
            setActiveTopicIndex((prev) => Math.min(prev + 1, effectiveSubtopics.length - 1));
            return;
        }

        if (progressKey !== null && !isCompleted) {
            markTopicAsCompleted(String(progressKey));
        }

        if (nextLessonHref) {
            router.push(nextLessonHref);
        }
    };

    const runCode = () => {
        setError(null);
        setOutput([]);

        if (runner) {
            try {
                const result = runner(code);
                if (result.error) {
                    setError(result.error);
                }
                setOutput(result.output.length > 0 ? result.output : ["(No output)"]);
            } catch (err: any) {
                setError(err.toString());
            }
            return;
        }

        const logs: string[] = [];
        const originalConsoleLog = console.log;

        // Override console.log to capture output
        console.log = (...args) => {
            logs.push(args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
            originalConsoleLog(...args);
        };

        try {
            eval(code);
            setOutput(logs.length > 0 ? logs : ["(No output)"]);
        } catch (err: any) {
            setError(err.toString());
        } finally {
            console.log = originalConsoleLog;
        }
    };

    return (
        <div className="h-screen overflow-hidden bg-black text-white font-sans flex flex-col">
            {/* Navbar */}
            <header className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-4 z-10 shrink-0 relative">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-20 md:w-28 h-6 md:h-8">
                            <Image
                                src="/assets/files/jobflix-light-logo.png"
                                alt="JobFlix Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 font-pixel text-xl font-bold uppercase tracking-widest text-white/90">
                    {title}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <button className="px-3 py-1.5 md:px-4 md:py-2 bg-yellow-400 text-black font-bold font-pixel text-xs md:text-sm rounded hover:bg-yellow-500 transition-colors">
                        <span className="hidden md:inline">Dashboard</span>
                        <span className="md:hidden">DB</span>
                    </button>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-500 border-2 border-white"></div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Left Panel - Documentation Browser (55% width on desktop, full on mobile) */}
                <div className={`${isQa ? "lg:w-[60%]" : "lg:w-[55%]"} w-full flex flex-col md:flex-row border-b lg:border-b-0 lg:border-r border-gray-800 bg-[#0a0a0a] h-1/2 lg:h-auto shrink-0 md:shrink`}>

                    {/* Inner Sidebar - Topic List */}
                    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-800 bg-black flex flex-col overflow-y-auto h-24 md:h-auto py-2 md:py-6 shrink-0">
                        <div className="px-4 mb-2 md:mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider font-pixel opacity-70 truncate">
                            Lesson {String(lessonLabel).substring(0, 8)}{String(lessonLabel).length > 8 ? '...' : ''}
                        </div>
                        <div className="flex flex-col relative">
                            {/* Vertical Line for connection feel */}
                            <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-900 z-0"></div>

                            {effectiveSubtopics.map((topic, index) => {
                                const isActive = index === activeTopicIndex;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTopicIndex(index)}
                                        className={`relative z-10 flex items-center gap-3 py-2 md:py-3 px-4 text-left transition-all group w-full ${isActive ? 'bg-gray-900/50' : 'hover:bg-gray-900/30'}`}
                                    >
                                        <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border-2 shrink-0 transition-all ${isActive ? 'bg-green-500 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] scale-110' : 'bg-black border-gray-700 group-hover:border-gray-500'}`} />
                                        <span className={`text-[10px] md:text-xs font-medium leading-tight transition-colors line-clamp-2 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                            {topic.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Topic Content */}
                    <div className="w-full md:w-2/3 overflow-y-auto bg-[#111] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent h-full">
                        <div className="p-4 md:p-8 pb-32">
                            <h2 className="text-xl md:text-3xl font-extrabold text-white mb-4 md:mb-8 font-sans tracking-tight border-b border-gray-800 pb-2 md:pb-4">
                                {activeTopic.title}
                            </h2>

                            {activeTopic.contentBlocks && activeTopic.contentBlocks.length > 0 ? (
                                <ContentBlocksRenderer blocks={activeTopic.contentBlocks} />
                            ) : (
                                <ContentRenderer content={activeTopic.content || ""} />
                            )}

                            {/* Task & Hint pinned to bottom of content or after text */}
                            {(showTask || showHint) && (
                                <div className="mt-8 md:mt-12 space-y-4 md:space-y-6 pt-8 border-t border-gray-800">
                                    {showTask && (
                                        <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 md:p-5">
                                            <div className="flex items-center gap-2 text-blue-400 mb-2">
                                                <CheckCircle className="w-4 h-4" />
                                                <h3 className="font-bold font-pixel uppercase text-xs">Task</h3>
                                            </div>
                                            <p className="text-blue-100/70 text-sm">
                                                {taskText}
                                            </p>
                                        </div>
                                    )}

                                    {showHint && (
                                        <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-lg p-4 md:p-5">
                                            <div className="flex items-center gap-2 text-yellow-400 mb-2">
                                                <Lightbulb className="w-4 h-4" />
                                                <h3 className="font-bold font-pixel uppercase text-xs">Hint</h3>
                                            </div>
                                            <p className="text-yellow-100/70 text-sm">
                                                {hintText}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                {isQa ? (
                    <div className="w-full lg:w-[40%] flex flex-col bg-[#0c0c0c] h-1/2 lg:h-auto">
                        <div className="h-10 md:h-12 bg-[#1a1a1a] border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
                            <span className="text-[10px] md:text-xs text-gray-400 font-mono uppercase tracking-widest">Quick Recall</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-5">
                                <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-yellow-400 font-mono mb-3">
                                    Answer
                                </div>
                                <p className="text-gray-200 leading-relaxed text-xs md:text-sm">
                                    {answerText || "Answer coming soon."}
                                </p>
                            </div>
                            <div className="bg-black/60 border border-gray-800 rounded-xl p-4 md:p-5">
                                <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-400 font-mono mb-3">
                                    Key Points
                                </div>
                                {answerLines.length > 0 ? (
                                    <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                                        {answerLines.slice(0, 6).map((line, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0" />
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs md:text-sm text-gray-500">No key points yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col bg-[#0c0c0c] h-1/2 lg:h-auto border-t lg:border-t-0 border-gray-800 order-last lg:order-none">

                        {/* Toolbar */}
                        <div className="h-10 md:h-12 bg-[#1a1a1a] border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="text-[10px] md:text-xs text-gray-400 font-mono">{fileName}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCode(resolveStarterCode(activeTopic))}
                                    className="p-1.5 md:p-2 text-gray-400 hover:text-white transition-colors"
                                    title="Reset Code"
                                >
                                    <Trash2 size={14} className="md:w-4 md:h-4" />
                                </button>
                                <button
                                    onClick={runCode}
                                    className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 bg-green-600 hover:bg-green-500 text-white text-[10px] md:text-xs font-bold font-mono rounded transition-colors"
                                >
                                    <Play size={10} className="md:w-[14px] md:h-[14px]" fill="currentColor" />
                                    RUN
                                </button>
                            </div>
                        </div>

                        {/* Split View */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                            {/* Editor (Left) */}
                            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col h-1/2 md:h-full">
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="flex-1 w-full bg-[#0c0c0c] text-gray-300 font-mono text-xs md:text-sm p-3 md:p-4 outline-none resize-none leading-relaxed"
                                    spellCheck={false}
                                    placeholder={editorPlaceholder}
                                />
                            </div>

                            {/* Output (Right) */}
                            <div className="w-full md:w-1/2 flex flex-col bg-[#111] h-1/2 md:h-full">
                                <div className="h-6 md:h-8 bg-[#1a1a1a] border-b border-gray-800 flex items-center px-4 shrink-0">
                                    <span className="text-[10px] md:text-xs text-gray-400 font-mono">Console Output</span>
                                </div>
                                <div className="flex-1 p-3 md:p-4 overflow-y-auto font-mono text-xs md:text-sm">
                                    {error && (
                                        <div className="text-red-400 whitespace-pre-wrap">{error}</div>
                                    )}
                                    {output.map((line, i) => (
                                        <div key={i} className="text-gray-300 whitespace-pre-wrap border-b border-gray-800/50 pb-1 mb-1 last:border-0">{line}</div>
                                    ))}
                                    {output.length === 0 && !error && (
                                        <div className="text-gray-600 italic">Run code to see output...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="h-14 md:h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-between px-4 md:px-6 shrink-0">
                <Link href={backHref} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-xs md:text-sm">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden md:inline">{backLabel}</span>
                    <span className="md:hidden">Back</span>
                </Link>

                <div className="flex items-center gap-2 text-yellow-400 font-bold font-pixel text-sm md:text-lg animate-pulse">
                    <Star className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400" />
                    <span className="hidden md:inline">Total XP:</span> {xp}
                </div>

                <button
                    onClick={handleComplete}
                    className="px-4 py-2 md:px-6 md:py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition-colors text-xs md:text-base"
                >
                    {isCompleted ? 'Completed' : 'Complete & Next'}
                </button>
            </footer>
        </div>
    );
}
