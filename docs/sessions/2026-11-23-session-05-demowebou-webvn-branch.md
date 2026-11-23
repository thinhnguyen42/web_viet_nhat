# Session 05 — Đồng bộ Remote chính `Smart-Home-SH/demowebou` & Tạo nhánh `webvn`

- **Ngày:** 2026-11-23
- **Remote chính (`origin`):** `https://github.com/Smart-Home-SH/demowebou.git`
- **Remote dự phòng (`personal`):** `https://github.com/thinhnguyen42/web_viet_nhat.git`
- **Nhánh dự án hiện tại:** `webvn` (trên `origin`)

---

## 1. Công việc đã thực hiện

1. **Cấu hình lại Remote Git:**
   - Đổi tên remote cũ `origin` (`https://github.com/thinhnguyen42/web_viet_nhat.git`) thành `personal` để giữ nguyên bản lưu trữ dự phòng.
   - Đặt `https://github.com/Smart-Home-SH/demowebou.git` làm remote chính `origin`.
   - `git fetch origin`: đồng bộ nhánh chính `origin/main` (`198391e`) và nhánh `origin/webviethan` (`7770bab`).
2. **Tách nhánh phụ `webvn` & đồng bộ nhánh `main`:**
   - Cập nhật nhánh `main` local trỏ đúng về `origin/main` (`198391e`), không ghi đè nhánh chính của `Smart-Home-SH/demowebou`.
   - Tạo nhánh local `webvn` từ toàn bộ mã nguồn dự án `Web_Viet_Nhat` hiện tại trên máy.
   - Thực hiện `git push -u origin webvn`: bị chặn với lỗi **`HTTP 403 — Write access to repository not granted`** do tài khoản GitHub đang lưu trên máy chưa có quyền ghi vào `Smart-Home-SH/demowebou.git` (đã báo lại để người dùng cấp quyền / đăng nhập tài khoản có quyền ghi rồi chạy lại `git push -u origin webvn`).
