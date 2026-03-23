import { notFound } from "next/navigation";
import { getJavaLessonBySlug } from "@/data/server/javaLessons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LessonPageProps = {
  params: Promise<{
    lessonSlug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const lesson = getJavaLessonBySlug(resolvedParams.lessonSlug);

  if (!lesson) {
    notFound();
  }

  const contentLines = lesson.content.split("\n");
  const codeLines = lesson.codeSnippet.split("\n");

  return (
    <div className="min-h-screen bg-[#05070f] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 text-sm font-semibold uppercase tracking-[0.5em] text-black shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
              LVL
            </div>
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.6em] text-slate-500">Lesson</p>
              <h1 className="text-2xl font-heading leading-tight text-white md:text-3xl">
                {lesson.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-black/60 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300">
              {lesson.chapter}
            </span>
            <span className="text-[11px] uppercase tracking-[0.4em] text-slate-500">
              Java Fundamentals
            </span>
          </div>
        </header>

        <div className="rounded-[32px] border border-slate-900 bg-gradient-to-b from-[#0a0c16] to-[#030409] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.7)]">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-6 overflow-hidden">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">
                  Lesson Brief
                </p>
                {lesson.description ? (
                  <p className="text-gray-200 leading-relaxed">{lesson.description}</p>
                ) : null}
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-900 bg-black/40 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.6em] text-yellow-300">
                    Assignment Instructions
                  </p>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-slate-500">RAW</span>
                </div>
                <div className="max-h-[620px] overflow-y-auto">
                  <div className="space-y-2 text-sm leading-7 text-slate-100">
                    {contentLines.map((line, index) => {
                      const isTopicHeading = line.startsWith("Topic ");
                      const trimmed = line.trim();
                      if (!trimmed) {
                        return <div key={index} className="h-3" />;
                      }

                      return (
                        <p
                          key={index}
                          className={
                            isTopicHeading
                              ? "text-yellow-200 font-heading text-sm leading-[1.4] tracking-tight"
                              : "text-slate-100"
                          }
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col rounded-3xl border border-slate-900 bg-[#05070f]/80 shadow-[0_30px_70px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <span className="text-[10px] uppercase tracking-[0.45em] text-slate-500 font-mono">
                  Main.java
                </span>
                <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                  Read only
                </span>
              </div>
              <div className="flex flex-1 gap-4 px-4 py-4">
                <div className="space-y-0.5 text-right text-[11px] font-code leading-7 text-slate-500 select-none">
                  {codeLines.map((_, index) => (
                    <span key={index} className="block">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  ))}
                </div>
                <div className="flex-1 overflow-x-auto">
                  <pre className="m-0 whitespace-pre-wrap font-code text-[13px] leading-7 text-slate-100">
                    {lesson.codeSnippet}
                  </pre>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-full border border-transparent bg-gradient-to-br from-yellow-400 to-orange-500 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.35em] text-black shadow-[0_15px_50px_rgba(252,211,77,0.5)] transition hover:opacity-90"
            >
              Run
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-800 bg-white/5 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:border-slate-600"
            >
              Submit
            </button>
            <button
              type="button"
              disabled
              className="rounded-full border border-slate-900 bg-slate-900/40 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500 opacity-60 cursor-not-allowed"
            >
              Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
