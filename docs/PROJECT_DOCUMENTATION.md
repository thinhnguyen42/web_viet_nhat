# TÀI LIỆU TỔNG KẾT VÀ BÁO CÁO DỰ ÁN (PROJECT DOCUMENTATION)

**Dự án:** Website Cổng thông tin & Hợp tác Học thuật Việt - Nhật (Trường Đại học Mở TP.HCM)  
**Mã dự án:** `web-viet-nhat-academic`  
**Ngày cập nhật:** 23/11/2026  

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Mục tiêu dự án
Xây dựng website cổng thông tin học thuật và trao đổi sinh viên hiện đại, trang trọng cho **Trung Tâm Hợp Tác Học Thuật Việt - Nhật** trực thuộc **Trường Đại học Mở TP.HCM (HCMCOU)**:
- Giới thiệu sứ mệnh, tầm nhìn, lịch sử hợp tác học thuật và nghiên cứu song phương Việt Nam – Nhật Bản.
- Cung cấp thông tin chi tiết về các chương trình trao đổi sinh viên (ĐH Tokyo, ĐH Kyoto, ĐH Osaka), học bổng (JASSO, MEXT) và đào tạo tiếng Nhật học thuật (N2/N1).
- Giới thiệu hội đồng cố vấn và giảng viên Việt – Nhật.
- Đăng tải tin tức học thuật, hội thảo quốc tế, hướng dẫn thủ tục COE/Visa.
- Tiếp nhận hồ sơ đăng ký xét tuyển (`/admissions`) và thắc mắc liên hệ (`/contact`) trực tuyến.
- Cho phép quản trị viên **thêm, sửa, ẩn/hiện nội dung trực tiếp qua Google Sheet** mà không cần build lại mã nguồn.

### 1.2. Đối tượng phục vụ
- Sinh viên Trường Đại học Mở TP.HCM và ứng viên quan tâm tới chương trình trao đổi, học bổng du học Nhật Bản.
- Giáo sư, giảng viên, chuyên gia và các trường đại học đối tác tại Nhật Bản.
- Ban quản trị Trung tâm sử dụng Google Sheet làm Headless CMS 3 ngôn ngữ (`VI` / `JA` / `EN`).

---

## 2. CÔNG NGHỆ SỬ DỤNG (TECH STACK)

| Thành phần | Công nghệ / Thư viện | Vai trò |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.3.3` (App Router, Turbopack) | Static Site Generation (`output: "export"`, 23 static routes), tối ưu SEO |
| **Ngôn ngữ** | TypeScript 5 | Kiểm soát kiểu dữ liệu chặt chẽ (Type Safety, 0 `any`) |
| **Thư viện UI** | React `19.2.8` | Giao diện component phản hồi cao |
| **Styling** | Tailwind CSS v4, `@tailwindcss/typography` | Thiết kế responsive, bảng màu Royal Navy (`#1e40af` / `#1e2a5e`) & Accent Gold (`#eab308`) |
| **Hiệu ứng & Lazy Loading** | Framer Motion `13.1.1` + GPU CSS Keyframes + `next/dynamic` | Màn mở màn cổ điển Việt - Nhật (`ClassicalCurtain`) + lazy-load theo cuộn (`LazyReveal`, `ClassicalSkeleton`) |
| **Bộ Icon** | Lucide React `1.34.0` | Bộ icon vector sắc nét |
| **Quản lý gói** | pnpm (`packageManager: pnpm@9.12.2`) | Cài đặt nhanh, lockfile ổn định |
| **Headless CMS** | Google Apps Script (`apps-script/Code.gs`) + Google Sheets | CMS 6 tab hỗ trợ 3 ngôn ngữ, `CacheService` 60s, menu quản trị trực tiếp trên Sheet |
| **Kiểm thử E2E** | Playwright `1.64.1` | Kiểm thử tự động toàn bộ luồng trang chủ, đa ngôn ngữ, form, curtain, lazy-load và Google Sheet CMS |
| **Container & Web Server** | Docker (Multi-stage) + Nginx Alpine | Phục vụ file tĩnh `out/` ở cổng `3005`, hỗ trợ Gzip và `/healthz` |
| **CI/CD** | GitHub Actions (`.github/workflows/deploy.yml`) | Chạy `pnpm lint`, `pnpm build`, Docker push GHCR và cập nhật Staging K3s |

