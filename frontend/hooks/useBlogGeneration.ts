"use client";

import { useState, useCallback, useRef } from "react";
import { generateBlog, BlogResponse } from "@/lib/api";
import { saveToHistory } from "@/lib/localStorage";

export type Stage = 0 | 1 | 2 | 3; // 0=idle, 1=request, 2=outline, 3=content

export type BlogState =
  | { status: "idle" }
  | { status: "loading"; stage: Stage }
  | { status: "success"; data: BlogResponse }
  | { status: "error"; message: string; title: string };

/**
 * useBlogGeneration
 *
 * Wraps the backend call + simulated stage progress.
 * Because the backend is not streaming, we simulate:
 *   - Stage 1 (Request received) immediately
 *   - Stage 2 (Outline) after a short delay
 *   - Stage 3 (Content writing) after another short delay
 *   - Success when the real API call resolves
 *
 * To support real streaming later, replace the simulation timers
 * with a streaming fetch and update stages from SSE/chunks.
 */
export function useBlogGeneration() {
  const [state, setState] = useState<BlogState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(async (title: string) => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ status: "loading", stage: 1 });

    // Simulate stage 2 starting after 600ms
    const t2 = setTimeout(() => {
      if (!controller.signal.aborted)
        setState({ status: "loading", stage: 2 });
    }, 600);

    // Simulate stage 3 starting after 3s
    const t3 = setTimeout(() => {
      if (!controller.signal.aborted)
        setState({ status: "loading", stage: 3 });
    }, 3000);

    try {
      const data = await generateBlog(title);

      clearTimeout(t2);
      clearTimeout(t3);

      if (controller.signal.aborted) return;

      saveToHistory(data);
      setState({ status: "success", data });
    } catch (err: unknown) {
      clearTimeout(t2);
      clearTimeout(t3);

      if (controller.signal.aborted) return;

      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setState({ status: "error", message, title });
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({ status: "idle" });
  }, []);

  return { state, generate, reset };
}
