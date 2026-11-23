# Web_Viet_Nhat — Documentation & Session Logs

Tài liệu kỹ thuật và nhật ký các phiên làm việc (work sessions) cho dự án **Trung Tâm Hợp Tác Học Thuật Việt - Nhật (HCMCOU)**.

## Tài liệu tổng kết dự án
- [PROJECT_DOCUMENTATION.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/PROJECT_DOCUMENTATION.md) — Báo cáo tổng hợp kiến trúc, tech stack, tính năng, hướng dẫn vận hành & triển khai toàn dự án.
- [HUONG_DAN_CAI_DAT.md](file:///D:/Học%20tập/Web_Viet_Nhat/apps-script/HUONG_DAN_CAI_DAT.md) — Hướng dẫn cài đặt và sử dụng Google Apps Script / Google Sheet CMS.

## Specs & Plans
- **Specs (Thiết kế):**
  - [2026-11-23-viet-nhat-classical-lazy-loading-design.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/superpowers/specs/2026-11-23-viet-nhat-classical-lazy-loading-design.md) — Màn mở màn cổ điển Việt - Nhật & lazy loading theo cuộn trang.
  - [2026-11-23-google-sheet-cms-synthesis-design.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/superpowers/specs/2026-11-23-google-sheet-cms-synthesis-design.md) — Hệ thống Google Sheet Headless CMS 6 tab & kế thừa từ `demoweb-ou-vhn`.
- **Plans (Kế hoạch triển khai):**
  - [2026-11-23-viet-nhat-classical-lazy-loading.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/superpowers/plans/2026-11-23-viet-nhat-classical-lazy-loading.md)
  - [2026-11-23-google-sheet-cms-synthesis.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/superpowers/plans/2026-11-23-google-sheet-cms-synthesis.md)

## Work Sessions (Nhật ký phiên làm việc)
- [2026-11-23-session-01-classical-lazy-loading.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/sessions/2026-11-23-session-01-classical-lazy-loading.md) — Phiên 01: Khảo sát dự án, build & kiểm thử ban đầu, triển khai Classical Vietnam–Japan Lazy Loading & Opening Curtain.
- [2026-11-23-session-02-google-sheet-cms.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/sessions/2026-11-23-session-02-google-sheet-cms.md) — Phiên 02: Kế thừa cấu trúc dự án Việt - Hàn, triển khai Google Sheet CMS 6 tab đa ngôn ngữ, route dự phòng `/news/detail` & `/programs/detail`, `/healthz` Nginx, dọn sạch ESLint và đạt 8/8 Playwright tests.
- [2026-11-23-session-03-github-push-and-azure-check.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/sessions/2026-11-23-session-03-github-push-and-azure-check.md) — Phiên 03: Kiểm tra tài nguyên Azure VM (`ZaloOaBot`) từ `pm2 list` và đẩy toàn bộ mã nguồn lên `https://github.com/thinhnguyen42/web_viet_nhat.git` (nhánh `main`).
- [2026-11-23-session-04-sheet-doGet-alignment.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/sessions/2026-11-23-session-04-sheet-doGet-alignment.md) — Phiên 04: Chuẩn hóa Apps Script theo `?sheet=` + 8 tab thân thiện (`home`, `about`, `programs`, `news`, `faculty`, `partners`, `admissions`, `contact`) gắn ID Sheet `1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU`.
- [2026-11-23-session-05-demowebou-webvn-branch.md](file:///D:/Học%20tập/Web_Viet_Nhat/docs/sessions/2026-11-23-session-05-demowebou-webvn-branch.md) — Phiên 05: Đặt `https://github.com/Smart-Home-SH/demowebou.git` làm `origin` (`main` giữ nguyên theo `origin/main`) và đẩy dự án `Web_Viet_Nhat` lên nhánh phụ `webvn`.

## Quy tắc cập nhật tài liệu

Sau mỗi lần cài đặt, cập nhật tính năng, sửa lỗi hoặc triển khai mới:
1. Ghi lại một file nhật ký mới trong `docs/sessions/YYYY-MM-DD-session-XX-<slug>.md` (gồm: mục tiêu, các file đã tạo/sửa, kết quả lint/build/test thực tế, các vấn đề tồn đọng nếu có).
2. Cập nhật danh sách phiên trong `docs/README.md` (và `docs/PROJECT_DOCUMENTATION.md` nếu có thay đổi kiến trúc/tính năng lớn).
