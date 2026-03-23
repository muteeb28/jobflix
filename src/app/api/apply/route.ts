import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSION_COOKIE_NAME = "levelup_session";

/**
 * POST /api/apply
 * Submit a quick apply form
 * Body: { name, email, phone, service, message? }
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, service, message } = body;

        // Validation
        if (!name || !email || !phone || !service) {
            return NextResponse.json(
                { error: "Name, email, phone, and service are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Try to find user by session
        let userId: string | null = null;
        const cookieStore = await cookies();
        const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

        if (sessionId) {
            const user = await prisma.user.findUnique({
                where: { sessionId },
            });
            if (user) {
                userId = user.id;
                // Update user email if not set
                if (!user.email) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { email, name },
                    });
                }
            }
        }

        // Create form submission
        const submission = await prisma.formSubmission.create({
            data: {
                userId,
                formType: "quick_apply",
                data: {
                    name,
                    email,
                    phone,
                    service,
                    message: message || null,
                    submittedAt: new Date().toISOString(),
                },
                status: "pending",
            },
        });

        return NextResponse.json({
            message: "Application submitted successfully",
            submissionId: submission.id,
        });
    } catch (error) {
        console.error("Failed to submit application:", error);
        return NextResponse.json(
            { error: "Failed to submit application" },
            { status: 500 }
        );
    }
}
