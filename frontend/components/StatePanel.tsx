"use client";

import { BlogResponse } from "@/lib/api";

interface StatePanelProps {
  data: BlogResponse;
}

function truncateValue(val: string, max = 120): string {
  return val.length > max ? val.slice(0, max) + "…" : val;
}

export function StatePanel({ data }: StatePanelProps) {
  const truncated = {
    title: data.title,
    outline: truncateValue(data.outline),
    content: truncateValue(data.content),
  };

  return (
    <div className="bg-[#101828] rounded-xl overflow-hidden border border-[#1E2D40] flex flex-col">
      <div className="px-4 py-3 border-b border-[#1E2D40] flex items-center gap-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-xs text-[#5B6475] font-mono ml-auto">final state</span>
      </div>
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed font-mono text-[#D0D5DD] flex-1">
        {JSON.stringify(truncated, null, 2)}
      </pre>
      <p className="px-4 py-2 border-t border-[#1E2D40] text-[10px] text-[#5B6475] font-mono">
        Returned by <span className="text-[#8B9FE8]">workflow.invoke()</span>
      </p>
    </div>
  );
}
