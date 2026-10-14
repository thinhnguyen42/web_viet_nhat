import { test, expect } from "@playwright/test";

test.describe("Website Học Thuật & Trao Đổi Du Học Sinh Việt - Nhật", () => {
  test("1. Trang chủ tải thành công và hiển thị nhận diện Việt - Nhật", async ({ page }) => {
    await page.goto("/");
    // Kiểm tra tiêu đề chính
    await expect(page.locator("h1")).toContainText("Trung Tâm Hợp Tác Học Thuật Việt - Nhật");
    // Kiểm tra cờ và thông điệp hợp tác
    await expect(page.locator("body")).toContainText("VIỆT NAM • NHẬT BẢN");
    // Kiểm tra trường đối tác Nhật Bản
    await expect(page.locator("body")).toContainText("The University of Tokyo");
    await expect(page.locator("body")).toContainText("Kyoto University");
  });

  test("2. Chuyển đổi ngôn ngữ sang Tiếng Nhật (日本語) và Tiếng Anh (EN)", async ({ page }) => {
    await page.goto("/");
    // Bấm nút chuyển sang Tiếng Nhật (🇯🇵 日)
    await page.click('button:has-text("🇯🇵 日")');
    // Kiểm tra giao diện cập nhật sang Tiếng Nhật
    await expect(page.locator("h1")).toContainText("日越学術協力センター");
    await expect(page.locator("body")).toContainText("ベトナムと日本の学術研究・留学生交流をつなぐ架け橋");
    await expect(page.locator("nav")).toContainText("交換留学プログラム");
    await expect(page.locator("nav")).toContainText("学術ニュース");

    // Bấm nút chuyển sang Tiếng Anh (🇬🇧 EN)
    await page.click('button:has-text("🇬🇧 EN")');
    await expect(page.locator("h1")).toContainText("Vietnam - Japan Academic Center");

    // Bấm quay lại Tiếng Việt (🇻🇳 VI)
    await page.click('button:has-text("🇻🇳 VI")');
    await expect(page.locator("h1")).toContainText("Trung Tâm Hợp Tác Học Thuật Việt - Nhật");
  });

  test("3. Trang chương trình trao đổi sinh viên hiển thị đầy đủ", async ({ page }) => {
    await page.goto("/programs");
    // Kiểm tra danh sách chương trình
    await expect(page.locator("body")).toContainText("ĐH Tokyo");
    await expect(page.locator("body")).toContainText("ĐH Kyoto");
    await expect(page.locator("body")).toContainText("Học bổng trao đổi sinh viên JASSO");
    await expect(page.locator("body")).toContainText("Học bổng Chính phủ Nhật Bản (MEXT)");
  });

  test("4. Trang tin tức học thuật & du học hiển thị các bài viết mới", async ({ page }) => {
    await page.goto("/news");
    await expect(page.locator("body")).toContainText("Thông báo tuyển chọn sinh viên tham gia chương trình trao đổi tại Nhật Bản");
    await expect(page.locator("body")).toContainText("Hội thảo quốc tế: Hợp tác nghiên cứu & Chuyển giao công nghệ Việt Nam - Nhật Bản");
  });

  test("5. Form nộp hồ sơ / đăng ký xét tuyển trực tuyến hoạt động", async ({ page }) => {
    await page.goto("/admissions");
    // Điền form đăng ký
    await page.fill('input[name="fullName"]', "Trần Văn An");
    await page.fill('input[name="email"]', "an.tran@example.com");
    await page.fill('input[name="phone"]', "0987654321");
    await page.selectOption('select[name="program"]', { index: 1 });
    await page.fill('textarea[name="message"]', "Em đạt JLPT N2, GPA 3.4 và muốn đăng ký trao đổi tại ĐH Tokyo.");

    // Bấm nút nộp đơn
    await page.click('button[type="submit"]');

    // Chờ thông báo thành công xuất hiện
    await expect(page.locator("body")).toContainText("Đăng ký thành công!");
  });
});
