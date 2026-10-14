import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tuyển sinh",
  description:
    "Thông tin tuyển sinh và đăng ký xét hồ sơ trao đổi du học Nhật Bản tại Trung Tâm Hợp Tác Học Thuật Việt - Nhật",
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
