# Hướng dẫn cài đặt & tự động điền dữ liệu Google Sheet CMS

- **Google Sheet của bạn:** `https://docs.google.com/spreadsheets/d/1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU/edit?gid=0#gid=0`
- **Google Apps Script của bạn:** `https://script.google.com/home/projects/1Vw03BfXfgtozhiYZbvryJj-DvwAttxm53UQ4UN2titecCo7-il1bGjWG/edit`
- **Mã nguồn chuẩn để dán vào Apps Script:** [`apps-script/Code.gs`](file:///D:/Học%20tập/Web_Viet_Nhat/apps-script/Code.gs)

---

## Phần 1: Cài đặt & tự động điền dữ liệu vào Google Sheet (1 lần duy nhất)

1. Mở link Apps Script:
   `https://script.google.com/home/projects/1Vw03BfXfgtozhiYZbvryJj-DvwAttxm53UQ4UN2titecCo7-il1bGjWG/edit`
2. Xóa toàn bộ code cũ, copy toàn bộ nội dung file [`apps-script/Code.gs`](file:///D:/Học%20tập/Web_Viet_Nhat/apps-script/Code.gs) và dán vào, rồi bấm **`Ctrl + S`**.
   *(Mã nguồn đã gắn sẵn ID Google Sheet `1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU` của bạn).*
3. Trên thanh công cụ phía trên của Apps Script, ở ô chọn hàm bên cạnh nút **Chạy (Run)**, chọn **`khoiTaoTatCaDuLieuVietNhat`** rồi bấm **Chạy (Run)** (cấp quyền truy cập Google Sheet nếu Google hỏi).
4. Mở lại Google Sheet `1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU` và bấm F5 — toàn bộ **8 tab** đã được tạo và điền sẵn dữ liệu Việt - Nhật chuẩn:
   - `home`: Tiêu đề, nút bấm, khẩu hiệu, thống kê, địa chỉ/SĐT/email, mạng xã hội (`key | vi | ja | en | note`)
   - `about`: Giới thiệu, sứ mệnh, tầm nhìn, lịch sử (`key | vi | ja | en | note`)
   - `programs`: Danh sách chương trình trao đổi, học bổng, tiếng Nhật
   - `news`: Tin tức, thông báo, hội thảo
   - `faculty`: Đội ngũ giảng viên & cố vấn
   - `partners`: Danh sách các trường đại học đối tác tại Nhật Bản
   - `admissions`: Nơi tự động lưu hồ sơ từ trang `/admissions`
   - `contact`: Nơi tự động lưu thắc mắc từ trang `/contact`
5. Bấm **Triển khai (Deploy)** ➔ **Quản lý các bản triển khai (Manage deployments)** ➔ bấm biểu tượng **Chỉnh sửa (cây bút)** ➔ Version chọn **Phiên bản mới (New version)** ➔ **Triển khai (Deploy)** *(để giữ nguyên URL trong [`.env.local`](file:///D:/Học%20tập/Web_Viet_Nhat/.env.local))*.

---

## Phần 2: Cách người không rành code chỉnh sửa nội dung trên Google Sheet

- **Sửa chữ trên Trang chủ / Giới thiệu / Liên hệ:** Vào tab `home` hoặc `about`, tìm dòng có `key` tương ứng (ví dụ `main_title`, `subtitle`, `badge`, `contact_phone`) và sửa trực tiếp ở cột `vi`, `ja`, `en` (nếu bỏ trống `ja`/`en`, web tự lấy `vi`).
- **Thêm trường đại học đối tác Nhật Bản:** Vào tab `partners`, thêm 1 dòng tên trường (cột `status` là `TRUE`).
- **Thêm / sửa Chương trình hoặc Tin tức mới:** Thêm dòng ở cuối tab `programs` hoặc `news`. Có thể bỏ trống cột `slug` rồi bấm menu **🎓 Quản trị Web Việt - Nhật ➔ Tự động tạo Slug**.
- **Ẩn tạm một dòng mà không cần xóa:** Đổi cột `status` thành `FALSE`.
- **Kiểm tra API trả về trực tiếp:**
  - `?sheet=home` → trả mảng JSON của tab `home`
  - `?sheet=programs` → trả mảng JSON của tab `programs` (tách `features` thành mảng)
  - `?sheet=news` → trả mảng JSON của tab `news`
  - `?sheet=all` → trả toàn bộ dữ liệu tất cả các tab trong 1 request
- **Xem thay đổi ngay lập tức:** Bấm menu **🎓 Quản trị Web Việt - Nhật ➔ Xóa Cache API ngay**, sau đó mở web kèm `?refresh=1` (ví dụ `http://localhost:3000/?refresh=1`).
