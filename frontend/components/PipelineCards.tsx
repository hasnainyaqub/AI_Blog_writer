"use client";

const cards = [
  {
    step: "1 · INPUT",
    title: "Your title",
    desc: "Validated as a BlogRequest.",
    icon: "⌨",
    color: "text-[#5B6475]",
  },
  {
    step: "2 · OUTLINE",
    title: "Plan the structure",
    desc: "gpt-oss-120b",
    icon: "⊹",
    color: "text-[#2F4BD0]",
  },
  {
    step: "3 · CONTENT",
    title: "Write the article",
    desc: "gpt-oss-20b",
    icon: "✎",
    color: "text-[#1A7F5A]",
  },
];

export function PipelineCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white border border-[#E3E6EC] rounded-2xl p-5 flex flex-col gap-2 group hover:shadow-md hover:border-[#C4CAFE] transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <span className={`text-[10px] font-bold tracking-widest uppercase ${c.color}`}>
              {c.step}
            </span>
            <span className={`text-xl ${c.color} opacity-60 group-hover:opacity-100 transition-opacity`} aria-hidden="true">
              {c.icon}
            </span>
          </div>
          <p className="text-[15px] font-semibold text-[#101828]">{c.title}</p>
          <p className="text-xs text-[#5B6475] font-mono">{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
