# Session 02 — Tổng hợp dự án Việt - Hàn & Triển khai Google Sheet CMS

- **Ngày:** 2026-11-23
- **Môi trường:** Windows, Next.js `16.3.3` (Turbopack, `output: "export"`), React `19.2.8`, TypeScript 5, Playwright `1.64.1`

---

## 1. Mục tiêu phiên làm việc

1. Đọc tài liệu tổng kết dự án tham chiếu (`demoweb-ou-vhn` — Trung Tâm Việt - Hàn) và kế thừa toàn bộ năng lực quản trị nội dung động qua Google Sheets, endpoint `/healthz` Nginx, trang chi tiết động và cấu trúc tài liệu tổng kết dự án sang `Web_Viet_Nhat`.
2. Thiết kế và kết nối Google Apps Script (`https://script.google.com/home/projects/1Vw03BfXfgtozhiYZbvryJj-DvwAttxm53UQ4UN2titecCo7-il1bGjWG/edit`) để thêm/sửa/ẩn nội dung website trực tiếp trên Google Sheet với 3 ngôn ngữ (`VI` / `JA` / `EN`) và smart fallback.
3. Sửa triệt để các lỗi ESLint cũ và đảm bảo toàn bộ 8 test Playwright pass.

---

## 2. Danh sách thay đổi

### Backend Apps Script & Hạ tầng
- **`apps-script/Code.gs`**: Viết lại hoàn chỉnh theo mô hình 6 tab (`CauHinh_TrangWeb`, `ChuongTrinh_TraoDoi`, `TinTuc_HocThuat`, `DoiNgu_GiangVien`, `Don_Dang_Ky`, `Lien_He`), thêm menu quản trị `🎓 Quản trị Web Việt - Nhật` (`onOpen`), `CacheService` 60s, endpoint `?action=all`, `doPost` cho cả `application` và `contact`.
- **`apps-script/HUONG_DAN_CAI_DAT.md`**: Cập nhật hướng dẫn từng bước gắn với link Apps Script của người dùng, cách khởi tạo 6 sheet mẫu, cập nhật Web App deployment và mẹo `?refresh=1`.
- **`nginx.conf`**: Bổ sung `location = /healthz` trả `200 ok`.

### Frontend Data Layer & Providers
- **`src/data/programs.ts` & `src/data/news.ts`**: Mở rộng interface (`overview*`, `requirement*`, `status`, `order`).
- **`src/lib/appsScriptApi.ts`**: Định nghĩa TypeScript interfaces chặt chẽ (xóa toàn bộ `any`), thêm `fetchAllSiteData`, `submitContact`, `slugifyVietnamese`, bộ chuẩn hóa dữ liệu từ Sheet và `AbortController` timeout 8s.
- **`src/components/providers/SiteDataProvider.tsx`**: Tạo provider quản lý trạng thái CMS (khởi tạo 0ms từ dữ liệu tĩnh, cache `sessionStorage` 60s, hỗ trợ `?refresh=1`, tự sinh link `/news/detail?slug=...` & `/programs/detail?slug=...` cho bài mới tạo trên Sheet).
- **`src/app/layout.tsx`**: Bọc app bằng `<SiteDataProvider>`.
- **`src/components/layout/Header.tsx`**: Xóa `Globe` và `toggleLocale` không sử dụng (hết warning ESLint).

### Pages & Components kết nối Google Sheet CMS
- **`src/components/home/HeroSection.tsx`**, **`StatsCounter.tsx`**, **`LatestNews.tsx`**, **`CTABanner.tsx`**, **`src/components/layout/Footer.tsx`**: Đọc cấu hình & tin mới từ `useSiteData()`.
- **`src/app/about/page.tsx`**, **`src/app/faculty/page.tsx`**, **`src/app/programs/page.tsx`**, **`src/app/news/page.tsx`**, **`src/app/admissions/page.tsx`**: Kết nối dữ liệu động từ `useSiteData()`.
- **`src/app/programs/[slug]/ProgramDetailClient.tsx`** & **`src/app/news/[slug]/NewsDetailClient.tsx`**: Hiển thị chi tiết động theo `slug` và 3 ngôn ngữ (hỗ trợ xuống đoạn văn `\n`, `overview`, `requirement`).
- **`src/app/programs/detail/page.tsx`** & **`src/app/news/detail/page.tsx`**: Thêm 2 static routes đọc `?slug=` qua `useSearchParams()` bọc trong `<Suspense>` để các bài/chương trình mới thêm trên Sheet mở được ngay không bị 404.
- **`src/app/contact/page.tsx`**: Kết nối form liên hệ tới `submitContact()` ghi vào tab `Lien_He` và đọc thông tin văn phòng từ Google Sheet.

### Kiểm thử & Tài liệu
- **`tests/viet-nhat.spec.ts`**: Cập nhật Test 5 dùng `page.route` mock Apps Script POST ổn định; bổ sung Test 8 kiểm tra đồng bộ dữ liệu từ `GET ?action=all` và mở bài viết mới qua `/news/detail/?slug=...`.
- **`docs/PROJECT_DOCUMENTATION.md`**: Tài liệu tổng kết toàn dự án `Web_Viet_Nhat` kế thừa chuẩn tài liệu `demoweb-ou-vhn`.
- **`docs/superpowers/specs/2026-11-23-google-sheet-cms-synthesis-design.md`** & **`docs/superpowers/plans/2026-11-23-google-sheet-cms-synthesis.md`**.

---

## 3. Kết quả kiểm tra (Verification)

- **ESLint (`pnpm lint`):** **0 errors, 0 warnings** (exit code 0).
- **Build (`pnpm build`):** **Passed** (exit code 0) — compiled `3.3s`, TypeScript `5.5s`, generated **23/23 static pages** vào `out/`.
- **Playwright (`npx playwright test`):** **8/8 passed** (`22.9s`), 0 failures.
- **Preview Server:** Đang chạy tại `http://localhost:3000` (`npx --yes serve out -l 3000`).
