import { NextResponse } from "next/server";
import { mockSubmissions } from "../mock-store";

const SUBMISSION_SERVICE = process.env.SUBMISSION_SERVICE_URL;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // If backend is configured, proxy to it
  if (SUBMISSION_SERVICE) {
    try {
      const res = await fetch(`${SUBMISSION_SERVICE}/submissions/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch {
      // Fall through to mock mode
    }
  }

  // Mock mode: return completed after 2s delay
  const submission = mockSubmissions.get(id);
  if (!submission) {
    return NextResponse.json(
      { success: false, message: "Submission not found" },
      { status: 404 }
    );
  }

  const elapsed = Date.now() - submission.createdAt;
  const isCompleted = elapsed > 2000;

  return NextResponse.json({
    success: true,
    data: {
      id,
      status: isCompleted ? "completed" : "pending",
      submissionData: isCompleted ? { results: submission.results } : null,
    },
  });
}
