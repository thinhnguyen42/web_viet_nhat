export interface Program {
  slug: string;
  title: string;
  titleEn: string;
  titleJa?: string;
  category: "japanese" | "exchange" | "scholarship";
  description: string;
  descriptionEn: string;
  descriptionJa?: string;
  overview?: string;
  overviewEn?: string;
  overviewJa?: string;
  requirement?: string;
  requirementEn?: string;
  requirementJa?: string;
  duration: string;
  image: string;
  features: string[];
  status?: boolean;
  order?: number;
}

export const programs: Program[] = [
  {
    slug: "exchange-program-tokyo",
    title: "Chương trình trao đổi sinh viên ĐH Tokyo (UTokyo)",
    titleEn: "The University of Tokyo Student Exchange Program",
    titleJa: "東京大学（UTokyo）学生交換留学プログラム",
    category: "exchange",
    description: "Cơ hội học tập và nghiên cứu 1-2 học kỳ tại trường đại học số 1 Nhật Bản. Công nhận tín chỉ tương đương và miễn học phí đối ứng.",
    descriptionEn: "Study and research for 1-2 semesters at Japan's top university. Full credit transfer and reciprocal tuition waiver.",
    descriptionJa: "日本最高峰の東京大学で1〜2学期間学び、最先端の研究と文化交流を体験。単位互換および授業料相互免除。",
    duration: "1 - 2 học kỳ",
    image: "/images/placeholder/program-exchange-1.jpg",
    features: ["Miễn 100% học phí", "Học bổng JASSO 80.000 JPY/tháng", "Ký túc xá quốc tế", "Công nhận tín chỉ"],
  },
  {
    slug: "exchange-program-kyoto",
    title: "Trao đổi học thuật & Nghiên cứu ĐH Kyoto",
    titleEn: "Kyoto University Academic & Research Exchange",
    titleJa: "京都大学 学術・研究交換留学プログラム",
    category: "exchange",
    description: "Chương trình dành cho sinh viên xuất sắc tham gia các phòng lab nghiên cứu khoa học tiên tiến và giao lưu văn hóa tại cố đô Kyoto.",
    descriptionEn: "Program for outstanding students to join advanced science labs and cultural immersion in historical Kyoto.",
    descriptionJa: "古都京都の名門・京都大学の最先端研究室に参加し、学術研究と異文化体験を深める特別交換留学プログラム。",
    duration: "1 năm học",
    image: "/images/placeholder/program-exchange-2.jpg",
    features: ["Giáo sư hướng dẫn trực tiếp", "Hỗ trợ visa du học", "Trợ cấp sinh hoạt phí", "Bảo hiểm y tế Nhật Bản"],
  },
  {
    slug: "exchange-program-osaka",
    title: "Chương trình trao đổi sinh viên ĐH Osaka",
    titleEn: "Osaka University Student Exchange",
    titleJa: "大阪大学 学生交換留学プログラム",
    category: "exchange",
    description: "Trải nghiệm học tập trong môi trường đại học năng động hàng đầu vùng Kansai, kết hợp thực tập thực tế tại doanh nghiệp Nhật Bản.",
    descriptionEn: "Experience vibrant academic life in Kansai region combined with practical internships at Japanese corporations.",
    descriptionJa: "関西屈指の総合大学・大阪大学での学びと、日本の先進企業でのインターンシップ体験を兼ね備えたプログラム。",
    duration: "6 - 12 tháng",
    image: "/images/placeholder/program-exchange-1.jpg",
    features: ["Thực tập doanh nghiệp", "Khóa tiếng Nhật miễn phí", "Hoạt động giao lưu cộng đồng", "Cố vấn học tập 1-1"],
  },
  {
    slug: "scholarship-jasso-japan",
    title: "Học bổng trao đổi sinh viên JASSO",
    titleEn: "JASSO Student Exchange Support Scholarship",
    titleJa: "日本学生支援機構（JASSO）留学生受入支援奨学金",
    category: "scholarship",
    description: "Học bổng từ Tổ chức Hỗ trợ Sinh viên Nhật Bản (JASSO) cấp hàng tháng cho sinh viên Việt Nam đi trao đổi theo thỏa thuận giữa 2 trường.",
    descriptionEn: "Monthly scholarship from Japan Student Services Organization for Vietnamese exchange students under bilateral agreements.",
    descriptionJa: "大学間協定に基づくベトナム人交換留学生に対し、月額80,000円の生活支援奨学金を支給。",
    duration: "Suốt kỳ trao đổi",
    image: "/images/placeholder/program-japanese-1.jpg",
    features: ["Trợ cấp 80.000 Yên/tháng", "Không ràng buộc sau tốt nghiệp", "Hỗ trợ hồ sơ xin visa", "Ưu tiên GPA từ 2.8+"],
  },
  {
    slug: "scholarship-mext-japan",
    title: "Học bổng Chính phủ Nhật Bản (MEXT)",
    titleEn: "MEXT Japanese Government Scholarship",
    titleJa: "文部科学省（MEXT）日本政府国費留学生奨学金",
    category: "scholarship",
    description: "Chương trình học bổng toàn phần danh giá nhất do Bộ Giáo dục, Văn hóa, Thể thao, Khoa học và Công nghệ Nhật Bản tài trợ.",
    descriptionEn: "The most prestigious full scholarship sponsored by Japan's Ministry of Education, Culture, Sports, Science and Technology.",
    descriptionJa: "文部科学省が支給する最高峰の全額給付型奨学金。往復航空券、学費全額免除、月額生活費を支給。",
    duration: "Toàn khóa học",
    image: "/images/placeholder/program-japanese-2.jpg",
    features: ["Vé máy bay khứ hồi", "100% học phí", "Sinh hoạt phí 120.000 - 145.000 JPY/tháng", "Đào tạo tiếng Nhật dự bị"],
  },
  {
    slug: "japanese-academic-n2-n1",
    title: "Khóa đào tạo Tiếng Nhật Học thuật & Luyện thi N2/N1",
    titleEn: "Academic Japanese & JLPT N2/N1 Intensive Course",
    titleJa: "アカデミック日本語＆JLPT N2/N1対策集中講座",
    category: "japanese",
    description: "Chuẩn bị năng lực tiếng Nhật học thuật, kỹ năng viết báo cáo khoa học, thuyết trình hội thảo và chuẩn bị hồ sơ phỏng vấn giáo sư Nhật.",
    descriptionEn: "Academic Japanese mastery, research writing, conference presentations, and professor interview preparation.",
    descriptionJa: "学術論文の執筆、学会発表、指導教員面談に向けた専門的日本語力およびJLPT上位級の合格を徹底サポート。",
    duration: "4 - 6 tháng",
    image: "/images/placeholder/program-japanese-1.jpg",
    features: ["Viết đề cương nghiên cứu", "Phỏng vấn giáo sư Nhật Bản", "Luyện thi JLPT N2/N1", "Cam kết đầu ra"],
  },
];

export function getProgramsByCategory(category?: string): Program[] {
  if (!category || category === "all") return programs;
  return programs.filter((p) => p.category === category);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
