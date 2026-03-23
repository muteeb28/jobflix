import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE_NAME = "levelup_session";

/**
 * Get or create a user based on session ID
 */
async function getOrCreateUser() {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    // If no session, create one
    if (!sessionId) {
        sessionId = crypto.randomUUID();
    }

    // Find or create user
    let user = await prisma.user.findUnique({
        where: { sessionId },
    });

    if (!user) {
        user = await prisma.user.create({
            data: { sessionId },
        });
    }

    return { user, sessionId };
}

/**
 * GET /api/progress
 * Returns user's progress including completed topics and XP
 */
export async function GET() {
    try {
        const { user, sessionId } = await getOrCreateUser();

        const progress = await prisma.userProgress.findMany({
            where: { userId: user.id, isCompleted: true },
            select: {
                topicId: true,
                xpEarned: true,
                completedAt: true,
            },
        });

        // Create response with session cookie if new
        const response = NextResponse.json({
            userId: user.id,
            totalXp: user.totalXp,
            completedTopics: progress.map((p) => p.topicId),
            progress: progress,
        });

        // Set session cookie if it doesn't exist
        const cookieStore = await cookies();
        if (!cookieStore.get(SESSION_COOKIE_NAME)?.value) {
            response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 365, // 1 year
            });
        }

        return response;
    } catch (error) {
        console.error("Failed to fetch progress:", error);
        return NextResponse.json(
            { error: "Failed to fetch progress" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/progress
 * Mark a topic as completed and award XP
 * Body: { topicId: string }
 */
export async function POST(request: Request) {
    try {
        const { user, sessionId } = await getOrCreateUser();
        const body = await request.json();
        const { topicId } = body;

        if (!topicId) {
            return NextResponse.json(
                { error: "topicId is required" },
                { status: 400 }
            );
        }

        // Get topic to check XP value
        const topic = await prisma.topic.findUnique({
            where: { id: topicId },
        });

        if (!topic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        // Check if already completed
        const existingProgress = await prisma.userProgress.findUnique({
            where: {
                userId_topicId: {
                    userId: user.id,
                    topicId,
                },
            },
        });

        if (existingProgress?.isCompleted) {
            return NextResponse.json({
                message: "Topic already completed",
                alreadyCompleted: true,
                totalXp: user.totalXp,
            });
        }

        // Mark as completed and award XP in a transaction
        const [updatedProgress, updatedUser] = await prisma.$transaction([
            prisma.userProgress.upsert({
                where: {
                    userId_topicId: {
                        userId: user.id,
                        topicId,
                    },
                },
                create: {
                    userId: user.id,
                    topicId,
                    isCompleted: true,
                    xpEarned: topic.xp,
                    completedAt: new Date(),
                },
                update: {
                    isCompleted: true,
                    xpEarned: topic.xp,
                    completedAt: new Date(),
                },
            }),
            prisma.user.update({
                where: { id: user.id },
                data: { totalXp: { increment: topic.xp } },
            }),
        ]);

        const response = NextResponse.json({
            message: "Topic completed",
            xpEarned: topic.xp,
            totalXp: updatedUser.totalXp,
            progress: updatedProgress,
        });

        // Set session cookie if it doesn't exist
        const cookieStore = await cookies();
        if (!cookieStore.get(SESSION_COOKIE_NAME)?.value) {
            response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 365,
            });
        }

        return response;
    } catch (error) {
        console.error("Failed to update progress:", error);
        return NextResponse.json(
            { error: "Failed to update progress" },
            { status: 500 }
        );
    }
}
