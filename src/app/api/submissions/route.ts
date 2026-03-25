import { NextResponse } from "next/server";
import { mockProblems } from "../problems/mock";
import { mockSubmissions } from "./mock-store";

const SUBMISSION_SERVICE = process.env.SUBMISSION_SERVICE_URL;

export async function POST(request: Request) {
  const body = await request.json();

  // If backend is configured, proxy to it
  if (SUBMISSION_SERVICE) {
    try {
      const res = await fetch(`${SUBMISSION_SERVICE}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch {
      // Fall through to mock mode
    }
  }

  // Mock mode: simulate submission
  const { problemId } = body;
  const problem = mockProblems.find((p) => p.id === problemId);

  if (!problem) {
    return NextResponse.json(
      { success: false, message: "Problem not found" },
      { status: 404 }
    );
  }

  const submissionId = `mock-sub-${Date.now()}`;
  const statuses = ["AC", "WA", "AC", "AC", "TLE", "AC"] as const;

  const results = problem.testcases.map((tc, i) => ({
    testcase: i + 1,
    input: tc.input,
    expected: tc.output,
    output: statuses[i % statuses.length] === "AC" ? tc.output : "wrong",
    status: statuses[i % statuses.length],
  }));

  mockSubmissions.set(submissionId, {
    results,
    createdAt: Date.now(),
  });

  return NextResponse.json({
    success: true,
    data: { id: submissionId, status: "pending" },
  });
}
