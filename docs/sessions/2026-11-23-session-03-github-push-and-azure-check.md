# Session 03 — Đẩy mã nguồn lên GitHub & Kiểm tra trạng thái Azure VM (`ZaloOaBot`)

- **Ngày:** 2026-11-23
- **Kho lưu trữ GitHub:** `https://github.com/thinhnguyen42/web_viet_nhat.git` (nhánh `main`)

---

## 1. Công việc đã thực hiện

1. **Kiểm tra trạng thái máy chủ Azure for Students (`ZaloOaBot`):**
   - Đọc kết quả `pm2 list`:
     - `cf-tunnel` (`id: 1`, `fork`, `↺ 0`, `online`, `29.3 MB` RAM, `0%` CPU): tunnel cho Zalo OA đang ổn định liên tục, không bị restart.
     - `zalo-chatbot` (`id: 0`, `cluster`, `↺ 21`, `online`, `60.8 MB` RAM, `0%` CPU): đang hoạt động bình thường.
     - Tài nguyên máy chủ: `cpu: 0.3%`, `ram usage: 41.3%` — còn dư ~58.7% RAM, đủ để chạy song song `web-viet-nhat` (static serve ~25–30 MB) và `cf-web-vietnhat` (`cloudflared` ~29 MB) ở cổng riêng `3005`.
   - Khuyến nghị vận hành an toàn: build thư mục tĩnh `out/` trên máy local rồi `scp` lên `~/web-viet-nhat/` thay vì chạy `next build` trực tiếp trên Azure VM để tránh tăng đột biến RAM làm ảnh hưởng `zalo-chatbot`.
2. **Dọn dẹp & Đẩy mã nguồn lên GitHub:**
   - Xóa artifact test cũ trong `test-results/`, giữ sạch working tree.
   - Đổi tên nhánh mặc định sang `main` (khớp trigger `branches: [main]` trong `.github/workflows/deploy.yml`).
   - Gắn remote `origin` trỏ tới `https://github.com/thinhnguyen42/web_viet_nhat.git`, commit toàn bộ mã nguồn, tài liệu và push lên nhánh `main`.
