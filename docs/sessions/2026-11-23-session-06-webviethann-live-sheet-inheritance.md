# Session 06 — Kế thừa trực tiếp Apps Script `webviethann` (Chỉnh sửa Google Sheet tức thì, không cần mở Apps Script)

- **Ngày:** 2026-11-23
- **Kho tham chiếu:** `https://github.com/ThucLinh-75/webviethann.git`
- **Google Sheet ID:** `1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU`

---

## 1. Thay đổi đã thực hiện

1. **`apps-script/Code.gs`:**
   - Bỏ hoàn toàn `CacheService` để mọi chỉnh sửa trên Google Sheet phản ánh ngay lập tức khi tải lại trang web (không cần mở Apps Script xóa cache).
   - Chuẩn hóa `doGet(e)` theo đúng pattern `webviethann`: nhận `?sheet=<tab>` (`home`, `about`, `programs`, `news`, `faculty`, `partners`), trả thẳng mảng JSON `[...]`, tự tách chuỗi `features`, chuẩn hóa boolean `featured`, `Hiển thị`, `status`, format `Date` thành `yyyy-MM-dd`.
   - Tab `about` & `faculty` dùng chuẩn cột Việt–Nhật–Anh quen thuộc từ `webviethann` (`Mã nội dung`, `Tiếng Việt`, `Tiếng Nhật`, `Tiếng Anh`; `Tên`, `Chức vụ VI/JA/EN`, `Chuyên môn VI/EN`, `Mô tả VI/JA/EN`, `Đơn vị VI/EN`, `Hiển thị`).
   - Giữ `doPost(e)` lưu form `/admissions` (`admissions`) và `/contact` (`contact`), cùng hàm `khoiTaoTatCaDuLieuVietNhat()` chạy 1 lần đầu để tự tạo & điền đủ 8 tab.
2. **`src/lib/appsScriptApi.ts` & `src/components/providers/SiteDataProvider.tsx`:**
   - Bỏ cache `sessionStorage` 60s; gọi song song 6 tab `?sheet=home`, `about`, `programs`, `news`, `faculty`, `partners` với `{ cache: "no-store" }`.
   - Tự xử lý an toàn khi một tab chưa tồn tại trên Sheet (`{ error: ... }`) hoặc khi URL trả dạng `{ data: [...] }`.
   - Hỗ trợ đồng thời cả tên cột của `webviethann` lẫn tên key/cột tiếng Anh.
3. **`src/app/about/page.tsx`, `src/app/faculty/page.tsx`, `src/data/faculty.ts`:**
   - Hỗ trợ đầy đủ các mã nội dung `about` (`tieu_de_chinh`, `phu_de`, `mo_ta_chinh`, `su_menh_*`, `tam_nhin_*`, `lich_su_*`) và các trường `faculty` (`Đơn vị VI/EN`, `Chuyên môn VI/EN`).
4. **`tests/viet-nhat.spec.ts`:**
   - Cập nhật Test 8 mock các request `?sheet=<tab>` trả về mảng JSON trực tiếp giống hệt Apps Script thật.

---

## 2. Kết quả kiểm tra (Verification)

- **`pnpm lint`:** **0 errors, 0 warnings** (exit code 0).
- **`pnpm build`:** **Passed** (compile `2.3s`, TypeScript `5.5s`, sinh **23/23 static pages** vào `out/`).
- **`npx playwright test`:** **8/8 passed** (`23.9s`), 0 failures.
- **Preview Server:** Đang chạy tại `http://localhost:3000`.
