"use client";

/** Skeleton loading bars that mimic blog article structure */
export function SkeletonDraft() {
  return (
    <div className="space-y-4 animate-pulse" aria-label="Draft being written" aria-busy="true">
      {/* Fake H2 */}
      <div className="h-6 bg-[#E3E6EC] rounded-lg w-3/5" />
      {/* Paragraphs */}
      <div className="space-y-2.5">
        <div className="h-3.5 bg-[#E3E6EC] rounded w-full" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[95%]" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[88%]" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[92%]" />
      </div>

      {/* Fake H2 */}
      <div className="h-6 bg-[#E3E6EC] rounded-lg w-2/5 mt-6" />
      <div className="space-y-2.5">
        <div className="h-3.5 bg-[#E3E6EC] rounded w-full" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[90%]" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[97%]" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[82%]" />
      </div>

      {/* Fake H2 */}
      <div className="h-6 bg-[#E3E6EC] rounded-lg w-1/2 mt-6" />
      <div className="space-y-2.5">
        <div className="h-3.5 bg-[#E3E6EC] rounded w-full" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[85%]" />
        <div className="h-3.5 bg-[#E3E6EC] rounded w-[91%]" />
      </div>
    </div>
  );
}
