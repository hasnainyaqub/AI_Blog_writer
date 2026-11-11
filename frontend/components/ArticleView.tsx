"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { slugify, parseArticleHeadings } from "@/lib/parseOutline";
import { OutlineNav } from "./OutlineNav";
import type { Components } from "react-markdown";

interface ArticleViewProps {
  content: string;
}

/** Recursively extract plain text from React children */
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (node == null || typeof node === "boolean") return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as React.ReactElement<{ children?: ReactNode }>).props.children);
  }
  return "";
}

export function ArticleView({ content }: ArticleViewProps) {
  const headings = parseArticleHeadings(content);
  const [activeHeading, setActiveHeading] = useState<string>(headings[0] ?? "");
  const articleRef = useRef<HTMLDivElement>(null);

  // Track scroll position and update active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const heading = headings.find((h) => slugify(h) === id);
            if (heading) setActiveHeading(heading);
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    const els = articleRef.current?.querySelectorAll("h2") ?? [];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content, headings]);

  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1 className="font-newsreader text-3xl font-semibold text-[#101828] mb-4 mt-8" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => {
      const text = extractText(children);
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="font-newsreader text-[26px] font-semibold text-[#101828] mb-3 mt-8 scroll-mt-6"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => (
      <h3 className="font-newsreader text-xl font-semibold text-[#101828] mb-2 mt-6" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-base text-[#344054] leading-[1.75] mb-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-outside ml-5 space-y-1.5 mb-4 text-[#344054] text-base" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-outside ml-5 space-y-1.5 mb-4 text-[#344054] text-base" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-[1.7]" {...props}>
        {children}
      </li>
    ),
    code: ({ children, className, ...props }) => {
      const isBlock = className?.includes("language-");
      if (isBlock) {
        return (
          <code
            className="block bg-[#101828] text-[#D0D5DD] p-4 rounded-xl text-sm font-mono overflow-x-auto"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className="bg-[#EEF1FD] text-[#2F4BD0] px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre className="mb-4" {...props}>
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-[#2F4BD0] pl-4 my-4 text-[#5B6475] italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2F4BD0] underline underline-offset-2 hover:text-[#2641BB]"
        {...props}
      >
        {children}
      </a>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-[#101828]" {...props}>
        {children}
      </strong>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm border border-[#E3E6EC] rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="bg-[#F3F5F8] text-left px-4 py-2 text-xs font-semibold text-[#101828] border-b border-[#E3E6EC]" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-2 text-[#344054] border-b border-[#E3E6EC]" {...props}>
        {children}
      </td>
    ),
    hr: (props) => <hr className="border-[#E3E6EC] my-8" {...props} />,
  };

  return (
    <div className="flex gap-6">
      {/* Outline nav — hidden on mobile, horizontal strip on tablet */}
      <aside className="hidden xl:block w-[220px] flex-shrink-0">
        <div className="sticky top-6">
          <OutlineNav headings={headings} activeHeading={activeHeading} />
        </div>
      </aside>

      {/* Article body */}
      <article
        ref={articleRef}
        className="flex-1 min-w-0 bg-white rounded-2xl border border-[#E3E6EC] px-8 py-10 lg:px-12"
        aria-label="Generated article"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
