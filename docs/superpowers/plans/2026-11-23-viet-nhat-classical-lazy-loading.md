# Classical Vietnam–Japan Lazy Loading & Opening Curtain Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a dignified, classical Vietnam–Japan opening curtain (`ClassicalCurtain`) and GPU-smooth code-split scroll lazy loading (`ClassicalSkeleton`, `LazyReveal`, `LazyHomeSections`) without hurting load speed or breaking existing tests.

**Architecture:** `ClassicalCurtain` renders an inline-SVG Lotus/Sakura/Hanko seal overlay once per session (`sessionStorage`) using pure GPU CSS keyframes and yields immediately via `pointer-events: none` on exit. Below-the-fold homepage sections are code-split via `next/dynamic` inside a Client Component (`LazyHomeSections`) with `ClassicalSkeleton` fallbacks and `IntersectionObserver`-driven `LazyReveal`.

**Tech Stack:** Next.js 16.3.3 (App Router, static export), React 19, TypeScript, Tailwind CSS v4, Playwright.

## Global Constraints

- Zero new npm packages.
- Only GPU-composited properties (`transform`, `opacity`, `stroke-dashoffset`) in animations; no `backdrop-filter` animation or JS canvas loops.
- `next/dynamic` code-splitting of Client Components MUST be placed in a `"use client"` file per `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`.
- Preserve `output: "export"` static prerendering and existing Playwright assertions.
- Support `prefers-reduced-motion: reduce`.

---

### Task 1: Add Playwright test specs for Classical Curtain & Lazy Scroll Reveal (Red Phase)

**Files:**
- Modify: `tests/viet-nhat.spec.ts`

- [ ] **Step 1: Add tests for `ClassicalCurtain` (appears on fresh visit, skips cleanly, persists in `sessionStorage` on reload) and `LazyReveal` scroll sections**
- [ ] **Step 2: Run `npx playwright test` to confirm the new test fails before implementation**

### Task 2: Add GPU-only Classical Keyframes to `src/app/globals.css`

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add `curtain-draw`, `hanko-stamp`, `curtain-progress`, `classical-shimmer`, and `.lazy-reveal` utility classes**

### Task 3: Create `ClassicalSkeleton`, `LazyReveal`, and `ClassicalCurtain` UI Components

**Files:**
- Create: `src/components/ui/ClassicalSkeleton.tsx`
- Create: `src/components/ui/LazyReveal.tsx`
- Create: `src/components/ui/ClassicalCurtain.tsx`

- [ ] **Step 1: Implement `ClassicalSkeleton` with Washi/Gold frame and GPU `translateX` shimmer**
- [ ] **Step 2: Implement `LazyReveal` with `IntersectionObserver` (`rootMargin: "150px 0px"`, `once: true`) and reduced-motion support**
- [ ] **Step 3: Implement `ClassicalCurtain` with inline Lotus & Sakura/Seigaiha SVGs, vermilion Hanko seal (`日越`), trilingual caption, skip button, and `sessionStorage` persistence**

### Task 4: Wire `ClassicalCurtain` in `RootLayout` and `LazyHomeSections` in `Home`

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/home/LazyHomeSections.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Mount `<ClassicalCurtain />` inside `<LanguageProvider>` in `src/app/layout.tsx`**
- [ ] **Step 2: Create `src/components/home/LazyHomeSections.tsx` using `next/dynamic` + `ClassicalSkeleton` + `LazyReveal`**
- [ ] **Step 3: Update `src/app/page.tsx` to render `<HeroSection />` + `<LazyHomeSections />`**

### Task 5: Verify Build, Lint, Playwright Tests, Preview Server & Write Session Documentation

**Files:**
- Create: `docs/README.md`
- Create: `docs/sessions/2026-11-23-session-01-classical-lazy-loading.md`

- [ ] **Step 1: Run `npx eslint` on changed files & `pnpm build`**
- [ ] **Step 2: Run `npx playwright test` to confirm all new curtain & lazy-loading tests pass (and observe existing test 5 status)**
- [ ] **Step 3: Restart local static server on `http://localhost:3000` serving updated `out/`**
- [ ] **Step 4: Write `docs/README.md` and `docs/sessions/2026-11-23-session-01-classical-lazy-loading.md` documenting all changes and verification results**
