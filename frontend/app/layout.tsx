import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Blog Writer — Agentic Blog Generation",
  description:
    "Turn any topic into a full, publication-ready blog post in seconds. Powered by LangGraph + Groq.",
  keywords: ["AI writing", "blog generator", "LangGraph", "Groq", "LLM"],
  openGraph: {
    title: "AI Blog Writer",
    description: "Agentic blog generation with LangGraph + Groq",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F3F5F8] font-sans">
        <Sidebar />
        {/* Offset for sidebar / mobile topbar */}
        <main className="lg:pl-[240px] pt-14 lg:pt-0 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
