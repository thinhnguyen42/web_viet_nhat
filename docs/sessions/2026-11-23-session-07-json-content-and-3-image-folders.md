# Session 07 — Tách toàn bộ nội dung ra JSON (`src/content/`), 3 thư mục ảnh & React `.map()`

- **Ngày:** 2026-11-23
- **Tham chiếu:** `D:\Học tập\Web_Viet_Nhat\HD` (ảnh hướng dẫn cấu trúc `home`, `about`, `programs`, `news`, `faculty` và tách nội dung không hard-code trong JSX)

---

## 1. Kiến trúc mới đã triển khai

### A. Tách sạch nội dung khỏi HTML/JSX sang 7 file JSON (`src/content/`)
- **`src/content/site.json`**: Thông tin thương hiệu (`brand`), `siteConfig`, danh sách ngôn ngữ (`languages`), `navItems`, `footerPrograms`, `mapEmbedUrl`.
- **`src/content/home.json`**: Dữ liệu cấu trúc trang chủ (`hero`, `features`, `stats`, `partners`).
- **`src/content/pages.json`**: Toàn bộ text & cấu trúc của `/about` (`highlights`, `heritageImage`, fallbacks), `/faculty`, `/programs` (`filters`, `categoryBadges`, `detail`, `objectives`), `/news` (`detail`), `/admissions` (`timelineSteps`, `faqs`, form placeholders/messages), `/contact`, và `notFound`.
- **`src/content/i18n.json`**: Từ điển đa ngôn ngữ `vi`, `ja`, `en`.
- **`src/content/programs.json`**, **`src/content/news.json`**, **`src/content/faculty.json`**: Dữ liệu dự phòng mặc định kèm đường dẫn ảnh.
- Các file `src/data/*.ts` chuyển thành layer re-export có type từ `@/content/*.json`.

### B. 3 thư mục ảnh chuẩn hóa dưới `public/images/`
1. **`public/images/website/`**: `hero-emblem.svg`, `feature-exchange.svg`, `feature-scholarship.svg`, `feature-japanese.svg`
2. **`public/images/introductions/`**: `about-heritage.svg`, `faculty-avatar.svg`
3. **`public/images/programs-news/`**: `program-exchange.svg`, `program-scholarship.svg`, `program-japanese.svg`, `news-announcement.svg`, `news-event.svg`, `news-scholarship.svg`

Mọi đường dẫn ảnh đều khai báo trong JSON (và cho phép ghi đè từ cột `image` trên Google Sheet).

### C. Render React qua `.map()` & `next/image`
- Toàn bộ danh sách và khối lặp trong `Header`, `Footer`, `HeroSection`, `FeatureGrid`, `StatsCounter`, `LatestNews`, `PartnersSection`, `AboutPage`, `FacultyPage`, `ProgramsPage`, `ProgramDetailClient`, `NewsPage`, `NewsDetailClient`, `AdmissionsPage`, `ContactPage` đều render bằng `.map()` từ JSON/Google Sheet.
- Sử dụng `next/image` (`unoptimized`) tương thích với `output: "export"` và mọi link ảnh ngoài từ Google Sheet, đạt **0 cảnh báo `@next/next/no-img-element`**.
- `src/lib/appsScriptApi.ts` hỗ trợ thêm cột `"content VI"`, `"content EN"`, `"excerpt VI"`, `"excerpt EN"` khớp ảnh chụp bảng tính trong `HD/`.

---

## 2. Kết quả kiểm tra (Verification)

- **`pnpm lint`:** **0 errors, 0 warnings** (exit code 0).
- **`pnpm build`:** **Passed** (compile `2.1s`, TypeScript `4.1s`, sinh **23/23 static pages** vào `out/`).
- **`npx playwright test`:** **8/8 passed** (`14.5s`), 0 failures.
- **Preview Server:** Đang chạy tại `http://localhost:3000`.
