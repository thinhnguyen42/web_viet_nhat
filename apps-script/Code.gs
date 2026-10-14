/**
 * Google Apps Script Backend for Vietnam - Japan Academic & Student Exchange Website
 * Gắn với Google Sheet làm cơ sở dữ liệu
 */

// Tên các trang tính mặc định trong Google Sheet
const SHEET_NAMES = {
  PROGRAMS: "ChuongTrinh_TraoDoi",
  NEWS: "TinTuc_HocThuat",
  APPLICATIONS: "Don_Dang_Ky"
};

/**
 * Xử lý yêu cầu GET: Lấy dữ liệu chương trình du học hoặc tin tức dạng JSON
 * Ví dụ gọi: 
 *   GET https://script.google.com/.../exec?action=programs
 *   GET https://script.google.com/.../exec?action=news
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "programs";
    
    let targetSheetName = SHEET_NAMES.PROGRAMS;
    if (action === "news") {
      targetSheetName = SHEET_NAMES.NEWS;
    }

    let sheet = ss.getSheetByName(targetSheetName);
    
    // Nếu chưa có sheet, tự động khởi tạo dữ liệu mẫu
    if (!sheet) {
      sheet = initSampleSheet(ss, targetSheetName);
    }

    const data = getSheetDataAsJson(sheet);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      action: action,
      total: data.length,
      data: data
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Xử lý yêu cầu POST: Tiếp nhận đơn đăng ký tư vấn / du học từ website
 * Body: { fullName, email, phone, program, japaneseLevel, message }
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let appSheet = ss.getSheetByName(SHEET_NAMES.APPLICATIONS);

    // Tạo sheet Applications nếu chưa có
    if (!appSheet) {
      appSheet = ss.insertSheet(SHEET_NAMES.APPLICATIONS);
      appSheet.appendRow([
        "Thời gian đăng ký",
        "Họ và tên",
        "Email",
        "Số điện thoại",
        "Chương trình quan tâm",
        "Trình độ tiếng Nhật",
        "Lời nhắn / Nguyện vọng"
      ]);
      // Định dạng header
      appSheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#1e3a8a").setFontColor("#ffffff");
    }

    let payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    const row = [
      timestamp,
      payload.fullName || payload.name || "",
      payload.email || "",
      payload.phone || "",
      payload.program || "Trao đổi sinh viên Việt - Nhật",
      payload.japaneseLevel || payload.level || "Chưa có",
      payload.message || ""
    ];

    appSheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Gửi thông tin đăng ký thành công!",
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Tiện ích: Đọc toàn bộ bảng tính và chuyển thành mảng Object (dựa trên hàng tiêu đề)
 */
function getSheetDataAsJson(sheet) {
  const range = sheet.getDataRange();
  const values = range.getValues();
  if (values.length <= 1) return [];

  const headers = values[0];
  const rows = values.slice(1);

  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

/**
 * Tiện ích: Khởi tạo bảng mẫu có sẵn dữ liệu du học & tin tức Việt - Nhật
 */
function initSampleSheet(ss, sheetName) {
  const sheet = ss.insertSheet(sheetName);

  if (sheetName === SHEET_NAMES.PROGRAMS) {
    sheet.appendRow([
      "id", "slug", "title", "university", "location", "duration", "scholarship", "requirement", "deadline"
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#1e3a8a").setFontColor("#ffffff");
    sheet.appendRow([
      "VN-JP-01", "trao-doi-dai-hoc-tokyo", "Chương trình trao đổi học thuật ĐH Tokyo (UTokyo)", "Đại học Tokyo", "Tokyo, Nhật Bản", "1 - 2 học kỳ", "Học bổng JASSO 80,000 JPY/tháng", "JLPT N2 hoặc IELTS 6.5, GPA >= 3.2", "30/11/2026"
    ]);
    sheet.appendRow([
      "VN-JP-02", "trao-doi-dai-hoc-kyoto", "Trao đổi sinh viên xuất sắc ĐH Kyoto (KyotoU)", "Đại học Kyoto", "Kyoto, Nhật Bản", "1 năm học", "Học bổng MEXT / JASSO", "JLPT N2, GPA >= 3.0", "15/12/2026"
    ]);
    sheet.appendRow([
      "VN-JP-03", "trao-doi-dai-hoc-osaka", "Chương trình nghiên cứu văn hóa & ngôn ngữ ĐH Osaka", "Đại học Osaka", "Osaka, Nhật Bản", "1 học kỳ", "Miễn 100% học phí + Trợ cấp", "JLPT N3 trở lên, GPA >= 2.8", "20/01/2027"
    ]);
  } else if (sheetName === SHEET_NAMES.NEWS) {
    sheet.appendRow([
      "id", "slug", "title", "category", "date", "summary", "content"
    ]);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#1e3a8a").setFontColor("#ffffff");
    sheet.appendRow([
      "NEWS-01", "thong-bao-hoc-bong-jasso-2027", "Thông báo tuyển sinh học bổng trao đổi sinh viên JASSO Nhật Bản 2027", "Học bổng", "2026-10-10", "Cơ hội nhận trợ cấp 80,000 yên/tháng dành cho sinh viên tham gia chương trình trao đổi tại các trường đối tác Nhật Bản.", "Chi tiết điều kiện nộp hồ sơ, quy trình xét tuyển và phỏng vấn trực tiếp cùng đại diện các trường đại học đối tác Nhật Bản."
    ]);
    sheet.appendRow([
      "NEWS-02", "hoi-thao-hoc-thuat-viet-nhat", "Hội thảo quốc tế: Hợp tác học thuật và chuyển giao tri thức Việt Nam - Nhật Bản", "Hội thảo", "2026-10-05", "Tọa đàm chuyên đề cùng các giáo sư đến từ ĐH Tokyo và ĐH Osaka về cơ hội nghiên cứu song phương.", "Hội thảo diễn ra trực tiếp tại hội trường kết hợp trực tuyến qua Zoom với sự tham gia của hơn 200 học giả và sinh viên."
    ]);
  }

  return sheet;
}
