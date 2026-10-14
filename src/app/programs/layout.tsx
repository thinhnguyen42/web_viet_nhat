import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chương trình đào tạo",
  description:
    "Các chương trình đào tạo ngôn ngữ và văn hóa Hàn Quốc, Nhật Bản và trao đổi quốc tế",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
