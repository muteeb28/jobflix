import { NextResponse } from "next/server";
import { mockProblems } from "./mock";

const PROBLEM_SERVICE = process.env.PROBLEM_SERVICE_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get("difficulty");

  // If backend is configured, proxy to it
  if (PROBLEM_SERVICE) {
    try {
      const url = difficulty
        ? `${PROBLEM_SERVICE}/problems/difficulty/${difficulty}`
        : `${PROBLEM_SERVICE}/problems`;

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch {
      // Fall through to mock data
    }
  }

  // Mock mode: return local data
  const filtered = difficulty
    ? mockProblems.filter((p) => p.difficulty === difficulty)
    : mockProblems;

  return NextResponse.json({ success: true, data: filtered });
}