---

## 3. CÁC TÍNH NĂNG ĐÃ HOÀN THÀNH

### 3.1. Hệ thống Đa ngôn ngữ 3 thứ tiếng (`VI` / `JA` / `EN`)
- `LanguageProvider` (`src/components/providers/LanguageProvider.tsx`) lưu lựa chọn qua `localStorage`.
- Từ điển giao diện chuẩn hóa tại `src/data/i18n.ts` cho Tiếng Việt, Tiếng Nhật (`日本語`) và Tiếng Anh.

### 3.2. Hiệu ứng Mở màn & Lazy Loading Cổ điển Việt - Nhật
- **`ClassicalCurtain` (`src/components/ui/ClassicalCurtain.tsx`)**:
  - Chạy 1 lần mỗi phiên (`sessionStorage`), nền giấy Washi ngà ấm, khung viền vàng kim, họa tiết sóng Seigaiha, inline SVG **Hoa Sen & Hoa Anh Đào** và **con dấu triện đỏ son (`日越`)**.
  - Thuần GPU (`transform`, `opacity`, `stroke-dashoffset`), hỗ trợ nút **Bỏ qua** và tự động tắt với `prefers-reduced-motion: reduce`.
- **`LazyHomeSections`, `LazyReveal`, `ClassicalSkeleton`**:
  - Tách code-splitting cho các section dưới fold bằng `next/dynamic` trong Client Component (`LazyHomeSections.tsx`) kèm `IntersectionObserver` (`rootMargin: "150px 0px"`).

### 3.3. Google Sheets Headless CMS (6 Tab) & Smart Fallback
- **`apps-script/Code.gs`** quản lý 6 tab:
  1. `CauHinh_TrangWeb`: cấu hình động theo nhóm (`hero`, `stats`, `about`, `cta`, `contact`).
  2. `ChuongTrinh_TraoDoi`: danh sách chương trình trao đổi, học bổng, tiếng Nhật học thuật (hỗ trợ `overview`, `requirement`, `features`, `status`, `order`).
  3. `TinTuc_HocThuat`: tin tức, thông báo, hội thảo (hỗ trợ `featured`, `date`, `content`, `status`).
  4. `DoiNgu_GiangVien`: giảng viên & cố vấn (lọc theo `status`, sắp xếp theo `order`).
  5. `Don_Dang_Ky`: tự động lưu hồ sơ từ `/admissions`.
  6. `Lien_He`: tự động lưu thắc mắc từ `/contact`.
- **`SiteDataProvider` (`src/components/providers/SiteDataProvider.tsx`)**:
  - Khởi tạo `0ms` từ dữ liệu mặc định trong `src/data/*.ts`, fetch ngầm `GET ?action=all` trong 1 request duy nhất, cache phiên 60s (`?refresh=1` để tải mới tức thì).
  - Smart fallback 3 ngôn ngữ: chỉ cần nhập Tiếng Việt (`_vi`); các cột `_ja`, `_en` hoặc `slug` nếu để trống sẽ tự fallback.
  - Hỗ trợ bài viết/chương trình **mới thêm trên Sheet** mở trực tiếp qua route `/news/detail/?slug=...` và `/programs/detail/?slug=...` mà không bị 404 trên static export.

### 3.4. Hạ tầng & Kiểm thử
- `nginx.conf`: phục vụ static export `out/` trên port `3005`, bật Gzip, security headers và endpoint `/healthz`.
- `tests/viet-nhat.spec.ts`: 8 test Playwright E2E bao phủ trang chủ, đa ngôn ngữ, `/programs`, `/news`, form `/admissions`, `ClassicalCurtain`, `LazyReveal`, và đồng bộ Google Sheet CMS + `/news/detail/?slug=...`.

---

## 4. HƯỚNG DẪN VẬN HÀNH & TRIỂN KHAI

```bash
# Cài đặt dependencies
pnpm install

# Chạy dev server
pnpm dev

# Kiểm tra lint & build static (xuất ra thư mục out/)
pnpm lint
pnpm build

# Chạy kiểm thử E2E Playwright
npx playwright test

# Xem hướng dẫn cài đặt Google Apps Script
# -> apps-script/HUONG_DAN_CAI_DAT.md
```
