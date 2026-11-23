# Session 10: Đẩy nhánh `vija` lên `thinhnguyen42/web_viet_nhat.git`

- **Ngày:** 23/11/2026
- **Nhánh hiện tại:** `vija` (theo dõi `personal/vija`)
- **Remote đích:** `personal` (`https://github.com/thinhnguyen42/web_viet_nhat.git`)
- **Nhánh `main`:** Không chạm và không merge (`main` local giữ tại `198391e`, `personal/main` giữ tại `db1cc7c`).
- **Trạng thái:** Đã đẩy thành công nhánh `vija` lên `personal` (`https://github.com/thinhnguyen42/web_viet_nhat.git`).

## 1. Kiểm tra & Xác nhận

1. Xác nhận `gh auth status`: tài khoản `thinhnguyen42` chưa có quyền `push` trên `Smart-Home-SH/demowebou` (`pull: true`, `push: false` dù đã là `member` trạng thái `active` của org `Smart-Home-SH`).
2. Đẩy toàn bộ nhánh `vija` (bao gồm kiến trúc 7 JSON trong `src/content/`, 3 thư mục ảnh `public/images/`, Apps Script `?sheet=`, và `WORKFLOW.md`) lên remote cá nhân `personal` (`https://github.com/thinhnguyen42/web_viet_nhat.git`) bằng `git push -u personal vija`:
   - Tạo mới `vija -> vija` trên `personal` (commit `d36ae95`, cập nhật tiếp nhật ký Session 10).
   - Thiết lập tracking `vija` -> `personal/vija`.
