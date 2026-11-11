import { BlogResponse } from "./api";

export interface HistoryEntry extends BlogResponse {
  id: string;
  createdAt: string;
}

const KEY = "ai_blog_history";
const MAX_ITEMS = 20;

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(blog: BlogResponse): HistoryEntry {
  const entry: HistoryEntry = {
    ...blog,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const prev = getHistory();
  const next = [entry, ...prev].slice(0, MAX_ITEMS);
  localStorage.setItem(KEY, JSON.stringify(next));
  return entry;
}

export function removeFromHistory(id: string): void {
  const next = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
}
