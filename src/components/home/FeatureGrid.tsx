"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

const features = [
  {
    icon: "🇯🇵",
    title: "Trao đổi ĐH Nhật Bản",
    titleEn: "Japan University Exchange",
    titleJa: "日本の協定大学 交換留学",
    desc: "Học tập và nghiên cứu tại ĐH Tokyo, ĐH Kyoto, ĐH Osaka với chính sách công nhận tín chỉ.",
    descEn: "Study and research at The University of Tokyo, Kyoto, Osaka with full credit transfer.",
    descJa: "東京大学、京都大学、大阪大学など日本のトップ大学への学術交換留学制度。",
    href: "/programs",
    color: "from-blue-50/80 to-blue-100/50 border-blue-200/60 text-blue-950",
  },
  {
    icon: "🎓",
    title: "Học bổng JASSO & MEXT",
    titleEn: "JASSO & MEXT Scholarships",
    titleJa: "JASSO・MEXT奨学金",
    desc: "Hỗ trợ xét tuyển các suất học bổng toàn phần, trợ cấp sinh hoạt phí lên tới 80.000 - 145.000 JPY/tháng.",
    descEn: "Full scholarship support with monthly stipends up to 80,000 - 145,000 JPY for eligible students.",
    descJa: "月額80,000円〜145,000円の生活支援奨学金および学費免除制度のご案内。",
    href: "/programs",
    color: "from-amber-50/80 to-amber-100/50 border-amber-200/60 text-amber-950",
  },
  {
    icon: "📚",
    title: "Tiếng Nhật học thuật",
    titleEn: "Academic Japanese",
    titleJa: "アカデミック日本語",
    desc: "Đào tạo kỹ năng nghiên cứu, viết báo cáo khoa học và phỏng vấn trực tiếp cùng giáo sư Nhật.",
    descEn: "Academic research training, scientific writing, and professor interview preparation.",
    descJa: "学術論文執筆、研究計画書作成、指導教員面談に向けた実践的指導。",
    href: "/programs",
    color: "from-pink-50/80 to-pink-100/50 border-pink-200/60 text-pink-950",
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
                      {locale === "ja" ? f.titleJa : locale === "vi" ? f.title : f.titleEn}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                      {locale === "ja" ? f.descJa : locale === "vi" ? f.desc : f.descEn}
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
