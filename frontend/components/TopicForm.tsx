"use client";

import { useState, useRef } from "react";
import { ExampleChips } from "./ExampleChips";

const MAX_LENGTH = 200;

interface TopicFormProps {
  onSubmit: (title: string) => void;
  disabled?: boolean;
  defaultValue?: string;
}

export function TopicForm({ onSubmit, disabled, defaultValue = "" }: TopicFormProps) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="bg-white border border-[#E3E6EC] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
        {/* Input row */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="blog-topic"
            className="text-sm font-semibold text-[#101828]"
          >
            Blog topic
          </label>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              ref={inputRef}
              id="blog-topic"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={MAX_LENGTH}
              placeholder="How RAG pipelines are changing enterprise search"
              disabled={disabled}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 h-14 px-4 rounded-xl border border-[#D0D5DD] text-base text-[#101828] placeholder:text-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#2F4BD0] focus:border-[#2F4BD0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            />
            <button
              type="submit"
              disabled={!value.trim() || disabled}
              className="h-14 px-8 rounded-xl bg-[#2F4BD0] text-white text-base font-semibold hover:bg-[#2641BB] active:bg-[#1E339A] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-4 shadow-sm whitespace-nowrap sm:w-auto w-full"
            >
              {disabled ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Generating…
                </span>
              ) : (
                "Generate blog"
              )}
            </button>
          </div>
          {value.length > MAX_LENGTH * 0.8 && (
            <p className="text-xs text-[#5B6475] text-right">
              {value.length}/{MAX_LENGTH}
            </p>
          )}
        </div>

        {/* Example chips */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#5B6475] font-medium">Try an example:</p>
          <ExampleChips
            onSelect={(topic) => {
              setValue(topic);
              inputRef.current?.focus();
            }}
          />
        </div>
      </div>
    </form>
  );
}
