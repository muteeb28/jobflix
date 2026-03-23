import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Params {
    params: Promise<{ courseSlug: string }>;
}

/**
 * GET /api/courses/[courseSlug]
 * Returns a single course with all its modules and topics
 */
export async function GET(request: Request, { params }: Params) {
    try {
        const { courseSlug } = await params;

        const course = await prisma.course.findUnique({
            where: { slug: courseSlug },
            include: {
                modules: {
                    orderBy: { order: "asc" },
                    include: {
                        topics: {
                            orderBy: { order: "asc" },
                            select: {
                                id: true,
                                title: true,
                                xp: true,
                                order: true,
                                isFree: true,
                                lesson: {
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Transform modules and topics for frontend
        const transformedModules = course.modules.map((module) => ({
            id: module.id,
            title: module.title,
            order: module.order,
            topics: module.topics.map((topic) => ({
                id: topic.id,
                title: topic.title,
                xp: topic.xp,
                order: topic.order,
                isFree: topic.isFree,
                lessonId: topic.lesson?.id || null,
            })),
        }));

        return NextResponse.json({
            course: {
                id: course.id,
                slug: course.slug,
                title: course.title,
                description: course.description,
                image: course.image,
                level: course.level,
                duration: course.duration,
                tags: course.tags,
            },
            modules: transformedModules,
        });
    } catch (error) {
        console.error("Failed to fetch course:", error);
        return NextResponse.json(
            { error: "Failed to fetch course" },
            { status: 500 }
        );
    }
}
