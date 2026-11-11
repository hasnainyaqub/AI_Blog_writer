"use client";

import { useState, useCallback } from "react";
import { BlogResponse } from "@/lib/api";

interface ResultToolbarProps {
  data: BlogResponse;
  onRegenerate: () => void;
}

export function ResultToolbar({ data, onRegenerate }: ResultToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(data.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts
      const el = document.createElement("textarea");
      el.value = data.content;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [data.content]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([data.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={handleCopy}
        aria-label="Copy markdown content"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054] hover:bg-[#F3F5F8] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2 min-h-[40px]"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7l3.5 3.5L12 3" stroke="#1A7F5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#1A7F5A]">Copied!</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 5V3.5A1.5 1.5 0 007.5 2H2.5A1.5 1.5 0 001 3.5v5A1.5 1.5 0 002.5 10H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Copy
          </>
        )}
      </button>

      <button
        onClick={handleDownload}
        aria-label="Download markdown file"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D0D5DD] bg-white text-sm font-medium text-[#344054] hover:bg-[#F3F5F8] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2 min-h-[40px]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 2v7m0 0l-2.5-2.5M7 9l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 11.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Download .md
      </button>

      <button
        onClick={onRegenerate}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2F4BD0] text-sm font-semibold text-white hover:bg-[#2641BB] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-4 min-h-[40px] shadow-sm"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M12 7A5 5 0 112 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 7V4m0 3H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Regenerate
      </button>
    </div>
  );
}
