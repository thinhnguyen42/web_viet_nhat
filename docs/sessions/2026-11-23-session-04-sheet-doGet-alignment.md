# Session 04 — Chuẩn hóa Google Apps Script `?sheet=` & Bảng `home`/`about`/`partners`

- **Ngày:** 2026-11-23
- **Google Sheet ID gắn kết:** `1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU`

---

## 1. Thay đổi đã thực hiện

1. **`apps-script/Code.gs`:**
   - Gắn trực tiếp `SPREADSHEET_ID = "1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU"` qua `getTargetSpreadsheet()` (tự dùng active spreadsheet hoặc fallback `openById`).
   - Hỗ trợ `doGet(e)` theo đúng chuẩn `?sheet=<tab>` (trả về mảng JSON trực tiếp, tách `features`, chuyển boolean `featured`, format `Date`) và `?sheet=all` (trả về JSON gộp `{ home, about, programs, news, faculty, partners }`).
   - Đổi tên 8 tab sang tên ngắn gọn dễ dùng cho người không biết code: `home`, `about`, `programs`, `news`, `faculty`, `partners`, `admissions`, `contact`.
   - Thêm hàm **`khoiTaoTatCaDuLieuVietNhat()`** và menu **🎓 Quản trị Web Việt - Nhật** để người dùng chạy 1 lần là tự tạo & điền sẵn toàn bộ dữ liệu Việt - Nhật vào Google Sheet.
2. **`src/lib/appsScriptApi.ts`, `SiteDataProvider.tsx` & Home Components:**
   - Hỗ trợ đọc các key thân thiện từ tab `home` (`badge`, `main_title`, `subtitle`, `btn_explore`, `btn_contact`, `card_tag`, `card_title`, `card_subtitle`, `stat_students_count`, `stat_students`, `section_features_title`, `section_stats_title`, `section_news_title`, `section_partners_title`, `btn_view_all`, `btn_read_more`, v.v.), tab `about`, và tab `partners`.
   - Vẫn giữ tương thích ngược với các tên key/cột cũ (`hero_title`, `title_vi`, `config`, v.v.).
3. **`apps-script/HUONG_DAN_CAI_DAT.md`:**
   - Cập nhật hướng dẫn gắn với ID Google Sheet `1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU` và hàm `khoiTaoTatCaDuLieuVietNhat`.
4. **`tests/viet-nhat.spec.ts`:**
   - Cập nhật Test 8 kiểm tra dữ liệu mẫu định dạng `home` (`key | vi | en`), `news`, và `partners`.

---

## 2. Kết quả kiểm tra (Verification)

- **ESLint (`pnpm lint`):** **0 errors, 0 warnings** (exit code 0).
- **Build (`pnpm build`):** **Passed** (exit code 0, compile `13.5s`, TypeScript `18.0s`, sinh **23/23 static pages** vào `out/`).
- **Playwright (`npx playwright test`):** **8/8 passed** (`29.7s`), 0 failures.
- **GitHub Push:** Đã commit và push lên `https://github.com/thinhnguyen42/web_viet_nhat.git` (`main`).
