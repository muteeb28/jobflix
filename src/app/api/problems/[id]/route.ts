import { NextResponse } from "next/server";
import { mockProblems } from "../mock";

const PROBLEM_SERVICE = process.env.PROBLEM_SERVICE_URL;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // If backend is configured, proxy to it
  if (PROBLEM_SERVICE) {
    try {
      const res = await fetch(`${PROBLEM_SERVICE}/problems/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch {
      // Fall through to mock data
    }
  }

  // Mock mode
  const problem = mockProblems.find((p) => p.id === id);
  if (!problem) {
    return NextResponse.json(
      { success: false, message: "Problem not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: problem });
}
