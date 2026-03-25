// In-memory store for mock submissions (dev only)
export const mockSubmissions = new Map<
  string,
  { results: unknown[]; createdAt: number }
>();
