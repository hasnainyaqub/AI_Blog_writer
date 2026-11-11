# AI Blog Writer — Frontend

A Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 frontend for the AI Blog Writer LangGraph agent.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Fonts | Newsreader (headings) · Inter (UI) via `next/font` |
| Markdown | react-markdown |
| State | React hooks (no external state library) |
| Storage | localStorage (blog history) |

## Project structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with Sidebar + font injection
│   ├── globals.css         # Design tokens, animations (Tailwind v4 @theme)
│   ├── page.tsx            # Home: idle → loading → success flow
│   ├── history/page.tsx    # localStorage blog history
│   ├── templates/page.tsx  # Templates placeholder
│   └── settings/page.tsx   # Settings info page
├── components/
│   ├── Sidebar.tsx         # 240px fixed sidebar + mobile top bar
│   ├── TopicForm.tsx       # Input + GenerateBlog button + char limit
│   ├── ExampleChips.tsx    # Click-to-fill example topic pills
│   ├── PipelineCards.tsx   # "How it works" 3-card row
│   ├── ProgressTracker.tsx # Step tracker (check / spinner / pending)
│   ├── OutlineList.tsx     # Numbered outline items
│   ├── SkeletonDraft.tsx   # Pulsing skeleton bars (heading + paragraphs)
│   ├── ArticleView.tsx     # react-markdown renderer + IntersectionObserver nav
│   ├── OutlineNav.tsx      # Left-column section nav (scroll + highlight)
│   ├── StatePanel.tsx      # Dark code block showing final workflow state
│   ├── ResultToolbar.tsx   # Copy / Download .md / Regenerate buttons
│   └── Tabs.tsx            # Accessible tab bar (Blog / Outline / State JSON)
├── hooks/
│   └── useBlogGeneration.ts  # Core hook: API call + simulated stage progress
└── lib/
    ├── api.ts              # Typed fetch client for /api/ai-blog-writer
    ├── localStorage.ts     # History save / load / delete helpers
    └── parseOutline.ts     # Outline string → list items; article headings
```

## Running locally

### 1. Prerequisites
- Node.js 18+ and npm
- The FastAPI backend running on port 8000

### 2. Install dependencies
```bash
cd frontend
npm install
```

### 3. Configure environment
```bash
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 4. Start the dev server
```bash
npm run dev
# → http://localhost:3000
```

---

## Backend CORS

`main.py` has been updated with CORS middleware allowing `localhost:3000`.  
For production, replace the `allow_origins` list with your deployed frontend URL.

## Backend API contract

**Endpoint:** `POST /api/ai-blog-writer`

**Request:**
```json
{ "title": "Your blog topic" }
```

**Response:**
```json
{
  "title": "Your blog topic",
  "results": {
    "title": "Your blog topic",
    "outline": "## Introduction\n- Point one…",
    "content": "# Your blog topic\n\nFull article in markdown…"
  }
}
```

The API client in `lib/api.ts` flattens `results` into a typed `BlogResponse`.

## Replacing simulated stages with real streaming

The `useBlogGeneration` hook simulates stage progress via timeouts.
To upgrade to real streaming:

1. Modify the FastAPI endpoint to emit SSE events at each workflow stage
2. Replace the `setTimeout` calls in `hooks/useBlogGeneration.ts` with SSE stage markers
3. The rest of the UI (ProgressTracker, OutlineList, SkeletonDraft) needs no changes
