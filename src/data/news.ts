export interface NewsArticle {
  slug: string;
  title: string;
  titleEn: string;
  titleJa?: string;
  excerpt: string;
  excerptEn: string;
  excerptJa?: string;
  content: string;
  contentEn?: string;
  contentJa?: string;
  category: "announcement" | "event" | "scholarship";
  date: string;
  image: string;
  featured: boolean;
  status?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "tuyen-sinh-trao-doi-sinh-vien-nhat-ban-2027",
    title: "Thông báo tuyển chọn sinh viên tham gia chương trình trao đổi tại Nhật Bản năm học 2027",
    titleEn: "Call for Applications: Student Exchange Program in Japan Academic Year 2027",
    titleJa: "2027年度 日本の提携大学への交換留学生募集開始のお知らせ",
    excerpt: "Trung tâm Hợp tác Học thuật Việt - Nhật chính thức mở đợt đăng ký xét tuyển chương trình trao đổi sinh viên sang các trường ĐH đối tác tại Nhật Bản.",
    excerptEn: "Vietnam - Japan Academic Center officially announces the application call for student exchange programs at partner universities across Japan.",
    excerptJa: "日越学術協力センターでは、2027年度日本の協定大学への学生交換プログラムの出願受付を開始いたしました。",
    content: "Chương trình trao đổi sinh viên Việt - Nhật mở rộng cơ hội học tập 1-2 học kỳ tại các trường đại học danh tiếng như ĐH Tokyo, ĐH Kyoto, ĐH Osaka. Sinh viên được miễn 100% học phí tại trường đối tác, đồng thời được hỗ trợ xét cấp học bổng sinh hoạt phí JASSO trị giá 80.000 Yên/tháng. Hạn chót nộp hồ sơ trực tuyến: 15/12/2026.",
    category: "announcement",
    date: "2026-10-12",
    image: "/images/placeholder/news-1.jpg",
    featured: true,
  },
  {
    slug: "hoi-thao-khoa-hoc-viet-nhat-2026",
    title: "Hội thảo quốc tế: Hợp tác nghiên cứu & Chuyển giao công nghệ Việt Nam - Nhật Bản",
    titleEn: "International Conference: Vietnam - Japan Academic Research & Technology Transfer",
    titleJa: "国際シンポジウム：日越学術共同研究および先端技術移転",
    excerpt: "Sự kiện quy tụ hơn 30 giáo sư, tiến sĩ đầu ngành từ các viện nghiên cứu và trường đại học lớn tại Tokyo và TP.HCM.",
    excerptEn: "Gathering over 30 leading professors and researchers from Tokyo and HCMC institutes and universities.",
    excerptJa: "東京およびホーチミン市の主要大学・研究機関から30名以上の教授陣・研究者が集う国際シンポジウムを開催。",
    content: "Hội thảo tập trung thảo luận về các giải pháp phát triển bền vững, công nghệ vi mạch bán dẫn, năng lượng tái tạo và tăng cường liên kết đào tạo sau đại học giữa hai quốc gia.",
    category: "event",
    date: "2026-10-05",
    image: "/images/placeholder/news-2.jpg",
    featured: false,
  },
  {
    slug: "hoc-bong-jasso-ky-xuan-2027",
    title: "Hướng dẫn nộp hồ sơ xin học bổng JASSO kỳ mùa Xuân 2027",
    titleEn: "Guide for JASSO Student Exchange Support Scholarship Spring 2027",
    titleJa: "2027年春学期 JASSO留学生受入支援奨学金 申請ガイド",
    excerpt: "Tổng hợp toàn bộ tiêu chuẩn GPA, chứng chỉ tiếng Nhật JLPT N3/N2, biểu mẫu kế hoạch học tập Study Plan và quy trình phỏng vấn.",
    excerptEn: "Comprehensive guide on GPA requirements, JLPT scores, Study Plan submission, and professor interview process.",
    excerptJa: "GPA基準、JLPTスコア要件、研究計画書の書き方、教員面談手順に関する詳細な申請ガイドラインを公開。",
    content: "Tổ chức Hỗ trợ Sinh viên Nhật Bản (JASSO) cấp học bổng hàng tháng trị giá 80.000 JPY cho sinh viên Việt Nam có thành tích học tập tốt. Sinh viên đăng ký qua cổng tuyển sinh trực tuyến của Trung tâm.",
    category: "scholarship",
    date: "2026-09-28",
    image: "/images/placeholder/news-3.jpg",
    featured: false,
  },
  {
    slug: "kinh-nghiem-du-hoc-sinh-viet-tai-tokyo",
    title: "Chia sẻ kinh nghiệm: Hành trình 1 năm trao đổi học thuật tại Đại học Tokyo của cựu sinh viên",
    titleEn: "Alumni Story: One Year of Academic Exchange at The University of Tokyo",
    titleJa: "先輩留学生の声：東京大学での1年間にわたる交換留学体験記",
    excerpt: "Những trải nghiệm thực tế về môi trường nghiên cứu, cuộc sống sinh hoạt và cơ hội việc làm sau khi hoàn thành khóa trao đổi tại Tokyo.",
    excerptEn: "Real insights into research environment, daily life, and career opportunities after completing exchange program in Tokyo.",
    excerptJa: "東京大学での最先端の研究環境、日常生活、留学修了後のキャリア形成に関する実体験レポート。",
    content: "Bạn Nguyễn Minh Hoàng - sinh viên từng nhận học bổng trao đổi 1 năm tại Khoa Kỹ thuật ĐH Tokyo chia sẻ về cách thích nghi môi trường học tập, giao tiếp cùng giáo sư Nhật và phát triển mạng lưới quan hệ học thuật quốc tế.",
    category: "event",
    date: "2026-09-15",
    image: "/images/placeholder/news-4.jpg",
    featured: false,
  },
  {
    slug: "huong-dan-xin-coe-va-visa-du-hoc-nhat",
    title: "Cẩm nang thủ tục cấp Giấy chứng nhận tư cách lưu trú (COE) và Visa du học Nhật Bản",
    titleEn: "Handbook on COE and Student Visa Procedures for Japan",
    titleJa: "在留資格認定証明書（COE）交付および日本留学ビザ申請手引き",
    excerpt: "Quy trình từng bước chuẩn bị hồ sơ chứng minh tài chính, giấy báo nhập học và nộp hồ sơ xin visa du học Nhật tại Lãnh sự quán.",
    excerptEn: "Step-by-step instructions on financial proof, admission letters, and submitting student visa applications to the Consulate General of Japan.",
    excerptJa: "経費支弁書、入学許可証の準備から日本国総領事館へのビザ申請に至るまでの確実な手続き手順を解説。",
    content: "Chi tiết các mốc thời gian quan trọng, giấy tờ cần chuẩn bị và những lưu ý tránh sai sót khi xin cấp COE từ Cục Xuất Nhập Cảnh Nhật Bản.",
    category: "announcement",
    date: "2026-09-02",
    image: "/images/placeholder/news-5.jpg",
    featured: false,
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
