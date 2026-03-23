import { NextResponse } from "next/server";
import { getJavaLessonBySlug } from "@/data/server/javaLessons";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const lesson = getJavaLessonBySlug(params.slug);

  const headers = {
    "Cache-Control": "no-store"
  };

  if (!lesson) {
    return NextResponse.json(
      { error: "Lesson not found" },
      { status: 404, headers }
    );
  }

  return NextResponse.json(
    {
      course: lesson.course,
      chapter: lesson.chapter,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      codeSnippet: lesson.codeSnippet,
      metadata: lesson.metadata ?? {}
    },
    { headers }
  );
}
