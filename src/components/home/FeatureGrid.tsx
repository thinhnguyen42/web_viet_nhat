"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

const features = [
  {
    icon: "🇰🇷",
    title: "Hàn Quốc học",
    titleEn: "Korean Studies",
    desc: "Ngôn ngữ, văn hóa và cơ hội du học Hàn Quốc cùng các đối tác danh tiếng.",
    descEn: "Language, culture, and study abroad in Korea with top universities.",
    href: "/programs",
    color: "from-red-50/80 to-red-100/50 border-red-200/60 text-red-950",
  },
  {
    icon: "🇯🇵",
    title: "Nhật Bản học",
    titleEn: "Japanese Studies",
    desc: "Tiếng Nhật, luyện thi JLPT và trải nghiệm văn hóa truyền thống & hiện đại Nhật Bản.",
    descEn: "Japanese language, JLPT, and cultural immersion in Japanese traditions.",
    href: "/programs",
    color: "from-pink-50/80 to-pink-100/50 border-pink-200/60 text-pink-950",
  },
  {
    icon: "🔄",
    title: "Trao đổi quốc tế",
    titleEn: "International Exchange",
    desc: "Chương trình trao đổi sinh viên học kỳ quốc tế, chuyển tiếp tín chỉ và học bổng toàn phần.",
    descEn: "Semester student exchange, credit recognition, and full scholarship opportunities.",
    href: "/programs",
    color: "from-blue-50/80 to-blue-100/50 border-blue-200/60 text-blue-950",
  },
];

export default function FeatureGrid() {
  const { locale, t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading title={t.sections.features} />
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={f.href} className="block group h-full">
                <div
                  className={`rounded-3xl border bg-gradient-to-br ${f.color} p-8 h-full group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <span className="text-5xl block mb-6 drop-shadow-sm">
                      {f.icon}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-3">
                      {locale === "vi" ? f.title : f.titleEn}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                      {locale === "vi" ? f.desc : f.descEn}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 group-hover:text-primary-800 group-hover:gap-3 transition-all pt-4 border-t border-black/5">
                    {t.programs.viewDetails} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
