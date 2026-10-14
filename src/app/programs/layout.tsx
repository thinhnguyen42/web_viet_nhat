import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chương trình đào tạo",
  description:
    "Các chương trình học thuật, trao đổi sinh viên sang Nhật Bản du học và học bổng JASSO, MEXT",
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
