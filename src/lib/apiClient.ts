const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const apiClient = {
  get: (path: string, init?: RequestInit) =>
    fetch(`${BASE_URL}${path}`, { credentials: "include", ...init }).then(
      (r) => r.json()
    ),

  post: (path: string, body: unknown, init?: RequestInit) =>
    fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
      ...init,
    }).then((r) => r.json()),
};
