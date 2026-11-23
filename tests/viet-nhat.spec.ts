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
    await page.route("https://script.google.com/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "success",
          message: "Gửi thông tin đăng ký thành công!",
        }),
      });
    });

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

  test("6. Màn mở màn cổ điển Việt - Nhật hiển thị lần đầu, có thể bỏ qua và không lặp lại trong phiên", async ({ page }) => {
    await page.goto("/");

    const curtain = page.getByTestId("classical-curtain");
    await expect(curtain).toBeVisible();
    await expect(curtain).toContainText("日越");

    await page.getByTestId("curtain-skip").click();
    await expect(curtain).toHaveCount(0);

    const seenFlag = await page.evaluate(() => sessionStorage.getItem("vnj_curtain_seen"));
    expect(seenFlag).toBe("1");

    await page.reload();
    await expect(page.getByTestId("classical-curtain")).toHaveCount(0);
  });

  test("7. Các phần nội dung trang chủ lazy-load và hiển thị mượt mà khi cuộn trang", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.addInitScript(() => {
      sessionStorage.setItem("vnj_curtain_seen", "1");
    });

    await page.goto("/");
    const sections = page.getByTestId("lazy-reveal");
    await expect(sections.first()).toBeAttached();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(sections.last()).toHaveAttribute("data-revealed", "true");

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasOverflow).toBe(false);
    expect(errors).toEqual([]);
  });

  test("8. Google Sheet CMS đồng bộ bài viết mới và mở chi tiết qua route dự phòng", async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("vnj_curtain_seen", "1");
    });

    await page.route("https://script.google.com/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "success",
          action: "all",
          data: {
            config: [
              {
                key: "hero_title",
                value_vi: "Trung Tâm Việt - Nhật (Dữ Liệu Google Sheet)",
                value_ja: "",
                value_en: "",
              },
            ],
            programs: [],
            news: [
              {
                id: "NEWS-SHEET-01",
                slug: "su-kien-moi-tu-google-sheet",
                category: "announcement",
                date: "2026-11-23",
                featured: true,
                title_vi: "Thông báo mới cập nhật trực tiếp từ Google Sheet",
                excerpt_vi: "Nội dung tóm tắt đồng bộ thời gian thực.",
                content_vi: "Đoạn nội dung chi tiết 1 từ Google Sheet.\nĐoạn nội dung chi tiết 2 từ Google Sheet.",
                status: true,
              },
            ],
            faculty: [],
          },
        }),
      });
    });

    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Trung Tâm Việt - Nhật (Dữ Liệu Google Sheet)");

    await page.goto("/news");
    await expect(page.locator("body")).toContainText("Thông báo mới cập nhật trực tiếp từ Google Sheet");

    await page.click('a:has-text("Xem thêm")');
    await expect(page.locator("h1")).toContainText("Thông báo mới cập nhật trực tiếp từ Google Sheet");
    await expect(page.locator("body")).toContainText("Đoạn nội dung chi tiết 2 từ Google Sheet.");
  });
});
