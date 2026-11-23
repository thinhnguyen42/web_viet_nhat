/**
 * Google Apps Script Backend CMS for Vietnam - Japan Academic Center (Web_Viet_Nhat)
 * Hỗ trợ quản trị toàn bộ nội dung 3 ngôn ngữ (VI - JA - EN) qua 6 tab Google Sheet:
 *   1. CauHinh_TrangWeb   (Hero, Stats, About, CTA, Contact info)
 *   2. ChuongTrinh_TraoDoi (Chương trình trao đổi, học bổng, tiếng Nhật)
 *   3. TinTuc_HocThuat     (Tin tức, thông báo, hội thảo)
 *   4. DoiNgu_GiangVien    (Hội đồng cố vấn & giảng viên)
 *   5. Don_Dang_Ky         (Hồ sơ đăng ký từ /admissions)
 *   6. Lien_He             (Thắc mắc từ /contact)
 */

const SHEET_NAMES = {
  CONFIG: "CauHinh_TrangWeb",
  PROGRAMS: "ChuongTrinh_TraoDoi",
  NEWS: "TinTuc_HocThuat",
  FACULTY: "DoiNgu_GiangVien",
  APPLICATIONS: "Don_Dang_Ky",
  CONTACTS: "Lien_He",
};

const CACHE_KEY_ALL = "VNJ_CMS_ALL_V1";
const CACHE_TTL_SECONDS = 60;

/**
 * Tạo menu quản trị trực tiếp trên thanh công cụ Google Sheet
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🎓 Quản trị Web Việt - Nhật")
    .addItem("✨ Khởi tạo / Đồng bộ đủ 6 Sheet mẫu", "initAllSampleSheets")
    .addItem("🔗 Tự động tạo Slug (Cho dòng trống)", "fillMissingSlugs")
    .addItem("🧹 Xóa Cache API ngay", "clearApiCache")
    .addToUi();
}

/**
 * Xóa cache để website nhận thay đổi mới ngay lập tức
 */
function clearApiCache() {
  const cache = CacheService.getScriptCache();
  cache.remove(CACHE_KEY_ALL);
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Đã xóa cache API. Website sẽ lấy dữ liệu mới nhất ở lần tải tiếp theo.",
      "Web Việt - Nhật",
      4
    );
  } catch (err) {
    Logger.log(err);
  }
}

/**
 * Khởi tạo đủ 6 tab mẫu nếu chưa tồn tại (không ghi đè tab đã có dữ liệu)
 */
function initAllSampleSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEET_NAMES).forEach(function (k) {
    ensureSheet(ss, SHEET_NAMES[k]);
  });
  clearApiCache();
  try {
    ss.toast("Đã kiểm tra và khởi tạo đủ 6 tab Google Sheet cho Web Việt - Nhật.", "Hoàn tất", 5);
  } catch (err) {
    Logger.log(err);
  }
}

/**
 * Tự động tạo slug chuẩn URL cho các dòng còn trống cột slug ở tab Chương trình & Tin tức
 */
function fillMissingSlugs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  [SHEET_NAMES.PROGRAMS, SHEET_NAMES.NEWS].forEach(function (name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    const values = sheet.getDataRange().getValues();
    if (values.length <= 1) return;

    const headers = values[0];
    const slugCol = headers.indexOf("slug");
    const titleCol = headers.indexOf("title_vi");
    if (slugCol === -1 || titleCol === -1) return;

    for (let i = 1; i < values.length; i++) {
      const currentSlug = String(values[i][slugCol] || "").trim();
      const titleVi = String(values[i][titleCol] || "").trim();
      if (!currentSlug && titleVi) {
        sheet.getRange(i + 1, slugCol + 1).setValue(slugifyVietnamese(titleVi));
      }
    }
  });
  clearApiCache();
}

