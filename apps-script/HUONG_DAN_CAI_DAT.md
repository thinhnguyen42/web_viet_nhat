# Hướng dẫn cài đặt & quản trị nội dung Website qua Google Sheet

File mã nguồn Google Apps Script đã được chuẩn bị sẵn tại: [`apps-script/Code.gs`](file:///D:/Học%20tập/Web_Viet_Nhat/apps-script/Code.gs)

Link Apps Script của bạn:
`https://script.google.com/home/projects/1Vw03BfXfgtozhiYZbvryJj-DvwAttxm53UQ4UN2titecCo7-il1bGjWG/edit`

---

## Phần 1: Cài đặt mã nguồn lên Apps Script

### Bước 1: Mở Google Sheet gắn với Apps Script
1. Mở Google Sheet bạn đang gắn với project Apps Script trên (hoặc mở trực tiếp link Apps Script rồi bấm biểu tượng Google Sheet nếu là container-bound script).
2. Nếu mở từ Google Sheet: vào **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.

### Bước 2: Dán mã nguồn `Code.gs`
1. Xóa toàn bộ mã cũ trong file `Code.gs` / `Mã.gs` trên trình duyệt Apps Script.
2. Copy toàn bộ nội dung file [`apps-script/Code.gs`](file:///D:/Học%20tập/Web_Viet_Nhat/apps-script/Code.gs) trong repo này và dán vào.
3. Nhấn `Ctrl + S` để lưu.

### Bước 3: Khởi tạo sẵn 6 Tab dữ liệu mẫu
1. Trên thanh công cụ Apps Script (phía trên trình soạn thảo), ở ô chọn hàm bên cạnh nút **Chạy (Run)**, chọn hàm **`initAllSampleSheets`**.
2. Bấm **Chạy (Run)** và cấp quyền cho phép script thao tác Google Sheet của bạn.
3. Quay lại trang Google Sheet và nhấn F5 — bạn sẽ thấy đầy đủ **6 tab** được tạo sẵn dữ liệu từ website:
   - `CauHinh_TrangWeb`: Tiêu đề Hero, 4 con số thống kê, nội dung Giới thiệu (About), Banner CTA, Địa chỉ / SĐT / Email / Giờ làm việc / Mạng xã hội.
   - `ChuongTrinh_TraoDoi`: Danh sách chương trình trao đổi, học bổng, tiếng Nhật học thuật.
   - `TinTuc_HocThuat`: Danh sách tin tức, thông báo, hội thảo.
   - `DoiNgu_GiangVien`: Hội đồng cố vấn & giảng viên.
   - `Don_Dang_Ky`: Tự động lưu hồ sơ sinh viên nộp từ trang `/admissions`.
   - `Lien_He`: Tự động lưu câu hỏi sinh viên/phụ huynh gửi từ trang `/contact`.
4. Đồng thời trên thanh menu của Google Sheet sẽ xuất hiện mục **🎓 Quản trị Web Việt - Nhật** gồm 3 nút tiện ích:
   - **Khởi tạo / Đồng bộ đủ 6 Sheet mẫu**
   - **Tự động tạo Slug (Cho dòng trống)**
   - **Xóa Cache API ngay**

### Bước 4: Triển khai Web App (Deploy / Update)
1. Bấm **Triển khai (Deploy)** ➔ **Quản lý các bản triển khai (Manage deployments)** (nếu đã từng deploy) hoặc **Tạo bản triển khai mới (New deployment)**.
   - *Lưu ý:* Nếu đã từng deploy trước đó và muốn giữ nguyên URL cũ đang gắn trong `.env.local`, chọn biểu tượng **Chỉnh sửa (hình cây bút)** ở deployment đang chạy ➔ ở mục Version chọn **Phiên bản mới (New version)** ➔ bấm **Triển khai (Deploy)**.
2. Đảm bảo thiết lập:
   - **Loại (Type):** Ứng dụng web (Web app)
   - **Thực thi dưới dạng (Execute as):** `Tôi (Me)`
   - **Ai có quyền truy cập (Who has access):** **`Bất kỳ ai (Anyone)`**
3. Copy URL dạng `https://script.google.com/macros/s/.../exec` kiểm tra khớp với file [`.env.local`](file:///D:/Học%20tập/Web_Viet_Nhat/.env.local):
   ```env
   NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbyKdpH9cqyTtdeaJtojURFuvin8sPd2LpIQ3nXA0cUqACfsVivV4XpvQn0-_I4M3JA/exec
   ```
   *(Nếu URL thay đổi sau khi tạo deployment mới, cập nhật lại `.env.local` và chạy `pnpm build` lại một lần).*

---

## Phần 2: Cách thêm & sửa nội dung trên Google Sheet

1. **Quy tắc 3 ngôn ngữ thông minh:**
   - Bạn **chỉ bắt buộc điền cột Tiếng Việt** (`_vi`).
   - Nếu để trống cột Tiếng Nhật (`_ja`) hoặc Tiếng Anh (`_en`), website sẽ **tự động lấy nội dung Tiếng Việt** thay thế, không bị trống chữ.
2. **Cách thêm một Chương trình hoặc Tin tức mới:**
   - Thêm 1 dòng mới ở cuối tab `ChuongTrinh_TraoDoi` hoặc `TinTuc_HocThuat`.
   - Cột `slug` có thể tự nhập (ví dụ `hoc-bong-osaka-2027`) hoặc để trống rồi bấm menu **🎓 Quản trị Web Việt - Nhật ➔ Tự động tạo Slug** (hoặc website cũng tự sinh slug từ `title_vi`).
   - Cột `status`: nhập `TRUE` để hiển thị, hoặc đổi thành `FALSE` để tạm ẩn mà không cần xóa dòng.
   - Cột `features` (ở tab Chương trình): nhập các gạch đầu dòng cách nhau bằng dấu `|` (VD: `Miễn 100% học phí | Trợ cấp 80.000 Yên/tháng`).
   - Cột `content_vi` (ở tab Tin tức): nhấn `Alt + Enter` trong ô Google Sheet để xuống đoạn văn mới.
3. **Cập nhật ngay lập tức trên Web:**
   - Apps Script cache JSON trong **60 giây** để bảo vệ Google Sheet khỏi quá tải.
   - Sau khi vừa sửa Sheet, nếu muốn xem kết quả ngay lập tức trên website mà không chờ 60 giây:
     1. Trong Google Sheet bấm menu **🎓 Quản trị Web Việt - Nhật ➔ Xóa Cache API ngay**.
     2. Mở website kèm `?refresh=1` (ví dụ `http://localhost:3000/?refresh=1`), trình duyệt sẽ ép lấy dữ liệu mới nhất từ Sheet.
