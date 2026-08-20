# Code Review: Architectural & Visual Redesign, AI Streaming, & Cleanup

**Date:** 2026-08-20  
**Repository:** `igmrrf/igmrrf`  
**Branch:** `main`

---

## 1. Summary of Changes

This pull request / commit encompasses a major refactor and enhancement across multiple areas of the portfolio and interactive applications:

### 1.1 UI & Aesthetics
- **Wallpaper Engine**: Added dynamic anime wallpaper background system (`WallpaperProvider`, `WallpaperSelector`) with user-customizable opacity and 8 high-resolution Akane wallpapers.
- **Architectural Polish**: Replaced heavy/legacy 3D components (`Hero3DIcon`, `HologramCard`, `MagneticButton`, `WordSphereView`) with clean, fast, and accessible components (`ArchitecturalCard`, `StackMatrixView`, updated `RadialMindMapView` and `NodeGraphView`).
- **Typography & Layout**: Standardized layout padding, navigation bar with wallpaper picker integration, responsive mobile drawer, and consistent breadcrumbs across case studies and blog posts.
- **Reading Progress & Code Blocks**: Added `ReadingProgressBar` and enhanced `CodeBlock` component with copy-to-clipboard functionality and syntax highlighting.

### 1.2 Comments & Interactivity
- **Giscus Integration**: Migrated comment system from Supabase to GitHub Discussions via `@giscus/react` (`GiscusComments.tsx`).
- **Removed Supabase**: Deprecated `SUPABASE_SETUP.md`, `src/lib/supabase.ts`, and old blog comment/like API routes.

### 1.3 AI Chat Architecture
- **Multi-provider Streaming**: Added native streaming support (`ReadableStream`) across Gemini, Groq, and OpenAI with a unified SSE parser (`createSSEToTextStream`).
- **Provider Support**: Added Groq provider (`src/lib/ai/providers/groq.ts`) with `llama-3.3-70b-versatile` default.
- **Interactive UI**: Enhanced `ChatInterface` with live stream chunk accumulation, auto-scroll, prompt suggestions, markdown formatting, and error resilience.

### 1.4 SEO & Metadata
- **Sitemap & Robots**: Added dynamic `robots.ts` and refreshed `sitemap.ts` with all dynamic case studies and blog routes.
- **Metadata**: Enhanced OpenGraph and Twitter card metadata for `/about`, `/experience`, `/case-studies`, and `/blog`.

---

## 2. Code Quality & Conventions Review

| Check | Status | Notes |
|---|---|---|
| **ESLint** | Passed | 0 warnings / 0 errors (`npm run lint`). |
| **TypeScript Build** | Passed | Clean static build with Next.js 16 (`npm run build`). |
| **Loops Convention** | Verified | All iterations without returns use `for...of`; `.map` is strictly reserved for data transformation. |
| **Custom Hooks** | Compliant | `useIsMounted` consolidated to `@/hooks/useIsMounted.ts` using `useSyncExternalStore`. |
| **Security & Hygiene** | Passed | No hardcoded secrets or API tokens. Duplicate assets removed. |

---

## 3. Detailed File Breakdown

- **`src/app/`**:
  - `layout.tsx`: Configured font variables, `WallpaperProvider`, and updated metadata.
  - `robots.ts` & `sitemap.ts`: Automated crawl directives and indexing for all routes.
  - `api/chat/route.ts`: Streaming SSE endpoint supporting Groq/Gemini/OpenAI with retrieval-augmented context.
  - `blog/[slug]/page.tsx` & `case-studies/[slug]/page.tsx`: Modernized detail pages with reading time estimates, responsive headers, and Giscus comments.
- **`src/components/`**:
  - `theme/WallpaperProvider.tsx` & `WallpaperSelector.tsx`: Persistent client-side wallpaper engine with localStorage cache and fallback handling.
  - `blog/GiscusComments.tsx`: Clean client-side GitHub discussion widget with theme reactivity.
  - `blog/CodeBlock.tsx`: MDX code block with clipboard copy and language badges.
  - `views/StackMatrixView.tsx`: Modern grid-based tech stack inspection view.
  - `chat/ChatInterface.tsx`: Streaming chat UI with typing state and markdown rendering.
- **`src/lib/`**:
  - `ai/factory.ts`, `ai/streamUtils.ts`, `ai/providers/*`: Robust streaming pipeline with standardized SSE chunk transformation.
  - `readingTime.ts`: Reading speed calculation for articles.
