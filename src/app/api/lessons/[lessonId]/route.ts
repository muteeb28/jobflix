import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
  params: Promise<{ lessonId: string }>;
}

/**
 * GET /api/lessons/[lessonId]
 * Returns a single lesson with all its content and subtopics
 */
export async function GET(request: Request, { params }: Params) {
  try {
    const { lessonId } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        subtopics: {
          orderBy: { order: "asc" },
        },
        topic: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    slug: true,
                    title: true,
                  },
                },
                topics: {
                  orderBy: { order: "asc" },
                  select: {
                    id: true,
                    title: true,
                    lesson: {
                      select: { id: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Find next and previous lessons
    const allTopics = lesson.topic.module.topics;
    const currentIndex = allTopics.findIndex((t) => t.id === lesson.topic.id);
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const nextTopic =
      currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

    return NextResponse.json({
      lesson: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        task: lesson.task,
        hint: lesson.hint,
        initialCode: lesson.initialCode,
        subtopics: lesson.subtopics.map((st) => ({
          id: st.id,
          title: st.title,
          content: st.content,
          order: st.order,
        })),
      },
      topic: {
        id: lesson.topic.id,
        title: lesson.topic.title,
        xp: lesson.topic.xp,
        isFree: lesson.topic.isFree,
      },
      course: {
        slug: lesson.topic.module.course.slug,
        title: lesson.topic.module.course.title,
      },
      navigation: {
        prevLessonId: prevTopic?.lesson?.id || null,
        nextLessonId: nextTopic?.lesson?.id || null,
      },
    });
  } catch (error) {
    console.error("Failed to fetch lesson:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson" },
      { status: 500 }
    );
  }
}
