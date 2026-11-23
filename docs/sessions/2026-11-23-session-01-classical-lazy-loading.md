# Session 01 — Khảo sát dự án, Build kiểm thử & Triển khai Classical Vietnam–Japan Lazy Loading

- **Ngày:** 2026-11-23
- **Môi trường:** Windows, Next.js `16.3.3` (Turbopack, `output: "export"`), React `19.2.8`, Tailwind CSS v4, Playwright `1.64.1`, pnpm `11.8.0`

---

## 1. Tóm tắt yêu cầu & công việc đã thực hiện

1. **Đọc và kiểm tra toàn bộ dự án** (`src/`, `tests/`, `apps-script/`, `Dockerfile`, `nginx.conf`, `.github/workflows/deploy.yml`, `.env.local`), chạy `pnpm build` và `npx playwright test` trên bản gốc.
2. **Thiết kế & triển khai hệ thống Lazy Loading cổ điển Việt – Nhật** (không cài thêm thư viện ngoài, chỉ dùng GPU-composited animations):
   - **`src/app/globals.css`**: Thêm các keyframes thuần GPU (`curtain-draw`, `hanko-stamp`, `curtain-progress`, `classical-shimmer`) cùng class `.lazy-reveal` (`opacity` + `translate3d`) và hỗ trợ `prefers-reduced-motion: reduce`.
   - **`src/components/ui/ClassicalCurtain.tsx`**: Màn mở màn cổ điển trên nền giấy Washi ngà ấm (`#fcfaf5`), khung viền vàng kim đôi, họa tiết sóng Seigaiha, SVG nét mảnh Hoa Sen (Việt) & Hoa Anh Đào (Nhật), con dấu triện đỏ son (`日越`), khẩu hiệu đa ngôn ngữ (`vi` / `ja` / `en`), thanh tiến trình và nút **Bỏ qua / Skip**. Tự lưu `sessionStorage` (`vnj_curtain_seen`) để chỉ chạy 1 lần mỗi phiên (~1.1s + 450ms vén màn), lập tức bật `pointer-events: none` khi thoát.
   - **`src/components/ui/ClassicalSkeleton.tsx`**: Khung chờ tối giản phong cách Washi & vàng kim (2 biến thể `light` và `navy`) với shimmer chạy bằng `transform: translateX`.
   - **`src/components/ui/LazyReveal.tsx`**: Wrapper `IntersectionObserver` (`rootMargin: "150px 0px"`, `threshold: 0.05`, kích hoạt một lần) giữ nguyên nội dung trong DOM cho SSR/SEO và tự gỡ `will-change` sau khi hiện xong.
   - **`src/components/home/LazyHomeSections.tsx`**: Client Component thực hiện code-splitting bằng `next/dynamic` (đúng quy chuẩn App Router trong `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`) cho các section dưới fold (`FeatureGrid`, `StatsCounter`, `LatestNews`, `CTABanner`, `PartnersSection`).
   - **`src/app/page.tsx` & `src/app/layout.tsx`**: Giữ `HeroSection` tải tĩnh tức thì trên trang chủ, gắn `LazyHomeSections` bên dưới, và gắn `ClassicalCurtain` trong `RootLayout`.
   - **`tests/viet-nhat.spec.ts`**: Bổ sung Test 6 (kiểm tra màn mở màn, nút bỏ qua, và `sessionStorage`) và Test 7 (kiểm tra lazy reveal khi cuộn, không tràn ngang, không lỗi runtime).

---

## 2. Danh sách file đã tạo / chỉnh sửa

| File | Hành động | Mô tả |
|---|---|---|
| `src/app/globals.css` | Modified | Keyframes GPU & `.lazy-reveal` + reduced motion |
| `src/components/ui/ClassicalCurtain.tsx` | Created | Màn mở màn cổ điển Sen – Sakura & ấn triện `日越` |
| `src/components/ui/ClassicalSkeleton.tsx` | Created | Skeleton Washi / Navy cho `next/dynamic` |
| `src/components/ui/LazyReveal.tsx` | Created | Wrapper `IntersectionObserver` scroll reveal |
| `src/components/home/LazyHomeSections.tsx` | Created | Client dynamic imports cho các section dưới fold |
| `src/app/page.tsx` | Modified | Dùng `HeroSection` + `LazyHomeSections` |
| `src/app/layout.tsx` | Modified | Gắn `ClassicalCurtain` vào `LanguageProvider` |
| `tests/viet-nhat.spec.ts` | Modified | Thêm test case #6 và #7 |
| `docs/superpowers/specs/2026-11-23-viet-nhat-classical-lazy-loading-design.md` | Created | Tài liệu thiết kế |
| `docs/superpowers/plans/2026-11-23-viet-nhat-classical-lazy-loading.md` | Created | Kế hoạch triển khai |
| `docs/README.md` | Created | Chỉ mục tài liệu & quy ước session log |
| `docs/sessions/2026-11-23-session-01-classical-lazy-loading.md` | Created | Nhật ký phiên làm việc 01 |

---

## 3. Kết quả kiểm tra (Verification)

- **ESLint (các file mới & chỉnh sửa):** `npx eslint src/components/ui/ClassicalCurtain.tsx src/components/ui/ClassicalSkeleton.tsx src/components/ui/LazyReveal.tsx src/components/home/LazyHomeSections.tsx src/app/page.tsx src/app/layout.tsx` → **0 errors, 0 warnings** (exit code 0).
- **Build (`pnpm build`):** **Passed** (exit code 0). Compiled in `2.9s`, TypeScript in `4.7s`, generated `21/21` static pages into `out/`.
- **Playwright (`npx playwright test`):** **6/7 passed, 1 failed (pre-existing)**:
  - ✓ Test 1: Trang chủ tải thành công & nhận diện Việt - Nhật (`1.2s`)
  - ✓ Test 2: Chuyển đổi 3 ngôn ngữ VI / JA / EN (`2.5s`)
  - ✓ Test 3: Trang chương trình (`/programs`) (`533ms`)
  - ✓ Test 4: Trang tin tức (`/news`) (`494ms`)
  - ✘ Test 5: Form `/admissions` timeout `5000ms` ở trạng thái `"Đang gửi..."` (lỗi có sẵn từ trước do `.env.local` trỏ `NEXT_PUBLIC_APPS_SCRIPT_URL` tới URL Google Apps Script thật thay vì chế độ mock offline).
  - ✓ Test 6: `ClassicalCurtain` hiển thị lần đầu, bấm bỏ qua & lưu `sessionStorage`, không lặp lại khi reload (`1.9s`)
  - ✓ Test 7: `LazyReveal` kích hoạt khi cuộn trang, không tràn ngang, không lỗi JS (`1.5s`)
- **Preview Server:** Đang chạy tại `http://localhost:3000` (`npx --yes serve out -l 3000`).

---

## 4. Ghi chú tồn đọng từ code gốc (chưa đụng vào vì ngoài phạm vi)

- `pnpm lint` toàn cục vẫn còn 2 lỗi sẵn có ở `src/lib/appsScriptApi.ts` (`@typescript-eslint/no-explicit-any` tại dòng 59 và 74) và 2 warning unused vars ở `src/components/layout/Header.tsx` (dòng 6 `Globe`, dòng 16 `toggleLocale`).
- Test 5 trong `tests/viet-nhat.spec.ts` phụ thuộc mạng tới Google Apps Script URL trong `.env.local`.
