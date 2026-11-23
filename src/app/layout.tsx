import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClassicalCurtain from "@/components/ui/ClassicalCurtain";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SiteDataProvider } from "@/components/providers/SiteDataProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Trung Tâm Hợp Tác Học Thuật Việt - Nhật - HCMCOU",
    template: "%s | Trung Tâm Học Thuật Việt - Nhật",
  },
  description:
    "Cổng thông tin học thuật, nghiên cứu và trao đổi học sinh - sinh viên Việt Nam sang Nhật Bản du học",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body min-h-screen flex flex-col bg-white text-neutral-900 antialiased">
        <LanguageProvider>
          <SiteDataProvider>
            <ClassicalCurtain />
            <Header />
            <main className="flex-1 pt-16 md:pt-20">{children}</main>
            <Footer />
          </SiteDataProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
