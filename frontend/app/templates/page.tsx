export default function TemplatesPage() {
  const templates = [
    { title: "How-To Guide", desc: "Step-by-step instructional post for technical topics.", icon: "⚙" },
    { title: "Opinion Piece", desc: "Thought leadership with a clear argument and supporting evidence.", icon: "💡" },
    { title: "Listicle", desc: "Numbered breakdown of key concepts or tools.", icon: "⊞" },
    { title: "Case Study", desc: "Deep-dive into a real-world implementation or outcome.", icon: "◎" },
    { title: "Explainer", desc: "Beginner-friendly breakdown of a complex topic.", icon: "⊕" },
    { title: "Comparison", desc: "Side-by-side analysis of two or more tools or approaches.", icon: "⇆" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-newsreader text-3xl font-semibold text-[#101828]">Templates</h1>
        <p className="text-sm text-[#5B6475] mt-1">Coming soon — guided blog formats to shape your article.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t, i) => (
          <div
            key={i}
            className="bg-white border border-[#E3E6EC] rounded-2xl p-5 opacity-60 cursor-not-allowed flex flex-col gap-2"
            aria-disabled="true"
          >
            <span className="text-2xl" aria-hidden="true">{t.icon}</span>
            <p className="font-semibold text-[#101828]">{t.title}</p>
            <p className="text-sm text-[#5B6475] leading-relaxed">{t.desc}</p>
            <span className="mt-auto text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Coming soon</span>
          </div>
        ))}
      </div>
    </div>
  );
}
