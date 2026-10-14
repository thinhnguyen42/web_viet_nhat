export interface FacultyMember {
  name: string;
  nameEn: string;
  nameJa?: string;
  title: string;
  titleEn: string;
  titleJa?: string;
  bio: string;
  bioEn: string;
  bioJa?: string;
  image: string;
  specialization: string;
}

export const facultyMembers: FacultyMember[] = [
  {
    name: "PGS.TS. Nguyễn Văn An",
    nameEn: "Assoc. Prof. Dr. Nguyen Van An",
    nameJa: "グエン・ヴァン・アン 准教授・博士",
    title: "Giám đốc Trung tâm Hợp tác Học thuật Việt - Nhật",
    titleEn: "Director of Vietnam - Japan Academic Center",
    titleJa: "日越学術協力センター長",
    bio: "Hơn 20 năm nghiên cứu và giảng dạy, Tiến sĩ tu nghiệp tại Đại học Tokyo, chuyên gia xúc tiến hợp tác giáo dục đại học Việt Nam - Nhật Bản.",
    bioEn: "Over 20 years in academia, PhD from The University of Tokyo, leading expert in Vietnam-Japan higher education cooperation.",
    bioJa: "東京大学博士号取得。20年以上の研究・教育実績を持ち、日越大学間学術交流推進の第一人者。",
    image: "/images/placeholder/faculty-1.jpg",
    specialization: "Hợp tác học thuật quốc tế Việt - Nhật",
  },
  {
    name: "GS.TS. Tanaka Kenji",
    nameEn: "Prof. Dr. Tanaka Kenji",
    nameJa: "田中 健次 教授・博士",
    title: "Cố vấn cấp cao Ban Hợp tác Đại học Nhật Bản",
    titleEn: "Senior Advisor for Japanese University Partnerships",
    titleJa: "日本協定大学学術連携 顧問",
    bio: "Nguyên Giáo sư tại Đại học Kyoto, cố vấn chiến lược kết nối trao đổi sinh viên và các dự án nghiên cứu song phương.",
    bioEn: "Former Professor at Kyoto University, strategic advisor for bilateral student exchange and research initiatives.",
    bioJa: "京都大学名誉教授。日越共同研究および交換留学プログラムの戦略的連携を総括。",
    image: "/images/placeholder/faculty-2.jpg",
    specialization: "Nghiên cứu & Đối tác Đại học Nhật Bản",
  },
  {
    name: "TS. Yamamoto Sayaka",
    nameEn: "Dr. Yamamoto Sayaka",
    nameJa: "山本 さやか 博士",
    title: "Trưởng bộ phận Tiếng Nhật Học thuật",
    titleEn: "Head of Academic Japanese Department",
    titleJa: "アカデミック日本語教育 主任",
    bio: "Tiến sĩ Ngôn ngữ học từ Đại học Osaka, chuyên gia đào tạo tiếng Nhật học thuật phục vụ viết báo cáo khoa học và thuyết trình hội thảo.",
    bioEn: "PhD in Linguistics from Osaka University, expert in academic Japanese writing and conference presentations.",
    bioJa: "大阪大学大学院博士課程修了。論文執筆および学会発表に向けた学術日本語教育の専門家。",
    image: "/images/placeholder/faculty-3.jpg",
    specialization: "Tiếng Nhật học thuật & Báo cáo khoa học",
  },
  {
    name: "ThS. Lê Hoàng Nam",
    nameEn: "MA. Le Hoang Nam",
    nameJa: "レ・ホアン・ナム 修士",
    title: "Điều phối viên Chương trình Trao đổi Sinh viên",
    titleEn: "Student Exchange Program Coordinator",
    titleJa: "交換留学プログラム コーディネーター",
    bio: "Thạc sĩ Đại học Tohoku (Học bổng MEXT), JLPT N1, phụ trách hướng dẫn hồ sơ xin học bổng JASSO và xét tuyển trao đổi trường Nhật.",
    bioEn: "Master's from Tohoku University (MEXT scholar), JLPT N1, manages JASSO scholarship and exchange partner applications.",
    bioJa: "東北大学大学院修了（国費留学生）、JLPT N1。JASSO奨学金および協定校推薦業務を担当。",
    image: "/images/placeholder/faculty-4.jpg",
    specialization: "Học bổng JASSO & Quản lý chương trình trao đổi",
  },
  {
    name: "TS. Sato Hiroshi",
    nameEn: "Dr. Sato Hiroshi",
    nameJa: "佐藤 浩 博士",
    title: "Cố vấn Đề cương Nghiên cứu & Phỏng vấn Giáo sư",
    titleEn: "Research Proposal & Professor Interview Mentor",
    titleJa: "研究計画書・指導教員面談 指導教授",
    bio: "Nhiều năm kinh nghiệm trong hội đồng tuyển chọn học bổng du học Nhật Bản, hướng dẫn sinh viên viết Study Plan và phỏng vấn.",
    bioEn: "Years of experience on Japanese scholarship selection panels, mentoring students on Study Plans and academic interviews.",
    bioJa: "日本留学奨学金選考委員を歴任。研究計画書のブラッシュアップおよび面接対策を直接指導。",
    image: "/images/placeholder/faculty-5.jpg",
    specialization: "Cố vấn học thuật & Học bổng du học Nhật",
  },
  {
    name: "ThS. Vũ Thị Mai Anh",
    nameEn: "MA. Vu Thi Mai Anh",
    nameJa: "ヴ・ティ・マイ・アイン 修士",
    title: "Chuyên viên Visa COE & Hỗ trợ Đời sống Du học sinh",
    titleEn: "COE Visa Specialist & Exchange Student Support",
    titleJa: "在留資格（COE）・留学生生活支援 専門員",
    bio: "Thạc sĩ Đại học Waseda, chuyên trách hoàn thiện thủ tục cấp COE, visa du học Nhật Bản và hỗ trợ định hướng sinh viên trước khi bay.",
    bioEn: "Master's from Waseda University, specialist in COE clearance, student visa procedures, and pre-departure orientations.",
    bioJa: "早稲田大学大学院修了。COE申請、留学ビザ手続きおよび渡航前オリエンテーションを専門担当。",
    image: "/images/placeholder/faculty-6.jpg",
    specialization: "Thủ tục COE, Visa & Hướng nghiệp Nhật Bản",
  },
];
