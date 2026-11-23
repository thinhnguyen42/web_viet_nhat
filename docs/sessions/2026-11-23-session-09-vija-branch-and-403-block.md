# Session 09: Tạo nhánh `vija` & Ghi nhận lỗi quyền đẩy lên `Smart-Home-SH/demowebou.git`

- **Ngày:** 23/11/2026
- **Nhánh hiện tại:** `vija` (tạo từ `webvn` tại commit `640fc8a`)
- **Nhánh `main`:** Giữ nguyên tại commit `198391e` (không merge)
- **Trạng thái:** Nhánh `vija` đã sẵn sàng ở local; `git push -u origin vija` bị chặn do lỗi `HTTP 403`.

## 1. Công việc đã thực hiện

1. Tạo nhánh mới `vija` từ nhánh `webvn` (`640fc8a`) bằng lệnh `git checkout -B vija`, đảm bảo không chạm hoặc merge vào `main` (`198391e`).
2. Thực hiện đẩy nhánh `vija` lên remote `origin` (`https://github.com/Smart-Home-SH/demowebou.git`):
   ```text
   remote: Write access to repository not granted.
   fatal: unable to access 'https://github.com/Smart-Home-SH/demowebou.git/': The requested URL returned error: 403
   ```
3. Kiểm tra cấu hình xác thực hiện tại trên máy (`git config user.name`, `git config user.email`, `gh auth status`):
   - `user.name`: `thinhnguyen.42`
   - `user.email`: `thinhnguyen.422005@gmail.com`
   - `gh auth status`: Đang đăng nhập tài khoản GitHub `thinhnguyen42` (`keyring`, `Active account: true`, protocol `https`, scopes `'gist', 'project', 'read:org', 'repo', 'workflow'`).

## 2. Nguyên nhân & Hướng mở khóa

- Tài khoản GitHub đang đăng nhập (`thinhnguyen42`) chưa được cấp quyền **Write** trên repository `Smart-Home-SH/demowebou.git`.
- Cách xử lý:
  1. Chủ repository `Smart-Home-SH/demowebou` cấp quyền **Write** (hoặc gửi/chấp nhận lời mời collaborator/org) cho tài khoản `thinhnguyen42`, **hoặc** chạy `gh auth login` bằng tài khoản có quyền ghi vào `Smart-Home-SH/demowebou`.
  2. Sau khi có quyền, chạy `git push -u origin vija`.
  3. (Tùy chọn) Có thể đẩy bản dự phòng lên remote cá nhân `personal` (`https://github.com/thinhnguyen42/web_viet_nhat.git`) bằng `git push -u personal vija`.
