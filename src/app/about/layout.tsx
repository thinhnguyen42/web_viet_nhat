import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Giới thiệu về Trung Tâm Hợp Tác Học Thuật Việt - Nhật - Trường Đại học Mở TP.HCM",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
