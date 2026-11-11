"use client";

import { slugify } from "@/lib/parseOutline";

interface OutlineNavProps {
  headings: string[];
  activeHeading: string;
}

export function OutlineNav({ headings, activeHeading }: OutlineNavProps) {
  const scrollTo = (heading: string) => {
    const id = slugify(heading);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Article sections" className="flex flex-col gap-0.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#5B6475] px-3 mb-2">
        OUTLINE
      </p>
      {headings.map((heading, i) => {
        const isActive = activeHeading === heading;
        return (
          <button
            key={i}
            onClick={() => scrollTo(heading)}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs leading-snug transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2 min-h-[36px] ${
              isActive
                ? "bg-[#EEF1FD] text-[#2F4BD0] font-semibold"
                : "text-[#344054] hover:bg-[#F3F5F8] font-medium"
            }`}
          >
            {heading}
          </button>
        );
      })}
    </nav>
  );
}
