export interface FacultyMember {
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  bioEn: string;
  image: string;
  specialization: string;
}

export const facultyMembers: FacultyMember[] = [
  {
    name: "PGS.TS. Nguyễn Văn A",
    nameEn: "Assoc. Prof. Dr. Nguyen Van A",
    title: "Giám đốc Trung tâm",
    titleEn: "Center Director",
    bio: "Hơn 20 năm kinh nghiệm trong lĩnh vực giáo dục quốc tế và giao lưu văn hóa Đông Á.",
    bioEn: "Over 20 years of experience in international education and East Asian cultural exchange.",
    image: "/images/placeholder/faculty-1.jpg",
    specialization: "Quản lý giáo dục quốc tế",
  },
  {
    name: "TS. Kim Min-ji",
    nameEn: "Dr. Kim Min-ji",
    title: "Trưởng bộ phận Hàn Quốc học",
    titleEn: "Head of Korean Studies",
    bio: "Tiến sĩ ngôn ngữ học từ Đại học Seoul, chuyên gia đào tạo tiếng Hàn cho người Việt.",
    bioEn: "PhD in Linguistics from Seoul National University, expert in Korean language training for Vietnamese speakers.",
    image: "/images/placeholder/faculty-2.jpg",
    specialization: "Ngôn ngữ Hàn Quốc",
  },
  {
    name: "TS. Tanaka Yuki",
    nameEn: "Dr. Tanaka Yuki",
    title: "Trưởng bộ phận Nhật Bản học",
    titleEn: "Head of Japanese Studies",
    bio: "Tốt nghiệp Đại học Tokyo, 15 năm giảng dạy tiếng Nhật tại Việt Nam.",
    bioEn: "Graduate of the University of Tokyo, 15 years of teaching Japanese in Vietnam.",
    image: "/images/placeholder/faculty-3.jpg",
    specialization: "Ngôn ngữ & Văn hóa Nhật",
  },
  {
    name: "ThS. Trần Thị B",
    nameEn: "MA. Tran Thi B",
    title: "Giảng viên tiếng Hàn",
    titleEn: "Korean Language Instructor",
    bio: "Thạc sĩ Hàn Quốc học, TOPIK cấp 6, chuyên đào tạo tiếng Hàn giao tiếp và thương mại.",
    bioEn: "Master's in Korean Studies, TOPIK Level 6, specializes in conversational and business Korean.",
    image: "/images/placeholder/faculty-4.jpg",
    specialization: "Tiếng Hàn thương mại",
  },
  {
    name: "ThS. Lê Văn C",
    nameEn: "MA. Le Van C",
    title: "Giảng viên tiếng Nhật",
    titleEn: "Japanese Language Instructor",
    bio: "Thạc sĩ Nhật Bản học, JLPT N1, 10 năm kinh nghiệm luyện thi JLPT các cấp độ.",
    bioEn: "Master's in Japanese Studies, JLPT N1, 10 years of experience in JLPT exam preparation.",
    image: "/images/placeholder/faculty-5.jpg",
    specialization: "Luyện thi JLPT",
  },
  {
    name: "ThS. Park Soo-yeon",
    nameEn: "MA. Park Soo-yeon",
    title: "Điều phối viên chương trình trao đổi",
    titleEn: "Exchange Program Coordinator",
    bio: "Chuyên gia điều phối chương trình trao đổi sinh viên quốc tế Việt-Hàn-Nhật.",
    bioEn: "International student exchange program coordinator for Vietnam-Korea-Japan programs.",
    image: "/images/placeholder/faculty-6.jpg",
    specialization: "Trao đổi quốc tế",
  },
];
