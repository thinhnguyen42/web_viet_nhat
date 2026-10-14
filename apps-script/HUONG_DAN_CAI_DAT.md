# Hướng dẫn kết nối Google Apps Script & Google Sheet

File mã nguồn Google Apps Script đã được chuẩn bị sẵn tại: [`apps-script/Code.gs`](file:///D:/H%E1%BB%8Dc%20t%E1%BA%ADp/Web_Viet_Nhat/apps-script/Code.gs)

---

### Bước 1: Mở Google Sheet và Apps Script
1. Mở trang Google Sheet mà bạn muốn lưu dữ liệu (hoặc tạo một Google Sheet mới trên Google Drive của bạn).
2. Trên thanh menu của Google Sheet, bấm vào: **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.
   *(Hoặc bạn có thể mở trực tiếp link Apps Script của bạn: `https://script.google.com/u/0/home/projects/1Vw03BfXfgtozhiYZbvryJj-DvwAttxm53UQ4UN2titecCo7-il1bGjWG/edit`)*

---

### Bước 2: Dán mã nguồn `Code.gs`
1. Xóa toàn bộ nội dung mặc định trong file `Mã.gs` (hoặc `Code.gs`).
2. Sao chép toàn bộ nội dung trong file [`apps-script/Code.gs`](file:///D:/H%E1%BB%8Dc%20t%E1%BA%ADp/Web_Viet_Nhat/apps-script/Code.gs) và dán vào.
3. Bấm biểu tượng đĩa mềm hoặc tổ hợp phím `Ctrl + S` để lưu lại.

---

### Bước 3: Triển khai thành Web App (Deploy)
1. Ở góc trên bên phải giao diện Apps Script, bấm vào nút xanh **Triển khai (Deploy)** ➔ Chọn **Quản lý bản triển khai (New deployment)**.
2. Bấm vào biểu tượng bánh răng bên cạnh "Select type" ➔ Chọn **Ứng dụng web (Web app)**.
3. Điền các thông tin:
   - **Mô tả (Description):** `Vietnam-Japan Academic API v1`
   - **Thực thi dưới dạng (Execute as):** `Tôi (Me - your email)`
   - **Người có quyền truy cập (Who has access):** **Bất kỳ ai (Anyone)** *(Rất quan trọng: Phải chọn Anyone để website gửi và nhận được dữ liệu không bị chặn quyền).*
4. Bấm nút **Triển khai (Deploy)**.
5. Google sẽ hiện hộp thoại yêu cầu cấp quyền:
   - Bấm **Ủy quyền truy cập (Review Permissions)**.
   - Chọn tài khoản Google của bạn.
   - Nếu thấy cảnh báo "Google chưa xác minh ứng dụng này", bấm **Nâng cao (Advanced)** ➔ Chọn **Đi tới ... (không an toàn)** ➔ Bấm **Cho phép (Allow)**.

---

### Bước 4: Lấy URL Web App và cấu hình vào Website
1. Sau khi Deploy thành công, Google sẽ cung cấp cho bạn một đường link có dạng:
   ```text
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
2. Bạn mở file [`.env.local`](file:///D:/H%E1%BB%8Dc%20t%E1%BA%ADp/Web_Viet_Nhat/.env.local) trong dự án web và dán URL này vào:
   ```env
   NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. Website sẽ tự động:
   - Lấy danh sách chương trình du học và tin tức học thuật từ Sheet về hiển thị.
   - Tự động ghi nhận thông tin học sinh/sinh viên nộp form đăng ký vào sheet `Don_Dang_Ky`.
