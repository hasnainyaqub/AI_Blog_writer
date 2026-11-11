"use client";

import { useBlogGeneration } from "@/hooks/useBlogGeneration";
import { TopicForm } from "@/components/TopicForm";
import { PipelineCards } from "@/components/PipelineCards";
import { ProgressTracker } from "@/components/ProgressTracker";
import { OutlineList } from "@/components/OutlineList";
import { SkeletonDraft } from "@/components/SkeletonDraft";
import { ArticleView } from "@/components/ArticleView";
import { ResultToolbar } from "@/components/ResultToolbar";
import { Tabs } from "@/components/Tabs";
import { StatePanel } from "@/components/StatePanel";
import { parseOutlineItems } from "@/lib/parseOutline";
import { useState } from "react";

const RESULT_TABS = [
  { id: "blog", label: "Blog" },
  { id: "outline", label: "Outline" },
  { id: "json", label: "State JSON" },
];

export default function Home() {
  const { state, generate, reset } = useBlogGeneration();
  const [activeTab, setActiveTab] = useState("blog");

  if (state.status === "idle" || state.status === "error") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF1FD] border border-[#C4CAFE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F4BD0] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#2F4BD0] tracking-wide">Agentic workflow</span>
          </span>
        </div>

        <h1 className="font-newsreader text-[52px] font-semibold text-[#101828] text-center leading-[1.1] mb-5">
          Turn a topic into a<br />finished blog.
        </h1>
        <p className="text-[17px] text-[#5B6475] text-center mb-12 leading-relaxed max-w-xl mx-auto">
          Give the agent a title. It drafts a structured outline first, then writes the full article from it.
        </p>

        {state.status === "error" && (
          <div role="alert" className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="#E53E3E" strokeWidth="1.5" />
              <path d="M9 5.5v4M9 12h.01" stroke="#E53E3E" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-700">Generation failed</p>
              <p className="text-sm text-red-600 mt-0.5">{state.message}</p>
              <button onClick={reset} className="mt-2 text-sm text-[#2F4BD0] font-medium hover:underline focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2">
                Try again
              </button>
            </div>
          </div>
        )}

        <TopicForm
          onSubmit={generate}
          defaultValue={state.status === "error" ? state.title : ""}
        />

        <div className="mt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5B6475] text-center mb-5">How it works</p>
          <PipelineCards />
        </div>
      </div>
    );
  }

  if (state.status === "loading") {
    const { stage } = state;
    const outlineReady = stage >= 3;
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6475] uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F4BD0] animate-pulse" aria-hidden="true" />
            Generating
          </span>
          <h2 className="font-newsreader text-4xl font-semibold text-[#101828] leading-tight">Building your article…</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <ProgressTracker stage={stage} />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white border border-[#E3E6EC] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A7F5A]">Outline</span>
                {!outlineReady && <span className="text-xs text-[#5B6475]">— waiting for outline node…</span>}
              </div>
              {outlineReady ? (
                <p className="text-sm text-[#5B6475] italic">Outline received — writing content…</p>
              ) : (
                <div className="space-y-2.5 animate-pulse">
                  {[60, 80, 50, 70].map((w, i) => (
                    <div key={i} className="h-3 bg-[#E3E6EC] rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-[#E3E6EC] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F4BD0]">Draft</span>
                <span className="text-xs text-[#5B6475]">— composing…</span>
              </div>
              <SkeletonDraft />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { data } = state;
  const outlineItems = parseOutlineItems(data.outline);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <h1 className="font-newsreader text-[30px] font-semibold text-[#101828] leading-tight max-w-2xl">
          {data.title}
        </h1>
        <ResultToolbar data={data} onRegenerate={() => { reset(); generate(data.title); }} />
      </div>

      <Tabs tabs={RESULT_TABS} active={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "blog" && (
          <div id="tabpanel-blog" role="tabpanel" aria-labelledby="tab-blog">
            <div className="flex flex-col 2xl:flex-row gap-6">
              <div className="flex-1 min-w-0">
                <ArticleView content={data.content} />
              </div>
              <aside className="hidden 2xl:block w-[250px] flex-shrink-0">
                <div className="sticky top-6">
                  <StatePanel data={data} />
                </div>
              </aside>
            </div>
          </div>
        )}

        {activeTab === "outline" && (
          <div id="tabpanel-outline" role="tabpanel" aria-labelledby="tab-outline">
            <div className="bg-white border border-[#E3E6EC] rounded-2xl p-8 max-w-2xl">
              <h2 className="font-newsreader text-2xl font-semibold text-[#101828] mb-6">Article Outline</h2>
              <OutlineList items={outlineItems} />
            </div>
          </div>
        )}

        {activeTab === "json" && (
          <div id="tabpanel-json" role="tabpanel" aria-labelledby="tab-json">
            <div className="max-w-3xl">
              <p className="text-sm text-[#5B6475] mb-4">
                Full state returned by <code className="text-[#2F4BD0] font-mono text-sm">workflow.invoke()</code>
              </p>
              <div className="bg-[#101828] rounded-xl overflow-hidden border border-[#1E2D40]">
                <pre className="p-6 overflow-x-auto text-sm leading-relaxed font-mono text-[#D0D5DD]">
                  {JSON.stringify({ title: data.title, outline: data.outline, content: data.content }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
