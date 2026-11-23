# Google Sheet Headless CMS & Project Synthesis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect every content section and form of `Web_Viet_Nhat` to a unified 6-tab Google Sheet CMS (`apps-script/Code.gs`) with trilingual smart fallback, static-export-safe detail routes, `/healthz` Nginx support, clean ESLint, and Playwright verification.

**Architecture:** `apps-script/Code.gs` exposes `?action=all` (60s `CacheService`) and `doPost` for both admissions and contact forms. Frontend `SiteDataProvider` renders static defaults immediately (`0ms`), fetches `?action=all` in background with `sessionStorage` caching, and routes newly added Sheet slugs through `/news/detail/?slug=...` and `/programs/detail/?slug=...`.

**Tech Stack:** Next.js 16.3.3 (App Router, `output: "export"`), React 19, TypeScript 5, Tailwind CSS v4, Google Apps Script, Nginx, Playwright.

## Global Constraints

- Zero new npm dependencies.
- `pnpm lint` must pass with 0 errors and 0 warnings across the entire repo.
- `pnpm build` must succeed with `output: "export"` and wrap `useSearchParams()` inside `<Suspense>`.
- Preserve static fallback stability when `NEXT_PUBLIC_APPS_SCRIPT_URL` is offline/unset.

---

### Task 1: Add Playwright tests for Sheet CMS live sync & `/news/detail/?slug=...` + deterministic form test (Red Phase)

**Files:**
- Modify: `tests/viet-nhat.spec.ts`

- [ ] **Step 1:** Update Test 5 in `tests/viet-nhat.spec.ts` to intercept `script.google.com` POST deterministically; add Test 8 testing mocked `?action=all` live content sync (new news article + custom config text) and navigating to `/news/detail/?slug=...`.
- [ ] **Step 2:** Run `npx playwright test -g "Google Sheet CMS"` to verify Test 8 fails before implementation.

### Task 2: Upgrade `apps-script/Code.gs`, `apps-script/HUONG_DAN_CAI_DAT.md`, and `nginx.conf`

**Files:**
- Modify: `apps-script/Code.gs`
- Modify: `apps-script/HUONG_DAN_CAI_DAT.md`
- Modify: `nginx.conf`

- [ ] **Step 1:** Rewrite `apps-script/Code.gs` with 6 tabs (`CauHinh_TrangWeb`, `ChuongTrinh_TraoDoi`, `TinTuc_HocThuat`, `DoiNgu_GiangVien`, `Don_Dang_Ky`, `Lien_He`), `onOpen()` admin menu, `CacheService`, `?action=all`, and `doPost` for both `application` & `contact`.
- [ ] **Step 2:** Update `apps-script/HUONG_DAN_CAI_DAT.md` for project `1Vw03BfXfgtozhiYZbvryJj-DvwAttxm53UQ4UN2titecCo7-il1bGjWG`.
- [ ] **Step 3:** Add `/healthz` endpoint to `nginx.conf`.

### Task 3: Upgrade Data Models, `appsScriptApi.ts`, and `SiteDataProvider`

**Files:**
- Modify: `src/data/programs.ts`
- Modify: `src/data/news.ts`
- Modify: `src/lib/appsScriptApi.ts`
- Create: `src/components/providers/SiteDataProvider.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1:** Extend `Program` (`overview*`, `requirement*`) and `NewsArticle` (`contentEn`, `contentJa`) defaults cleanly.
- [ ] **Step 2:** Implement strict TypeScript interfaces, `fetchAllSiteData`, `submitContact`, `slugifyVietnamese`, and timeout handling in `src/lib/appsScriptApi.ts` (zero `any`).
- [ ] **Step 3:** Implement `SiteDataProvider` and wire into `src/app/layout.tsx`; clean unused imports/vars in `Header.tsx`.

### Task 4: Wire All Pages & Components to `SiteDataProvider` + Add Query Detail Fallback Pages

**Files:**
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/StatsCounter.tsx`
- Modify: `src/components/home/LatestNews.tsx`
- Modify: `src/components/home/CTABanner.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/faculty/page.tsx`
- Modify: `src/app/programs/page.tsx`
- Modify: `src/app/programs/[slug]/ProgramDetailClient.tsx`
- Create: `src/app/programs/detail/page.tsx`
- Modify: `src/app/news/page.tsx`
- Modify: `src/app/news/[slug]/NewsDetailClient.tsx`
- Create: `src/app/news/detail/page.tsx`
- Modify: `src/app/admissions/page.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1:** Update home & layout components to read config/news/program/stats from `useSiteData()`.
- [ ] **Step 2:** Update `/about`, `/faculty`, `/programs`, `/news`, `/admissions`, `/contact` and detail clients to read live Sheet data and support dynamic `detail?slug=...` fallback routes.

### Task 5: Full Verification, Preview Server & Project/Session Documentation

**Files:**
- Create: `docs/PROJECT_DOCUMENTATION.md`
- Create: `docs/sessions/2026-11-23-session-02-google-sheet-cms.md`
- Modify: `docs/README.md`

- [ ] **Step 1:** Run `pnpm lint` (expect 0 errors, 0 warnings) and `pnpm build` (expect exit code 0).
- [ ] **Step 2:** Run `npx playwright test` (expect all 8 tests passing).
- [ ] **Step 3:** Restart `npx --yes serve out -l 3000` preview server.
- [ ] **Step 4:** Write `docs/PROJECT_DOCUMENTATION.md`, `docs/sessions/2026-11-23-session-02-google-sheet-cms.md`, and update `docs/README.md`.
