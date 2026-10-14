export type Locale = "vi" | "en" | "ja";

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    programs: string;
    news: string;
    faculty: string;
    admissions: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  sections: {
    features: string;
    latestNews: string;
    stats: string;
    partners: string;
    cta: string;
    ctaSub: string;
    ctaButton: string;
  };
  about: {
    title: string;
    mission: string;
    vision: string;
    history: string;
  };
  programs: {
    title: string;
    all: string;
    scholarship: string;
    japanese: string;
    exchange: string;
    duration: string;
    viewDetails: string;
  };
  news: {
    title: string;
    readMore: string;
    viewAll: string;
  };
  faculty: {
    title: string;
  };
  admissions: {
    title: string;
    timeline: string;
    form: string;
    fullName: string;
    email: string;
    phone: string;
    program: string;
    message: string;
    submit: string;
  };
  contact: {
    title: string;
    formTitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    info: string;
    address: string;
    phone: string;
    officeHours: string;
    officeHoursValue: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    programs: string;
    contactInfo: string;
    copyright: string;
  };
  stats: {
    students: string;
    programs: string;
    partners: string;
    years: string;
  };
}

export const translations: Record<Locale, TranslationSchema> = {
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      programs: "Chương trình trao đổi",
      news: "Tin tức học thuật",
      faculty: "Đội ngũ chuyên gia",
      admissions: "Đăng ký nộp đơn",
      contact: "Liên hệ",
    },
    hero: {
      title: "Trung Tâm Hợp Tác Học Thuật Việt - Nhật",
      subtitle: "Cầu nối học thuật, nghiên cứu & trao đổi du học sinh Việt Nam sang Nhật Bản",
      cta1: "Chương trình trao đổi",
      cta2: "Đăng ký tư vấn du học",
    },
    sections: {
      features: "Chương trình trao đổi & Học bổng",
      latestNews: "Tin tức & Thông báo học thuật",
      stats: "Thành tựu hợp tác",
      partners: "Đại học đối tác tại Nhật Bản",
      cta: "Bạn muốn du học trao đổi tại Nhật Bản?",
      ctaSub: "Điền biểu mẫu trực tuyến để nhận tư vấn học bổng JASSO, MEXT và xét hồ sơ trao đổi",
      ctaButton: "Đăng ký xét tuyển ngay",
    },
    about: {
      title: "Về chúng tôi",
      mission: "Sứ mệnh",
      vision: "Tầm nhìn",
      history: "Lịch sử hợp tác",
    },
    programs: {
      title: "Chương trình trao đổi & Du học Nhật Bản",
      all: "Tất cả",
      scholarship: "Học bổng du học Nhật",
      exchange: "Trao đổi sinh viên",
      japanese: "Tiếng Nhật học thuật",
      duration: "Thời lượng",
      viewDetails: "Xem chi tiết",
    },
    news: {
      title: "Tin tức & Hoạt động học thuật",
      readMore: "Xem thêm",
      viewAll: "Tất cả tin tức",
    },
    faculty: {
      title: "Hội đồng cố vấn & Giảng viên Việt - Nhật",
    },
    admissions: {
      title: "Đăng ký xét tuyển trao đổi sinh viên",
      timeline: "Quy trình nộp hồ sơ",
      form: "Biểu mẫu nộp hồ sơ trực tuyến",
      fullName: "Họ và tên sinh viên",
      email: "Email học tập/cá nhân",
      phone: "Số điện thoại liên lạc",
      program: "Chương trình trao đổi / Học bổng quan tâm",
      message: "Trình độ tiếng Nhật, GPA và nguyện vọng",
      submit: "Gửi hồ sơ đăng ký",
    },
    contact: {
      title: "Liên hệ tư vấn",
      formTitle: "Gửi thông tin thắc mắc",
      name: "Họ và tên",
      email: "Email",
      subject: "Chủ đề câu hỏi",
      message: "Nội dung",
      send: "Gửi yêu cầu",
      info: "Văn phòng hợp tác quốc tế",
      address: "Địa chỉ",
      phone: "Điện thoại",
      officeHours: "Thời gian tiếp sinh viên",
      officeHoursValue: "Thứ 2 - Thứ 6: 8:00 - 17:00",
    },
    footer: {
      description: "Cổng thông tin học thuật và chương trình trao đổi sinh viên Việt Nam sang Nhật Bản du học.",
      quickLinks: "Liên kết nhanh",
      programs: "Chương trình trao đổi",
      contactInfo: "Liên hệ",
      copyright: "© 2026 Trung Tâm Hợp Tác Học Thuật Việt - Nhật",
    },
    stats: {
      students: "Sinh viên đã sang Nhật",
      programs: "Chương trình trao đổi",
      partners: "Đại học đối tác tại Nhật",
      years: "Năm hợp tác bền vững",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      programs: "Exchange Programs",
      news: "Academic News",
      faculty: "Faculty & Advisors",
      admissions: "Apply Now",
      contact: "Contact",
    },
    hero: {
      title: "Vietnam - Japan Academic Center",
      subtitle: "Bridging Academic Excellence & Student Exchange between Vietnam and Japan",
      cta1: "Explore Exchange Programs",
      cta2: "Apply for Consultation",
    },
    sections: {
      features: "Featured Exchange & Scholarships",
      latestNews: "Academic News & Announcements",
      stats: "Our Cooperation Impact",
      partners: "Partner Universities in Japan",
      cta: "Ready for Your Academic Journey in Japan?",
      ctaSub: "Submit your online application for JASSO/MEXT scholarship consultation and university exchange screening",
      ctaButton: "Apply for Consultation",
    },
    about: {
      title: "About Us",
      mission: "Our Mission",
      vision: "Our Vision",
      history: "Our History",
    },
    programs: {
      title: "Exchange & Study in Japan Programs",
      all: "All",
      scholarship: "Scholarships",
      exchange: "Student Exchange",
      japanese: "Academic Japanese",
      duration: "Duration",
      viewDetails: "View Details",
    },
    news: {
      title: "Academic News & Conferences",
      readMore: "Read More",
      viewAll: "View All News",
    },
    faculty: {
      title: "Advisory Board & Faculty",
    },
    admissions: {
      title: "Student Exchange Application",
      timeline: "Application Process",
      form: "Online Application Form",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      program: "Program of Interest",
      message: "Japanese Level, GPA, and Aspirations",
      submit: "Submit Application",
    },
    contact: {
      title: "Contact Consultation",
      formTitle: "Send Us an Inquiry",
      name: "Full Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Inquiry",
      info: "International Cooperation Office",
      address: "Address",
      phone: "Phone",
      officeHours: "Office Hours",
      officeHoursValue: "Monday - Friday: 8:00 AM - 5:00 PM",
    },
    footer: {
      description: "Academic cooperation and student exchange portal between Vietnam and Japan.",
      quickLinks: "Quick Links",
      programs: "Exchange Programs",
      contactInfo: "Contact",
      copyright: "© 2026 Vietnam - Japan Academic Center",
    },
    stats: {
      students: "Exchange Students in Japan",
      programs: "Exchange Programs",
      partners: "Partner Universities in Japan",
      years: "Years of Cooperation",
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      about: "センター紹介",
      programs: "交換留学プログラム",
      news: "学術ニュース",
      faculty: "専門家・教員陣",
      admissions: "留学申請・出願",
      contact: "お問い合わせ",
    },
    hero: {
      title: "日越学術協力センター",
      subtitle: "ベトナムと日本の学術研究・留学生交流をつなぐ架け橋",
      cta1: "交換留学プログラムを見る",
      cta2: "留学相談を申し込む",
    },
    sections: {
      features: "注目の交換留学＆奨学金",
      latestNews: "最新の学術ニュース・お知らせ",
      stats: "交流の実績",
      partners: "日本の提携大学",
      cta: "日本への交換留学を始めませんか？",
      ctaSub: "オンラインフォームよりJASSO奨学金や交換留学選考のご相談を受け付けています",
      ctaButton: "今すぐ相談・出願する",
    },
    about: {
      title: "センターについて",
      mission: "使命（ミッション）",
      vision: "ビジョン",
      history: "協力の歴史",
    },
    programs: {
      title: "交換留学・日本留学プログラム",
      all: "すべて",
      scholarship: "日本留学奨学金",
      exchange: "学生交換",
      japanese: "アカデミック日本語",
      duration: "期間",
      viewDetails: "詳細を見る",
    },
    news: {
      title: "学術ニュース＆イベント",
      readMore: "続きを読む",
      viewAll: "すべての記事を見る",
    },
    faculty: {
      title: "顧問評議会および日越教員陣",
    },
    admissions: {
      title: "交換留学生募集・出願案内",
      timeline: "申請プロセス",
      form: "オンライン出願フォーム",
      fullName: "学生氏名",
      email: "メールアドレス",
      phone: "電話番号",
      program: "希望プログラム / 奨学金",
      message: "日本語レベル・GPA・志望動機",
      submit: "出願・申請を送信",
    },
    contact: {
      title: "お問い合わせ・留学相談",
      formTitle: "メッセージを送信",
      name: "氏名",
      email: "メールアドレス",
      subject: "件名",
      message: "お問い合わせ内容",
      send: "送信する",
      info: "国際学術交流オフィス",
      address: "所在地",
      phone: "電話番号",
      officeHours: "受付時間",
      officeHoursValue: "月曜日〜金曜日: 8:00 - 17:00",
    },
    footer: {
      description: "ベトナムと日本の学術協力および留学生交流情報ポータルサイト。",
      quickLinks: "クイックリンク",
      programs: "プログラム",
      contactInfo: "連絡先",
      copyright: "© 2026 日越学術協力センター",
    },
    stats: {
      students: "渡日留学生数",
      programs: "交換プログラム数",
      partners: "日本提携大学数",
      years: "協力継続年数",
    },
  },
};

export type TranslationKeys = TranslationSchema;
