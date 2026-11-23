# Design Spec: Classical Vietnam–Japan Lazy Loading & Opening Curtain

**Date:** 2026-11-23  
**Project:** Web_Viet_Nhat (Trung Tâm Hợp Tác Học Thuật Việt - Nhật — HCMCOU)  
**Status:** Approved by user  

---

## 1. Goals & Constraints

- **Visual Theme:** Classical, solemn, and dignified Vietnam–Japan academic aesthetic combining **Lotus (Hoa Sen)** and **Cherry Blossom (Sakura / Seigaiha)** line-art SVGs with a **vermilion Hanko seal (`日越`)** on a warm Washi ivory (`#fcfaf5`) and deep Royal Navy (`#1e2a5e`) + Gold (`#ca8a04` / `#eab308`) palette matching the existing site theme.
- **Performance ("Smooth & Lag-Free"):**
  - Zero new npm dependencies.
  - Pure GPU-composited animations only (`transform`, `opacity`, `stroke-dashoffset`); no `backdrop-filter` blur animations, no canvas/JS particle loops, no layout-thrashing properties.
  - Full `prefers-reduced-motion: reduce` support.
  - Preserves Next.js `output: "export"` static HTML prerendering (SEO & Playwright DOM visibility intact).
- **Frequency & Non-Blocking UX:**
  - Opening curtain runs **once per browser session** (`sessionStorage` key `vnj_curtain_seen`), lasts **~1.1s + 0.45s exit**, and includes an accessible **Skip / Bỏ qua** button.
  - Immediately sets `pointer-events: none` when exiting so user interactions and automated tests are never blocked.

---

## 2. Architecture

### 2.1 `ClassicalCurtain` (`src/components/ui/ClassicalCurtain.tsx`)
- Client Component mounted in [layout.tsx](file:///D:/Học%20tập/Web_Viet_Nhat/src/app/layout.tsx) inside `LanguageProvider`.
- **Render & Hydration safety:**
  - Uses `useState` + `useEffect` to read `sessionStorage.getItem("vnj_curtain_seen")` and `window.matchMedia("(prefers-reduced-motion: reduce)")` cleanly without hydration mismatch (`suppressHydrationWarning` / client mount guard).
  - Never hides underlying page DOM (`{children}` always renders normally in SSR and client).
- **Visual Composition:**
  - Warm Washi-ivory backdrop (`#fcfaf5`) framed with double hairline gold borders (`#ca8a04` / `#eab308`) and subtle corner ornaments.
  - Symmetrical lightweight inline SVG (~3 KB): Vietnamese Lotus (`Hoa Sen`) on the left, Japanese Sakura & Seigaiha wave arcs on the right, animated via CSS `stroke-dashoffset`.
  - Centerpiece: Interlocking gold ring emblem with a vermilion Hanko seal (`#b91c1c`) stamping down smoothly (`scale(1.14) -> scale(1)`, `opacity: 0 -> 1`).
  - Localized title & subtitle from `useLanguage()` (`vi` / `ja` / `en`).
  - Thin gold progress hairline at bottom + subtle **"Bỏ qua / Skip / スキップ"** button (`data-testid="curtain-skip"`).
- **Lifecycle:**
  - Visible hold: `1100ms` -> triggers exit state (`pointer-events: none`, curtain lifts via `translateY(-100%)` and `opacity: 0` over `450ms` `cubic-bezier(0.22, 1, 0.36, 1)`).
  - Clicking Skip immediately triggers exit state.
  - After exit finishes (`450ms`), sets `sessionStorage.setItem("vnj_curtain_seen", "1")` and unmounts.

### 2.2 `ClassicalSkeleton` (`src/components/ui/ClassicalSkeleton.tsx`)
- Lightweight GPU-only shimmer skeleton used as the `loading` fallback for `next/dynamic` imports.
- Features a warm ivory/neutral surface (`bg-[#fcfaf5]`), subtle gold hairline border, a tiny centered lotus/seal SVG mark, and a CSS `translateX` shimmer sweep (`@keyframes classical-shimmer`) to prevent repaint lag and layout shift (`min-h` matched to target section).

### 2.3 `LazyReveal` (`src/components/ui/LazyReveal.tsx`)
- Reusable Client Component using a single `IntersectionObserver` (`rootMargin: "150px 0px"`, `threshold: 0.05`, `once: true`) to smoothly reveal sections as the user scrolls.
- Uses CSS classes with `transform: translateY(16px)` + `opacity: 0` -> `translateY(0)` + `opacity: 1` (`550ms cubic-bezier(0.22, 1, 0.36, 1)`), with `prefers-reduced-motion: reduce` fallback rendering at full opacity immediately.
- Content remains in the DOM (never `display: none` or unmounted) so SEO and screen readers remain intact.

### 2.4 `LazyHomeSections` (`src/components/home/LazyHomeSections.tsx`)
- Per Next.js 16.3.3 docs (`node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`), `next/dynamic` code-splitting for Client Components must happen inside a Client Component (`"use client"`), not directly in a Server Component.
- [page.tsx](file:///D:/Học%20tập/Web_Viet_Nhat/src/app/page.tsx) keeps `HeroSection` statically imported for instant Above-the-Fold paint, and delegates below-the-fold sections (`FeatureGrid`, `StatsCounter`, `LatestNews`, `CTABanner`, `PartnersSection`) to `LazyHomeSections`, each dynamically imported with `ClassicalSkeleton` fallback and wrapped in `LazyReveal`.

### 2.5 Global CSS Keyframes (`src/app/globals.css`)
- GPU-only keyframes: `curtain-draw`, `hanko-stamp`, `curtain-progress`, `classical-shimmer`.
- Explicit `@media (prefers-reduced-motion: reduce)` guards.

---

## 3. Verification & Documentation Plan

- **Tests:** Add Playwright tests in [viet-nhat.spec.ts](file:///D:/Học%20tập/Web_Viet_Nhat/tests/viet-nhat.spec.ts) verifying:
  - Opening curtain appears on fresh session, displays Vietnam–Japan classical elements, can be skipped or auto-dismisses, and does not reappear on reload within the same session.
  - Below-the-fold sections render and reveal smoothly on scroll without horizontal overflow or console errors.
- **Checks:** `pnpm lint` (also fix pre-existing lint errors/warnings if needed or ensure new files are 100% lint-clean — check scope), `pnpm build` (21 static pages), and `npx playwright test`.
- **Docs & Session Log:** Record implementation details in `docs/sessions/` and maintain `docs/README.md`.
