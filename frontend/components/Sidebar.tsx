"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "New blog", icon: "✦" },
  { href: "/history", label: "History", icon: "◷" },
  { href: "/templates", label: "Templates", icon: "⊞" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top bar (< 1024px) ── */}
      <header className="lg:hidden flex items-center justify-between px-5 h-14 bg-white border-b border-[#E3E6EC] fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#2F4BD0] flex items-center justify-center text-white text-sm font-bold select-none">
            ✎
          </span>
          <span className="text-[15px] font-bold text-[#101828]">AI Blog Writer</span>
        </div>
        <button
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#EEF1FD] text-[#344054] transition-colors focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <nav className="lg:hidden fixed top-14 left-0 right-0 bg-white border-b border-[#E3E6EC] z-30 px-4 py-3 flex flex-col gap-1 shadow-lg">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                    ? "bg-[#EEF1FD] text-[#2F4BD0] font-semibold"
                    : "text-[#344054] hover:bg-gray-50"
                  }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}

      {/* ── Desktop sidebar (≥ 1024px) ── */}
      <aside className="hidden lg:flex flex-col w-[240px] min-h-screen bg-white border-r border-[#E3E6EC] fixed top-0 left-0 bottom-0 z-30">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-[#E3E6EC]">
          <span className="w-8 h-8 rounded-lg bg-[#2F4BD0] flex items-center justify-center text-white text-sm font-bold select-none flex-shrink-0">
            ✎
          </span>
          <span className="text-[15px] font-bold text-[#101828]">AI Blog Writer</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 flex-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#2F4BD0] focus-visible:outline-offset-2 ${active
                    ? "bg-[#EEF1FD] text-[#2F4BD0] font-semibold"
                    : "text-[#344054] font-medium hover:bg-gray-50 hover:text-[#101828]"
                  }`}
              >
                <span aria-hidden="true" className="text-base w-5 text-center">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom card */}
        <div className="p-3">
          <div className="rounded-xl border border-[#E3E6EC] bg-[#F3F5F8] px-4 py-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1A7F5A] animate-pulse" aria-hidden="true" />
              <span className="text-[11px] font-semibold text-[#344054] uppercase tracking-wider">
                LangGraph workflow
              </span>
            </div>
            <p className="text-xs text-[#5B6475] leading-relaxed">
              2 nodes on Groq.{" "}
              <span className="text-[#344054] font-medium">Outline</span> then{" "}
              <span className="text-[#344054] font-medium">content</span>.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
