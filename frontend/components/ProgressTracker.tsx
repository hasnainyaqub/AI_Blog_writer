"use client";

import { Stage } from "@/hooks/useBlogGeneration";

interface Step {
  label: string;
  sublabel: string;
}

const STEPS: Step[] = [
  { label: "Request received", sublabel: "title validated" },
  { label: "Outline ready", sublabel: "gpt-oss-120b" },
  { label: "Writing content", sublabel: "gpt-oss-20b" },
];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" stroke="#E3E6EC" strokeWidth="2.5" />
      <path
        d="M10 2a8 8 0 018 8"
        stroke="#2F4BD0"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface ProgressTrackerProps {
  stage: Stage;
}

export function ProgressTracker({ stage }: ProgressTrackerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Generation stage: ${STEPS[Math.min(stage - 1, 2)]?.label ?? "Starting"}`}
      className="flex flex-col gap-0"
    >
      {STEPS.map((step, i) => {
        const stepNum = (i + 1) as Stage;
        const isDone = stage > stepNum;
        const isActive = stage === stepNum;
        const isPending = stage < stepNum;

        return (
          <div key={i} className="flex gap-4">
            {/* Connector line + icon column */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isDone
                    ? "bg-[#1A7F5A]"
                    : isActive
                    ? "bg-white border-2 border-[#2F4BD0]"
                    : "bg-white border-2 border-[#E3E6EC]"
                }`}
              >
                {isDone ? (
                  <CheckIcon />
                ) : isActive ? (
                  <Spinner />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#D0D5DD]" />
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-0.5 h-12 mt-1 transition-colors duration-500 ${
                    isDone ? "bg-[#1A7F5A]" : "bg-[#E3E6EC]"
                  }`}
                />
              )}
            </div>

            {/* Text */}
            <div className="pb-10 pt-1">
              <p
                className={`text-sm font-semibold leading-tight transition-colors ${
                  isDone
                    ? "text-[#1A7F5A]"
                    : isActive
                    ? "text-[#101828]"
                    : "text-[#5B6475]"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-[#5B6475] font-mono mt-0.5">{step.sublabel}</p>
              {isActive && (
                <div className="mt-3 h-1.5 w-40 bg-[#EEF1FD] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2F4BD0] rounded-full animate-progress" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
