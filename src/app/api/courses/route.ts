import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/courses
 * Returns all active courses with their module count
 */
export async function GET() {
    try {
        const courses = await prisma.course.findMany({
            where: { isActive: true },
            orderBy: { order: "asc" },
            include: {
                modules: {
                    include: {
                        _count: {
                            select: { topics: true },
                        },
                    },
                },
            },
        });

        // Transform to include topic counts
        const transformedCourses = courses.map((course) => ({
            id: course.id,
            slug: course.slug,
            title: course.title,
            description: course.description,
            image: course.image,
            level: course.level,
            duration: course.duration,
            tags: course.tags,
            moduleCount: course.modules.length,
            topicCount: course.modules.reduce(
                (sum, mod) => sum + mod._count.topics,
                0
            ),
        }));

        return NextResponse.json({ courses: transformedCourses });
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        return NextResponse.json(
            { error: "Failed to fetch courses" },
            { status: 500 }
        );
    }
}
