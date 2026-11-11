"use client";

const EXAMPLES = [
  "Multi-agent systems explained",
  "FastAPI for AI backends",
  "Getting started with LangGraph",
];

interface ExampleChipsProps {
  onSelect: (topic: string) => void;
}

export function ExampleChips({ onSelect }: ExampleChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Example topics">
      {EXAMPLES.map((topic) => (
        <button
          key={topic}
          type="button"
          onClick={() => onSelect(topic)}
          className="px-3.5 py-1.5 rounded-full border border-[#D0D5DD] text-sm text-[#344054] bg-white hover:bg-[#EEF1FD] hover:border-[#2F4BD0] hover:text-[#2F4BD0] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2 min-h-[36px]"
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
