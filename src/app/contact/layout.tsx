import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với Trung Tâm Hợp Tác Học Thuật Việt - Nhật - Trường Đại học Mở TP.HCM",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
