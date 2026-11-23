# Session 08 — Kiểm toán Workflow, Sửa `1`/`0` boolean & `featured`, Viết `WORKFLOW.md` bản Demo

- **Ngày:** 2026-11-23

---

## 1. Các điểm đã phát hiện khi đối chiếu Workflow & Sửa triệt để

1. **`apps-script/Code.gs`:** Bổ sung nhận cả số `1`/`0` (bên cạnh `TRUE`/`FALSE`) cho cột `featured` (tab `news`) và cột `Hiển thị` / `status` (tab `faculty`, `programs`, `partners`), tránh bị ép thành `false` khi biên tập viên nhập `1` theo hướng dẫn.
2. **`src/lib/appsScriptApi.ts`, `src/content/pages.json`, `src/app/news/page.tsx`:** Sắp xếp bài `featured = true` lên đầu danh sách tin tức và hiển thị huy hiệu **`★ Tiêu điểm / ★ 注目記事 / ★ Featured`** nổi bật trên `/news`.
3. **`WORKFLOW.md`:** Viết lại hoàn chỉnh bản tài liệu Workflow vận hành & trình diễn Demo dành riêng cho **Web Việt - Nhật** (8 tab Google Sheets, 7 file JSON `src/content/*.json`, 3 thư mục ảnh `public/images/`, luồng `doGet`/`doPost`, cơ chế fallback + route bài mới không 404, sổ tay thao tác nhanh, và **Kịch bản Demo trực tiếp 5 bước**).

---

## 2. Kết quả kiểm tra (Verification)

- **`pnpm lint`:** **0 errors, 0 warnings** (exit code 0).
- **`pnpm build`:** **Passed** (compile `2.6s`, TypeScript `5.3s`, sinh **23/23 static pages** vào `out/`).
- **`npx playwright test`:** **8/8 passed** (`23.6s`), 0 failures.
- **Preview Server:** Đang chạy tại `http://localhost:3000`.
