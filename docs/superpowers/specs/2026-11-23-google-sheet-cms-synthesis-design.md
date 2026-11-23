# Design Spec: Google Sheet Headless CMS & Project Synthesis (`Web_Viet_Nhat`)

**Date:** 2026-11-23  
**Project:** Web_Viet_Nhat (Trung Tâm Hợp Tác Học Thuật Việt - Nhật — HCMCOU)  
**Reference Project:** `demoweb-ou-vhn` (Trung Tâm Việt - Hàn)  
**Status:** Approved by user  

---

## 1. Objectives

Synthesize the proven Google Sheets Headless CMS capabilities, `/healthz` Nginx setup, and project documentation standards from `demoweb-ou-vhn` into `Web_Viet_Nhat` while upgrading them for:
- Trilingual support (`vi`, `ja`, `en`) with smart fallback (Vietnamese required; `ja`/`en` and `slug` auto-fallback).
- Single-fetch `?action=all` endpoint with Google Apps Script `CacheService` (60s) and client `sessionStorage` stale-while-revalidate cache (60s, bypassable via `?refresh=1`).
- Static export compatibility (`output: "export"`) for brand-new slugs created in Google Sheets after build time via `/news/detail/?slug=...` and `/programs/detail/?slug=...`.
- Full ESLint cleanliness (`0` errors, `0` warnings) and deterministic Playwright tests.

---

## 2. Google Apps Script Backend (`apps-script/Code.gs`)

### 2.1 Six Sheet Tabs
1. `CauHinh_TrangWeb`: `key | value_vi | value_ja | value_en | group | note` (`hero`, `stats`, `about`, `cta`, `contact` keys)
2. `ChuongTrinh_TraoDoi`: `id | slug | category | title_vi | title_ja | title_en | description_vi | description_ja | description_en | overview_vi | overview_ja | overview_en | requirement_vi | requirement_ja | requirement_en | duration | features | status | order`
3. `TinTuc_HocThuat`: `id | slug | category | date | featured | title_vi | title_ja | title_en | excerpt_vi | excerpt_ja | excerpt_en | content_vi | content_ja | content_en | status`
4. `DoiNgu_GiangVien`: `id | name_vi | name_ja | name_en | title_vi | title_ja | title_en | specialization | bio_vi | bio_ja | bio_en | status | order`
5. `Don_Dang_Ky`: Admissions form submissions from `/admissions`
6. `Lien_He`: Contact form inquiries from `/contact`

### 2.2 Sheet Menu & API
- `onOpen()`: Adds custom menu `🎓 Quản trị Web Việt - Nhật` with:
  - `✨ Khởi tạo / Đồng bộ tất cả Sheet mẫu`
  - `🔗 Tự động tạo Slug (Cho dòng trống)`
  - `🧹 Xóa Cache API ngay`
- `doGet(e)`: Supports `action=all` (default when `all`), `programs`, `news`, `faculty`, `config`, plus `nocache=1`. Uses `CacheService.getScriptCache()` (60s TTL).
- `doPost(e)`: Handles `type: "application"` (`Don_Dang_Ky`) and `type: "contact"` (`Lien_He`).

---

## 3. Frontend Architecture

### 3.1 Strongly Typed API & Normalizers (`src/lib/appsScriptApi.ts`)
- Replace `any` types with explicit interfaces (`SheetSiteData`, `SheetConfigRow`, `SheetProgramRow`, `SheetNewsRow`, `SheetFacultyRow`, `ContactSubmission`, `StudentApplication`).
- Add `slugifyVietnamese()` and boolean/date/feature normalizers.
- Add `fetchAllSiteData(forceRefresh?: boolean)` with `8000ms` `AbortController` timeout and safe `null` fallback.
- Add `submitContact()` alongside `submitApplication()`.

### 3.2 `SiteDataProvider` (`src/components/providers/SiteDataProvider.tsx`)
- Initializes immediately with static defaults from `src/data/programs.ts`, `src/data/news.ts`, `src/data/faculty.ts`, `src/data/site.ts`, and `src/data/i18n.ts` (`0ms` initial paint).
- Reads `sessionStorage` cache (`vnj_sheet_cache_v1`, 60s TTL) unless `?refresh=1` is present.
- Fetches `?action=all` once per session/TTL and merges active (`status !== false`) items smoothly into state.
- Exposes `programs`, `news`, `faculty`, `config`, `getConfigText(key, locale, fallback)`, `getProgramHref(slug)`, `getNewsHref(slug)`, `isLoadedFromSheet`, `refreshData()`.

### 3.3 Page & Component Integration
- `HeroSection`, `StatsCounter`, `LatestNews`, `CTABanner`, `Footer` consume `SiteDataProvider`.
- `AboutPage`, `ProgramsPage`, `ProgramDetailClient`, `NewsPage`, `NewsDetailClient`, `FacultyPage`, `AdmissionsPage`, `ContactPage` consume `SiteDataProvider`.
- Static-export fallback detail pages: `src/app/programs/detail/page.tsx` and `src/app/news/detail/page.tsx` using `useSearchParams()` wrapped in `<Suspense>` + `ClassicalSkeleton`.
- `Header.tsx`: Remove unused `Globe` and `toggleLocale`.
- `nginx.conf`: Add `location = /healthz` returning `200 ok`.
