// Typed API client for AI Blog Writer backend
// Actual endpoint: POST /api/ai-blog-writer
// Response:  { title, results: { title, outline, content } }

export interface BlogResponse {
  title: string;
  outline: string;
  content: string;
}

interface RawApiResponse {
  title: string;
  results: {
    title: string;
    outline: string;
    content: string;
  };
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function generateBlog(title: string): Promise<BlogResponse> {
  const res = await fetch(`${API_URL}/api/ai-blog-writer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    let detail = `Server error ${res.status}`;
    try {
      const err = await res.json();
      if (err?.detail) detail = err.detail;
    } catch {
      // ignore parse error
    }
    throw new Error(detail);
  }

  const raw: RawApiResponse = await res.json();
  return {
    title: raw.title,
    outline: raw.results.outline,
    content: raw.results.content,
  };
}
