"use client";

interface OutlineListProps {
  items: string[];
}

export function OutlineList({ items }: OutlineListProps) {
  return (
    <ol className="space-y-2.5" aria-label="Article outline">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EEF1FD] flex items-center justify-center text-[11px] font-bold text-[#2F4BD0]">
            {i + 1}
          </span>
          <span className="text-sm text-[#344054] leading-relaxed pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}
