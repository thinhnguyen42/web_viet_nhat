import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện",
  description:
    "Tin tức, sự kiện và thông báo học bổng du học mới nhất từ Trung Tâm Hợp Tác Học Thuật Việt - Nhật - Trường Đại học Mở TP.HCM",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
