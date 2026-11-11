"use client";

import { useEffect, useState } from "react";
import { getHistory, removeFromHistory, HistoryEntry } from "@/lib/localStorage";
import Link from "next/link";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEntries(getHistory());
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    removeFromHistory(id);
    setEntries(getHistory());
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-newsreader text-3xl font-semibold text-[#101828]">History</h1>
          <p className="text-sm text-[#5B6475] mt-1">Your recently generated blog posts.</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2F4BD0] text-sm font-semibold text-white hover:bg-[#2641BB] transition-colors focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2 min-h-[44px]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New blog
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF1FD] flex items-center justify-center mx-auto mb-4 text-2xl" aria-hidden="true">
            ◷
          </div>
          <p className="text-[#344054] font-medium mb-1">No blogs generated yet</p>
          <p className="text-sm text-[#5B6475]">
            <Link href="/" className="text-[#2F4BD0] hover:underline">Generate your first blog</Link> to see it here.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="bg-white border border-[#E3E6EC] rounded-2xl p-5 flex items-start gap-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#101828] leading-snug line-clamp-2">{entry.title}</p>
                <p className="text-xs text-[#5B6475] mt-1">{formatDate(entry.createdAt)}</p>
                <p className="text-sm text-[#344054] mt-2 line-clamp-2 leading-relaxed">
                  {entry.content.slice(0, 140).replace(/[#*`]/g, "")}…
                </p>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                aria-label={`Delete "${entry.title}" from history`}
                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[#5B6475] hover:bg-red-50 hover:text-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2 mt-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 3.5h10M5.5 3.5V2.5a1 1 0 011-1h1a1 1 0 011 1v1M11.5 3.5l-.7 8a1 1 0 01-1 .9H4.2a1 1 0 01-1-.9l-.7-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