/**
 * Xử lý yêu cầu GET:
 *   ?action=all       -> Trả toàn bộ config, programs, news, faculty trong 1 JSON (khuyên dùng)
 *   ?action=programs  -> Chỉ lấy chương trình
 *   ?action=news      -> Chỉ lấy tin tức
 *   ?action=faculty   -> Chỉ lấy giảng viên
 *   ?action=config    -> Chỉ lấy cấu hình & nội dung About/Home/Contact
 *   &nocache=1        -> Bỏ qua CacheService 60s
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const params = (e && e.parameter) ? e.parameter : {};
    const action = params.action ? String(params.action) : "all";
    const noCache = params.nocache === "1" || params.nocache === "true";

    if (action === "all") {
      const cache = CacheService.getScriptCache();
      if (!noCache) {
        const cached = cache.get(CACHE_KEY_ALL);
        if (cached) {
          return jsonResponse(JSON.parse(cached));
        }
      }

      const payload = {
        status: "success",
        action: "all",
        updatedAt: new Date().toISOString(),
        data: {
          config: getSheetDataAsJson(ensureSheet(ss, SHEET_NAMES.CONFIG)),
          programs: getSheetDataAsJson(ensureSheet(ss, SHEET_NAMES.PROGRAMS)),
          news: getSheetDataAsJson(ensureSheet(ss, SHEET_NAMES.NEWS)),
          faculty: getSheetDataAsJson(ensureSheet(ss, SHEET_NAMES.FACULTY)),
        },
      };

      const serialized = JSON.stringify(payload);
      if (serialized.length < 95000) {
        cache.put(CACHE_KEY_ALL, serialized, CACHE_TTL_SECONDS);
      }
      return jsonResponse(payload);
    }

    const actionMap = {
      programs: SHEET_NAMES.PROGRAMS,
      news: SHEET_NAMES.NEWS,
      faculty: SHEET_NAMES.FACULTY,
      config: SHEET_NAMES.CONFIG,
    };

    const targetName = actionMap[action] || SHEET_NAMES.PROGRAMS;
    const sheet = ensureSheet(ss, targetName);
    const data = getSheetDataAsJson(sheet);

    return jsonResponse({
      status: "success",
      action: action,
      total: data.length,
      data: data,
    });
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString(),
    });
  }
}

/**
 * Xử lý yêu cầu POST:
 *   type = "application" (mặc định) -> Lưu vào Don_Dang_Ky
 *   type = "contact"                -> Lưu vào Lien_He
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let payload = {};

    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    const submitType = payload.type === "contact" ? "contact" : "application";

    if (submitType === "contact") {
      const contactSheet = ensureSheet(ss, SHEET_NAMES.CONTACTS);
      contactSheet.appendRow([
        timestamp,
        payload.name || payload.fullName || "",
        payload.email || "",
        payload.subject || "",
        payload.message || "",
        "Mới tiếp nhận",
      ]);

      return jsonResponse({
        status: "success",
        type: "contact",
        message: "Gửi tin nhắn liên hệ thành công!",
        timestamp: timestamp,
      });
    }

    const appSheet = ensureSheet(ss, SHEET_NAMES.APPLICATIONS);
    appSheet.appendRow([
      timestamp,
      payload.fullName || payload.name || "",
      payload.email || "",
      payload.phone || "",
      payload.program || "Trao đổi sinh viên Việt - Nhật",
      payload.japaneseLevel || payload.level || "Chưa cung cấp",
      payload.message || "",
      "Chờ xử lý",
    ]);

    return jsonResponse({
      status: "success",
      type: "application",
      message: "Gửi thông tin đăng ký thành công!",
      timestamp: timestamp,
    });
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString(),
    });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Đọc bảng tính thành mảng JSON object, chuẩn hóa Date -> YYYY-MM-DD và loại bỏ dòng trống hoàn toàn
 */
function getSheetDataAsJson(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0].map(function (h) {
    return String(h || "").trim();
  });

  const rows = values.slice(1);
  const result = [];

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    let hasValue = false;
    const obj = {};

    for (let c = 0; c < headers.length; c++) {
      const key = headers[c];
      if (!key) continue;
      let cell = row[c];
      if (cell instanceof Date) {
        cell = Utilities.formatDate(cell, "Asia/Ho_Chi_Minh", "yyyy-MM-dd");
      }
      if (cell !== "" && cell !== null && cell !== undefined) {
        hasValue = true;
      }
      obj[key] = cell;
    }

    if (hasValue) {
      result.push(obj);
    }
  }

  return result;
}

function ensureSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = initSampleSheet(ss, sheetName);
  }
  return sheet;
}

function styleHeader(sheet, colCount) {
  sheet
    .getRange(1, 1, 1, colCount)
    .setFontWeight("bold")
    .setBackground("#1e3a8a")
    .setFontColor("#ffffff");
  sheet.setFrozenRows(1);
}

