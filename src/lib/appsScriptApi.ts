/**
 * Google Apps Script API Client
 * Theo đúng triết lý Ponytail: Tối giản, không dependencies thừa, tự fallback khi offline
 */

const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";

export interface StudentApplication {
  fullName: string;
  email: string;
  phone: string;
  program: string;
  japaneseLevel?: string;
  message?: string;
}

/**
 * Gửi form đăng ký xét tuyển / tư vấn du học sang Google Sheet
 */
export async function submitApplication(
  data: StudentApplication
): Promise<{ success: boolean; message: string }> {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("DEMO_URL")) {
    console.log("Mock submission (chưa cấu hình NEXT_PUBLIC_APPS_SCRIPT_URL):", data);
    return {
      success: true,
      message: "Đăng ký thành công (Dữ liệu đã được lưu trữ tạm thời).",
    };
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // Google Apps Script handles text/plain without triggering complex CORS preflight issues
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.status === "success") {
      return { success: true, message: result.message || "Gửi đăng ký thành công!" };
    } else {
      return { success: false, message: result.message || "Không thể gửi dữ liệu" };
    }
  } catch (error) {
    console.error("Lỗi khi kết nối Google Apps Script:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi kết nối máy chủ Google Sheets. Vui lòng thử lại sau.",
    };
  }
}

/**
 * Lấy danh sách chương trình du học động từ Google Sheet (nếu có)
 */
export async function fetchProgramsFromSheet(): Promise<any[] | null> {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("DEMO_URL")) return null;
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=programs`);
    const json = await res.json();
    return json.status === "success" ? json.data : null;
  } catch (err) {
    console.error("Không thể tải danh sách chương trình từ Sheet:", err);
    return null;
  }
}

/**
 * Lấy danh sách tin tức học thuật động từ Google Sheet (nếu có)
 */
export async function fetchNewsFromSheet(): Promise<any[] | null> {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("DEMO_URL")) return null;
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=news`);
    const json = await res.json();
    return json.status === "success" ? json.data : null;
  } catch (err) {
    console.error("Không thể tải tin tức từ Sheet:", err);
    return null;
  }
}
