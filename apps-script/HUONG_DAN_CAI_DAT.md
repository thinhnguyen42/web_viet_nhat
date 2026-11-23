# Hướng dẫn cài đặt Google Sheet CMS (Sửa trực tiếp trên Sheet, không cần mở Apps Script)

- **Google Sheet:** `https://docs.google.com/spreadsheets/d/1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU/edit?gid=0#gid=0`
- **Apps Script:** `https://script.google.com/home/projects/1Vw03BfXfgtozhiYZbvryJj-DvwAttxm53UQ4UN2titecCo7-il1bGjWG/edit`
- **Mã nguồn Apps Script:** [`apps-script/Code.gs`](file:///D:/Học%20tập/Web_Viet_Nhat/apps-script/Code.gs)

---

## Cài đặt đúng 1 lần duy nhất

1. Mở link Apps Script ở trên, xóa code cũ, copy toàn bộ file [`apps-script/Code.gs`](file:///D:/Học%20tập/Web_Viet_Nhat/apps-script/Code.gs) dán vào và lưu (`Ctrl + S`).
2. Trên thanh công cụ Apps Script, chọn hàm **`khoiTaoTatCaDuLieuVietNhat`** ➔ bấm **Chạy (Run)** (chấp nhận cấp quyền Google Sheet).
   - Hàm này sẽ tự tạo và điền sẵn đủ **8 tab** vào đúng Google Sheet `1v-WuSh5M3V1az6970Y8sP6OhOUoAeTYhHy6MS73zVRU` của bạn:
     `home`, `about`, `programs`, `news`, `faculty`, `partners`, `admissions`, `contact`.
3. Bấm **Triển khai (Deploy)** ➔ **Quản lý các bản triển khai (Manage deployments)** ➔ bấm **Chỉnh sửa (cây bút)** ➔ chọn **Phiên bản mới (New version)** ➔ **Triển khai (Deploy)** (`Execute as: Me`, `Who has access: Anyone`).

---

## Từ đó về sau: Chỉ cần mở Google Sheet để sửa, KHÔNG bao giờ phải mở lại Apps Script

- `doGet(e)` đọc trực tiếp từ Google Sheet (không lưu `CacheService`), và website cũng gọi `cache: "no-store"`.
- Bạn sửa ô nào trên tab `home`, `about`, `programs`, `news`, `faculty`, `partners` ➔ bấm **F5 tải lại trang web là thấy thay đổi ngay lập tức**.
- Tên cột hỗ trợ linh hoạt theo chuẩn quen thuộc từ `webviethann`:
  - **`home`**: `key | vi | ja | en` (`badge`, `main_title`, `subtitle`, `btn_explore`, `btn_contact`, `card_title`, `card_subtitle`, `stat_students`, `section_news_title`, `btn_view_all`, `btn_read_more`...)
  - **`about`**: `Mã nội dung | Tiếng Việt | Tiếng Nhật | Tiếng Anh` (`tieu_de_chinh`, `phu_de`, `mo_ta_chinh`, `su_menh_tieu_de`, `su_menh_mo_ta`, `tam_nhin_tieu_de`, `tam_nhin_mo_ta`, `lich_su_tieu_de`, `lich_su_1`, `lich_su_2`)
  - **`faculty`**: `ID | Tên | Chức vụ VI | Chức vụ EN | Chuyên môn VI | Chuyên môn EN | Mô tả VI | Mô tả EN | Đơn vị VI | Đơn vị EN | Hiển thị` (`TRUE`/`FALSE`)
  - **`programs`**: `slug | category | title | titleJa | titleEn | description | descriptionJa | descriptionEn | duration | features` (dùng dấu `,` hoặc `|`)
  - **`news`**: `slug | category | date | featured | title | titleJa | titleEn | excerpt | excerptJa | excerptEn | content | contentJa | contentEn`
  - **`partners`**: `name | country | countryJa | countryEn | status | order`