function slugifyVietnamese(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Khởi tạo dữ liệu mẫu chuẩn khớp 100% với Web_Viet_Nhat
 */
function initSampleSheet(ss, sheetName) {
  const sheet = ss.insertSheet(sheetName);

  if (sheetName === SHEET_NAMES.CONFIG) {
    const headers = ["key", "value_vi", "value_ja", "value_en", "group", "note"];
    sheet.appendRow(headers);
    styleHeader(sheet, headers.length);

    const rows = [
      ["hero_badge", "Đại học Mở TP.HCM", "ホーチミン市オープン大学", "HCMCOU", "hero", "Nhãn nhỏ phía trên tiêu đề Hero"],
      ["hero_title", "Trung Tâm Hợp Tác Học Thuật Việt - Nhật", "日越学術協力センター", "Vietnam - Japan Academic Center", "hero", "Tiêu đề chính trang chủ"],
      ["hero_subtitle", "Cầu nối học thuật, nghiên cứu & trao đổi du học sinh Việt Nam sang Nhật Bản", "ベトナムと日本の学術研究・留学生交流をつなぐ架け橋", "Bridging Academic Excellence & Student Exchange between Vietnam and Japan", "hero", "Mô tả dưới tiêu đề Hero"],
      ["hero_cta1", "Chương trình trao đổi", "交換留学プログラムを見る", "Explore Exchange Programs", "hero", "Nút chính Hero"],
      ["hero_cta2", "Đăng ký tư vấn du học", "留学相談を申し込む", "Apply for Consultation", "hero", "Nút phụ Hero"],
      ["stat_students_value", "500", "500", "500", "stats", "Con số thống kê sinh viên sang Nhật"],
      ["stat_students_label", "Sinh viên đã sang Nhật", "渡日留学生数", "Exchange Students in Japan", "stats", "Nhãn thống kê 1"],
      ["stat_programs_value", "20", "20", "20", "stats", "Con số thống kê chương trình"],
      ["stat_programs_label", "Chương trình trao đổi", "交換プログラム数", "Exchange Programs", "stats", "Nhãn thống kê 2"],
      ["stat_partners_value", "10", "10", "10", "stats", "Con số đại học đối tác"],
      ["stat_partners_label", "Đại học đối tác tại Nhật", "日本提携大学数", "Partner Universities in Japan", "stats", "Nhãn thống kê 3"],
      ["stat_years_value", "15", "15", "15", "stats", "Số năm hợp tác"],
      ["stat_years_label", "Năm hợp tác bền vững", "協力継続年数", "Years of Cooperation", "stats", "Nhãn thống kê 4"],
      ["cta_title", "Bạn muốn du học trao đổi tại Nhật Bản?", "日本への交換留学を始めませんか？", "Ready for Your Academic Journey in Japan?", "cta", "Tiêu đề banner CTA"],
      ["cta_subtitle", "Điền biểu mẫu trực tuyến để nhận tư vấn học bổng JASSO, MEXT và xét hồ sơ trao đổi", "オンラインフォームよりJASSO奨学金や交換留学選考のご相談を受け付けています", "Submit your online application for JASSO/MEXT scholarship consultation and university exchange screening", "cta", "Mô tả banner CTA"],
      ["cta_button", "Đăng ký xét tuyển ngay", "今すぐ相談・出願する", "Apply for Consultation", "cta", "Nút CTA"],
      ["about_intro", "Trung Tâm Hợp Tác Học Thuật Việt - Nhật trực thuộc Trường Đại học Mở TP.HCM có sứ mệnh đẩy mạnh nghiên cứu song phương, tổ chức các chương trình trao đổi học sinh - sinh viên sang các trường đại học hàng đầu tại Nhật Bản du học.", "日越学術協力センターは、ベトナムと日本の学術共同研究を促進し、日本の協定大学への学生交換留学プログラムを強力に支援しています。", "The Vietnam - Japan Academic Center is dedicated to advancing bilateral research cooperation and facilitating student exchange programs to top universities in Japan.", "about", "Đoạn giới thiệu đầu trang About"],
      ["about_mission", "Xây dựng cầu nối học thuật bền vững giữa Việt Nam và Nhật Bản. Đào tạo sinh viên xuất sắc, trang bị năng lực tiếng Nhật học thuật và khả năng nghiên cứu khoa học để du học trao đổi thành công tại Nhật Bản.", "ベトナムと日本の強固な学術ネットワークを構築し、日本への交換留学を成功させる専門的学術日本語力と研究能力を備えた優秀な学生を育成します。", "Build enduring academic partnerships between Vietnam and Japan, nurturing students with academic Japanese proficiency and research capabilities.", "about", "Sứ mệnh"],
      ["about_vision", "Trở thành trung tâm kiểu mẫu hàng đầu trong kết nối hợp tác giáo dục đại học, trao đổi học sinh - sinh viên và chuyển giao tri thức giữa các trường đại học Việt Nam và Nhật Bản.", "ベトナムと日本の大学間学術交流、交換留学、知識移転における先導的かつ模範的な教育協力センターを目指します。", "Become the premier center for higher education cooperation, student exchanges, and knowledge transfer between Vietnam and Japan.", "about", "Tầm nhìn"],
      ["about_history_1", "Được thành lập trong khuôn khổ chiến lược quốc tế hóa giáo dục của Trường Đại học Mở TP.HCM, Trung Tâm Hợp Tác Học Thuật Việt - Nhật là cầu nối tin cậy hàng đầu cho sinh viên Việt Nam tiếp cận các chương trình trao đổi và học bổng du học Nhật Bản danh giá.", "ホーチミン市オープン大学の国際化推進戦略のもとで設立された日越学術協力センターは、ベトナム人学生が日本のトップ大学への交換留学および名誉ある奨学金を獲得するための信頼できる窓口です。", "Established under the internationalization strategy of HCMCOU, the Vietnam - Japan Academic Center serves as the premier bridge for students seeking exchange programs and prestigious scholarships in Japan.", "about", "Lịch sử đoạn 1"],
      ["about_history_2", "Trung tâm liên tục mở rộng các chương trình học bổng JASSO, học bổng MEXT, hội thảo khoa học quốc tế song phương và các chuyến thực tập học thuật tại Nhật Bản, hỗ trợ tối đa cho sinh viên hiện thực hóa ước mơ du học.", "当センターでは、JASSO奨学金や国費留学生（MEXT）奨学金の支援、日越共同国際学術シンポジウム、日本での学術インターンシップを継続的に拡大しています。", "The Center actively expands JASSO scholarships, MEXT support, bilateral scientific conferences, and academic internships in Japan.", "about", "Lịch sử đoạn 2"],
      ["contact_address", "97 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP.HCM", "97 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP.HCM", "97 Vo Van Tan, Vo Thi Sau Ward, District 3, HCMC", "contact", "Địa chỉ văn phòng"],
      ["contact_phone", "(028) 3930 0089", "(028) 3930 0089", "(028) 3930 0089", "contact", "Số điện thoại hotline"],
      ["contact_email", "vietnhat@ou.edu.vn", "vietnhat@ou.edu.vn", "vietnhat@ou.edu.vn", "contact", "Email liên hệ"],
      ["contact_hours", "Thứ 2 - Thứ 6: 8:00 - 17:00", "月曜日〜金曜日: 8:00 - 17:00", "Monday - Friday: 8:00 AM - 5:00 PM", "contact", "Giờ tiếp sinh viên"],
      ["social_facebook", "https://facebook.com/vietnhat.academic", "https://facebook.com/vietnhat.academic", "https://facebook.com/vietnhat.academic", "contact", "Link Facebook"],
      ["social_youtube", "https://youtube.com/@vietnhat-exchange", "https://youtube.com/@vietnhat-exchange", "https://youtube.com/@vietnhat-exchange", "contact", "Link YouTube"],
    ];
    rows.forEach(function (r) { sheet.appendRow(r); });
  } else if (sheetName === SHEET_NAMES.PROGRAMS) {
    const headers = [
      "id", "slug", "category",
      "title_vi", "title_ja", "title_en",
      "description_vi", "description_ja", "description_en",
      "overview_vi", "overview_ja", "overview_en",
      "requirement_vi", "requirement_ja", "requirement_en",
      "duration", "features", "status", "order"
    ];
    sheet.appendRow(headers);
    styleHeader(sheet, headers.length);

    const rows = [
      [
        "PG-01", "exchange-program-tokyo", "exchange",
        "Chương trình trao đổi sinh viên ĐH Tokyo (UTokyo)",
        "東京大学（UTokyo）学生交換留学プログラム",
        "The University of Tokyo Student Exchange Program",
        "Cơ hội học tập và nghiên cứu 1-2 học kỳ tại trường đại học số 1 Nhật Bản. Công nhận tín chỉ tương đương và miễn học phí đối ứng.",
        "日本最高峰の東京大学で1〜2学期間学び、最先端の研究と文化交流を体験。単位互換および授業料相互免除。",
        "Study and research for 1-2 semesters at Japan's top university. Full credit transfer and reciprocal tuition waiver.",
        "Sinh viên tham gia chương trình trao đổi tại Đại học Tokyo sẽ được học tập tại các khoa chuyên ngành bằng tiếng Nhật hoặc tiếng Anh, tiếp cận hệ thống phòng thí nghiệm hàng đầu châu Á và chuyển đổi tín chỉ về HCMCOU.",
        "東京大学での交換留学では、日本語または英語で専門科目を履修し、アジア最高水準の研究環境と単位互換制度を活用できます。",
        "Exchange students at UTokyo enroll in specialized courses in Japanese or English with full academic advising and credit transfer back to HCMCOU.",
        "Sinh viên năm 2 trở lên, GPA từ 3.2/4.0, JLPT N2 hoặc IELTS 6.5.",
        "学部2年次以上、GPA 3.2以上、JLPT N2またはIELTS 6.5相当。",
        "Sophomore or above, GPA >= 3.2/4.0, JLPT N2 or IELTS 6.5.",
        "1 - 2 học kỳ",
        "Miễn 100% học phí | Học bổng JASSO 80.000 JPY/tháng | Ký túc xá quốc tế | Công nhận tín chỉ",
        true, 1
      ],
      [
        "PG-02", "exchange-program-kyoto", "exchange",
        "Trao đổi học thuật & Nghiên cứu ĐH Kyoto",
        "京都大学 学術・研究交換留学プログラム",
        "Kyoto University Academic & Research Exchange",
        "Chương trình dành cho sinh viên xuất sắc tham gia các phòng lab nghiên cứu khoa học tiên tiến và giao lưu văn hóa tại cố đô Kyoto.",
        "古都京都の名門・京都大学の最先端研究室に参加し、学術研究と異文化体験を深める特別交換留学プログラム。",
        "Program for outstanding students to join advanced science labs and cultural immersion in historical Kyoto.",
        "Được giáo sư Đại học Kyoto hướng dẫn nghiên cứu trực tiếp, tham gia seminar chuyên đề và các hoạt động bảo tồn di sản văn hóa Nhật Bản.",
        "京都大学の指導教員のもとでゼミや研究室活動に参加し、深い学術探究と伝統文化交流を行います。",
        "Direct supervision by Kyoto University faculty, seminar participation, and cultural immersion programs in Kyoto.",
        "Sinh viên năm 2-3, GPA từ 3.0/4.0, JLPT N2 hoặc tiếng Anh học thuật.",
        "学部2〜3年次、GPA 3.0以上、JLPT N2または学術英語力。",
        "2nd/3rd year student, GPA >= 3.0/4.0, JLPT N2 or academic English.",
        "1 năm học",
        "Giáo sư hướng dẫn trực tiếp | Hỗ trợ visa du học | Trợ cấp sinh hoạt phí | Bảo hiểm y tế Nhật Bản",
        true, 2
      ],
      [
        "PG-03", "exchange-program-osaka", "exchange",
        "Chương trình trao đổi sinh viên ĐH Osaka",
        "大阪大学 学生交換留学プログラム",
        "Osaka University Student Exchange",
        "Trải nghiệm học tập trong môi trường đại học năng động hàng đầu vùng Kansai, kết hợp thực tập thực tế tại doanh nghiệp Nhật Bản.",
        "関西屈指の総合大学・大阪大学での学びと、日本の先進企業でのインターンシップ体験を兼ね備えたプログラム。",
        "Experience vibrant academic life in Kansai region combined with practical internships at Japanese corporations.",
        "Kết hợp hài hòa giữa học phần học thuật tại ĐH Osaka và cơ hội kiến tập tại các tập đoàn kinh tế, công nghệ vùng Kansai.",
        "大阪大学での専門履修と関西圏の有力企業での実務インターンシップを組み合わせた実践的プログラム。",
        "Combines coursework at Osaka University with practical corporate internships across the Kansai region.",
        "GPA từ 2.8/4.0, JLPT N3 trở lên.",
        "GPA 2.8以上、JLPT N3以上。",
        "GPA >= 2.8/4.0, JLPT N3 or higher.",
        "6 - 12 tháng",
        "Thực tập doanh nghiệp | Khóa tiếng Nhật miễn phí | Hoạt động giao lưu cộng đồng | Cố vấn học tập 1-1",
        true, 3
      ],
      [
        "PG-04", "scholarship-jasso-japan", "scholarship",
        "Học bổng trao đổi sinh viên JASSO",
        "日本学生支援機構（JASSO）留学生受入支援奨学金",
        "JASSO Student Exchange Support Scholarship",
        "Học bổng từ Tổ chức Hỗ trợ Sinh viên Nhật Bản (JASSO) cấp hàng tháng cho sinh viên Việt Nam đi trao đổi theo thỏa thuận giữa 2 trường.",
        "大学間協定に基づくベトナム人交換留学生に対し、月額80,000円の生活支援奨学金を支給。",
        "Monthly scholarship from Japan Student Services Organization for Vietnamese exchange students under bilateral agreements.",
        "Trung tâm hỗ trợ hoàn thiện hồ sơ đề cử JASSO (trợ cấp 80.000 Yên/tháng) song song với quy trình xét tuyển trao đổi của trường đối tác.",
        "協定校への交換留学選考と並行し、月額80,000円のJASSO奨学金推薦申請を全面サポートします。",
        "Full application support for JASSO's 80,000 JPY/month stipend alongside partner university exchange admission.",
        "Được chấp nhận tham gia chương trình trao đổi song phương, GPA từ 2.8+.",
        "協定交換留学の合格者、GPA 2.8相当以上。",
        "Admitted bilateral exchange candidate, GPA >= 2.8.",
        "Suốt kỳ trao đổi",
        "Trợ cấp 80.000 Yên/tháng | Không ràng buộc sau tốt nghiệp | Hỗ trợ hồ sơ xin visa | Ưu tiên GPA từ 2.8+",
        true, 4
      ],
      [
        "PG-05", "scholarship-mext-japan", "scholarship",
        "Học bổng Chính phủ Nhật Bản (MEXT)",
        "文部科学省（MEXT）日本政府国費留学生奨学金",
        "MEXT Japanese Government Scholarship",
        "Chương trình học bổng toàn phần danh giá nhất do Bộ Giáo dục, Văn hóa, Thể thao, Khoa học và Công nghệ Nhật Bản tài trợ.",
        "文部科学省が支給する最高峰の全額給付型奨学金。往復航空券、学費全額免除、月額生活費を支給。",
        "The most prestigious full scholarship sponsored by Japan's Ministry of Education, Culture, Sports, Science and Technology.",
        "Cố vấn chiến lược chọn trường, kết nối giáo sư hướng dẫn Nhật Bản, chỉnh sửa Đề cương nghiên cứu (Research Plan) và luyện phỏng vấn hội đồng MEXT.",
        "志望大学の選定、指導教員への連絡、研究計画書の添削、面接対策まで一貫して指導します。",
        "End-to-end mentorship for university placement, professor outreach, Research Plan editing, and MEXT interviews.",
        "Sinh viên năm cuối hoặc tốt nghiệp loại Khá/Giỏi trở lên, có định hướng nghiên cứu rõ ràng.",
        "学部卒業見込または卒業生で、明確な研究計画を有する優秀な学生。",
        "Final-year student or graduate with strong academic record and clear research proposal.",
        "Toàn khóa học",
        "Vé máy bay khứ hồi | 100% học phí | Sinh hoạt phí 120.000 - 145.000 JPY/tháng | Đào tạo tiếng Nhật dự bị",
        true, 5
      ],
      [
        "PG-06", "japanese-academic-n2-n1", "japanese",
        "Khóa đào tạo Tiếng Nhật Học thuật & Luyện thi N2/N1",
        "アカデミック日本語＆JLPT N2/N1対策集中講座",
        "Academic Japanese & JLPT N2/N1 Intensive Course",
        "Chuẩn bị năng lực tiếng Nhật học thuật, kỹ năng viết báo cáo khoa học, thuyết trình hội thảo và chuẩn bị hồ sơ phỏng vấn giáo sư Nhật.",
        "学術論文の執筆、学会発表、指導教員面談に向けた専門的日本語力およびJLPT上位級の合格を徹底サポート。",
        "Academic Japanese mastery, research writing, conference presentations, and professor interview preparation.",
        "Khóa học chuyên sâu do giảng viên người Nhật và tiến sĩ tu nghiệp tại Nhật trực tiếp giảng dạy, tập trung vào văn phong học thuật và phản xạ phỏng vấn học bổng.",
        "日本人講師および日本留学経験を持つ博士陣が、論文読解・執筆から面接実践まで少人数で指導します。",
        "Taught by Japanese linguists and Japan-trained PhDs, focusing on academic writing, seminar discussion, and scholarship interviews.",
        "Trình độ tương đương JLPT N3 trở lên.",
        "JLPT N3相当以上の日本語力を有する方。",
        "JLPT N3 equivalent or higher.",
        "4 - 6 tháng",
        "Viết đề cương nghiên cứu | Phỏng vấn giáo sư Nhật Bản | Luyện thi JLPT N2/N1 | Cam kết đầu ra",
        true, 6
      ],
    ];
    rows.forEach(function (r) { sheet.appendRow(r); });
  } else if (sheetName === SHEET_NAMES.NEWS) {
    const headers = [
      "id", "slug", "category", "date", "featured",
      "title_vi", "title_ja", "title_en",
      "excerpt_vi", "excerpt_ja", "excerpt_en",
      "content_vi", "content_ja", "content_en",
      "status"
    ];
    sheet.appendRow(headers);
    styleHeader(sheet, headers.length);

    const rows = [
      [
        "NW-01", "tuyen-sinh-trao-doi-sinh-vien-nhat-ban-2027", "announcement", "2026-10-12", true,
        "Thông báo tuyển chọn sinh viên tham gia chương trình trao đổi tại Nhật Bản năm học 2027",
        "2027年度 日本の提携大学への交換留学生募集開始のお知らせ",
        "Call for Applications: Student Exchange Program in Japan Academic Year 2027",
        "Trung tâm Hợp tác Học thuật Việt - Nhật chính thức mở đợt đăng ký xét tuyển chương trình trao đổi sinh viên sang các trường ĐH đối tác tại Nhật Bản.",
        "日越学術協力センターでは、2027年度日本の協定大学への学生交換プログラムの出願受付を開始いたしました。",
        "Vietnam - Japan Academic Center officially announces the application call for student exchange programs at partner universities across Japan.",
        "Chương trình trao đổi sinh viên Việt - Nhật mở rộng cơ hội học tập 1-2 học kỳ tại các trường đại học danh tiếng như ĐH Tokyo, ĐH Kyoto, ĐH Osaka.\nSinh viên được miễn 100% học phí tại trường đối tác, đồng thời được hỗ trợ xét cấp học bổng sinh hoạt phí JASSO trị giá 80.000 Yên/tháng. Hạn chót nộp hồ sơ trực tuyến: 15/12/2026.",
        "東京大学、京都大学、大阪大学など日本のトップ協定大学で1〜2学期間学ぶ貴重な機会です。\n協定校の授業料は100%免除され、月額80,000円のJASSO奨学金推薦も受けられます。オンライン出願締切：2026年12月15日。",
        "The Vietnam-Japan student exchange opens 1-2 semester placements at The University of Tokyo, Kyoto University, and Osaka University.\nStudents receive a 100% reciprocal tuition waiver and JASSO scholarship nomination (80,000 JPY/month). Online deadline: December 15, 2026.",
        true
      ],
      [
        "NW-02", "hoi-thao-khoa-hoc-viet-nhat-2026", "event", "2026-10-05", false,
        "Hội thảo quốc tế: Hợp tác nghiên cứu & Chuyển giao công nghệ Việt Nam - Nhật Bản",
        "国際シンポジウム：日越学術共同研究および先端技術移転",
        "International Conference: Vietnam - Japan Academic Research & Technology Transfer",
        "Sự kiện quy tụ hơn 30 giáo sư, tiến sĩ đầu ngành từ các viện nghiên cứu và trường đại học lớn tại Tokyo và TP.HCM.",
        "東京およびホーチミン市の主要大学・研究機関から30名以上の教授陣・研究者が集う国際シンポジウムを開催。",
        "Gathering over 30 leading professors and researchers from Tokyo and HCMC institutes and universities.",
        "Hội thảo tập trung thảo luận về các giải pháp phát triển bền vững, công nghệ vi mạch bán dẫn, năng lượng tái tạo và tăng cường liên kết đào tạo sau đại học giữa hai quốc gia.",
        "本シンポジウムでは、持続可能開発、半導体技術、再生可能エネルギー、および両国間の大学院共同教育プログラムの拡充について議論を行いました。",
        "The conference focused on sustainable development, semiconductor technology, renewable energy, and bilateral graduate training partnerships.",
        true
      ],
      [
        "NW-03", "hoc-bong-jasso-ky-xuan-2027", "scholarship", "2026-09-28", false,
        "Hướng dẫn nộp hồ sơ xin học bổng JASSO kỳ mùa Xuân 2027",
        "2027年春学期 JASSO留学生受入支援奨学金 申請ガイド",
        "Guide for JASSO Student Exchange Support Scholarship Spring 2027",
        "Tổng hợp toàn bộ tiêu chuẩn GPA, chứng chỉ tiếng Nhật JLPT N3/N2, biểu mẫu kế hoạch học tập Study Plan và quy trình phỏng vấn.",
        "GPA基準、JLPTスコア要件、研究計画書の書き方、教員面談手順に関する詳細な申請ガイドラインを公開。",
        "Comprehensive guide on GPA requirements, JLPT scores, Study Plan submission, and professor interview process.",
        "Tổ chức Hỗ trợ Sinh viên Nhật Bản (JASSO) cấp học bổng hàng tháng trị giá 80.000 JPY cho sinh viên Việt Nam có thành tích học tập tốt. Sinh viên đăng ký qua cổng tuyển sinh trực tuyến của Trung tâm.",
        "日本学生支援機構（JASSO）より優秀なベトナム人交換留学生に対し月額80,000円が支給されます。当センターのオンライン申請フォームよりご応募ください。",
        "JASSO provides an 80,000 JPY monthly stipend for qualified Vietnamese exchange students. Apply through the Center's online admissions portal.",
        true
      ],
      [
        "NW-04", "kinh-nghiem-du-hoc-sinh-viet-tai-tokyo", "event", "2026-09-15", false,
        "Chia sẻ kinh nghiệm: Hành trình 1 năm trao đổi học thuật tại Đại học Tokyo của cựu sinh viên",
        "先輩留学生の声：東京大学での1年間にわたる交換留学体験記",
        "Alumni Story: One Year of Academic Exchange at The University of Tokyo",
        "Những trải nghiệm thực tế về môi trường nghiên cứu, cuộc sống sinh hoạt và cơ hội việc làm sau khi hoàn thành khóa trao đổi tại Tokyo.",
        "東京大学での最先端の研究環境、日常生活、留学修了後のキャリア形成に関する実体験レポート。",
        "Real insights into research environment, daily life, and career opportunities after completing exchange program in Tokyo.",
        "Bạn Nguyễn Minh Hoàng - sinh viên từng nhận học bổng trao đổi 1 năm tại Khoa Kỹ thuật ĐH Tokyo chia sẻ về cách thích nghi môi trường học tập, giao tiếp cùng giáo sư Nhật và phát triển mạng lưới quan hệ học thuật quốc tế.",
        "東京大学工学部で1年間の交換留学を修了したグエン・ミン・ホアンさんが、研究環境への適応や指導教員との連携、キャリアの広がりについて語りました。",
        "Nguyen Minh Hoang, former 1-year exchange scholar at UTokyo Faculty of Engineering, shares practical advice on lab research, faculty mentorship, and global career networking.",
        true
      ],
      [
        "NW-05", "huong-dan-xin-coe-va-visa-du-hoc-nhat", "announcement", "2026-09-02", false,
        "Cẩm nang thủ tục cấp Giấy chứng nhận tư cách lưu trú (COE) và Visa du học Nhật Bản",
        "在留資格認定証明書（COE）交付および日本留学ビザ申請手引き",
        "Handbook on COE and Student Visa Procedures for Japan",
        "Quy trình từng bước chuẩn bị hồ sơ chứng minh tài chính, giấy báo nhập học và nộp hồ sơ xin visa du học Nhật tại Lãnh sự quán.",
        "経費支弁書、入学許可証の準備から日本国総領事館へのビザ申請に至るまでの確実な手続き手順を解説。",
        "Step-by-step instructions on financial proof, admission letters, and submitting student visa applications to the Consulate General of Japan.",
        "Chi tiết các mốc thời gian quan trọng, giấy tờ cần chuẩn bị và những lưu ý tránh sai sót khi xin cấp COE từ Cục Xuất Nhập Cảnh Nhật Bản.",
        "日本の出入国在留管理局へのCOE申請スケジュール、必要書類、注意点について分かりやすくまとめています。",
        "Detailed timeline, required documents, and checklist to avoid delays when applying for a Certificate of Eligibility (COE) in Japan.",
        true
      ],
    ];
    rows.forEach(function (r) { sheet.appendRow(r); });
  } else if (sheetName === SHEET_NAMES.FACULTY) {
    const headers = [
      "id",
      "name_vi", "name_ja", "name_en",
      "title_vi", "title_ja", "title_en",
      "specialization",
      "bio_vi", "bio_ja", "bio_en",
      "status", "order"
    ];
    sheet.appendRow(headers);
    styleHeader(sheet, headers.length);

    const rows = [
      ["FC-01", "PGS.TS. Nguyễn Văn An", "グエン・ヴァン・アン 准教授・博士", "Assoc. Prof. Dr. Nguyen Van An", "Giám đốc Trung tâm Hợp tác Học thuật Việt - Nhật", "日越学術協力センター長", "Director of Vietnam - Japan Academic Center", "Hợp tác học thuật quốc tế Việt - Nhật", "Hơn 20 năm nghiên cứu và giảng dạy, Tiến sĩ tu nghiệp tại Đại học Tokyo, chuyên gia xúc tiến hợp tác giáo dục đại học Việt Nam - Nhật Bản.", "東京大学博士号取得。20年以上の研究・教育実績を持ち、日越大学間学術交流推進の第一人者。", "Over 20 years in academia, PhD from The University of Tokyo, leading expert in Vietnam-Japan higher education cooperation.", true, 1],
      ["FC-02", "GS.TS. Tanaka Kenji", "田中 健次 教授・博士", "Prof. Dr. Tanaka Kenji", "Cố vấn cấp cao Ban Hợp tác Đại học Nhật Bản", "日本協定大学学術連携 顧問", "Senior Advisor for Japanese University Partnerships", "Nghiên cứu & Đối tác Đại học Nhật Bản", "Nguyên Giáo sư tại Đại học Kyoto, cố vấn chiến lược kết nối trao đổi sinh viên và các dự án nghiên cứu song phương.", "京都大学名誉教授。日越共同研究および交換留学プログラムの戦略的連携を総括。", "Former Professor at Kyoto University, strategic advisor for bilateral student exchange and research initiatives.", true, 2],
      ["FC-03", "TS. Yamamoto Sayaka", "山本 さやか 博士", "Dr. Yamamoto Sayaka", "Trưởng bộ phận Tiếng Nhật Học thuật", "アカデミック日本語教育 主任", "Head of Academic Japanese Department", "Tiếng Nhật học thuật & Báo cáo khoa học", "Tiến sĩ Ngôn ngữ học từ Đại học Osaka, chuyên gia đào tạo tiếng Nhật học thuật phục vụ viết báo cáo khoa học và thuyết trình hội thảo.", "大阪大学大学院博士課程修了。論文執筆および学会発表に向けた学術日本語教育の専門家。", "PhD in Linguistics from Osaka University, expert in academic Japanese writing and conference presentations.", true, 3],
      ["FC-04", "ThS. Lê Hoàng Nam", "レ・ホアン・ナム 修士", "MA. Le Hoang Nam", "Điều phối viên Chương trình Trao đổi Sinh viên", "交換留学プログラム コーディネーター", "Student Exchange Program Coordinator", "Học bổng JASSO & Quản lý chương trình trao đổi", "Thạc sĩ Đại học Tohoku (Học bổng MEXT), JLPT N1, phụ trách hướng dẫn hồ sơ xin học bổng JASSO và xét tuyển trao đổi trường Nhật.", "東北大学大学院修了（国費留学生）、JLPT N1。JASSO奨学金および協定校推薦業務を担当。", "Master's from Tohoku University (MEXT scholar), JLPT N1, manages JASSO scholarship and exchange partner applications.", true, 4],
      ["FC-05", "TS. Sato Hiroshi", "佐藤 浩 博士", "Dr. Sato Hiroshi", "Cố vấn Đề cương Nghiên cứu & Phỏng vấn Giáo sư", "研究計画書・指導教員面談 指導教授", "Research Proposal & Professor Interview Mentor", "Cố vấn học thuật & Học bổng du học Nhật", "Nhiều năm kinh nghiệm trong hội đồng tuyển chọn học bổng du học Nhật Bản, hướng dẫn sinh viên viết Study Plan và phỏng vấn.", "日本留学奨学金選考委員を歴任。研究計画書のブラッシュアップおよび面接対策を直接指導。", "Years of experience on Japanese scholarship selection panels, mentoring students on Study Plans and academic interviews.", true, 5],
      ["FC-06", "ThS. Vũ Thị Mai Anh", "ヴ・ティ・マイ・アイン 修士", "MA. Vu Thi Mai Anh", "Chuyên viên Visa COE & Hỗ trợ Đời sống Du học sinh", "在留資格（COE）・留学生生活支援 専門員", "COE Visa Specialist & Exchange Student Support", "Thủ tục COE, Visa & Hướng nghiệp Nhật Bản", "Thạc sĩ Đại học Waseda, chuyên trách hoàn thiện thủ tục cấp COE, visa du học Nhật Bản và hỗ trợ định hướng sinh viên trước khi bay.", "早稲田大学大学院修了。COE申請、留学ビザ手続きおよび渡航前オリエンテーションを専門担当。", "Master's from Waseda University, specialist in COE clearance, student visa procedures, and pre-departure orientations.", true, 6],
    ];
    rows.forEach(function (r) { sheet.appendRow(r); });
  } else if (sheetName === SHEET_NAMES.APPLICATIONS) {
    const headers = [
      "Thời gian đăng ký",
      "Họ và tên",
      "Email",
      "Số điện thoại",
      "Chương trình quan tâm",
      "Trình độ tiếng Nhật",
      "Lời nhắn / Nguyện vọng",
      "Trạng thái"
    ];
    sheet.appendRow(headers);
    styleHeader(sheet, headers.length);
  } else if (sheetName === SHEET_NAMES.CONTACTS) {
    const headers = [
      "Thời gian gửi",
      "Họ và tên",
      "Email",
      "Chủ đề",
      "Nội dung thắc mắc",
      "Trạng thái"
    ];
    sheet.appendRow(headers);
    styleHeader(sheet, headers.length);
  }

  return sheet;
}
